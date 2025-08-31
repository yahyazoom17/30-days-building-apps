import { useState } from "react";

const Studio = () => {
  const [idea, setIdea] = useState("");
  const [sitemap, setSitemap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    const prompt = `Generate a structured sitemap in clean JSON format for: ${idea}. 
    Only return the raw JSON without any explanation or code block. No markdown. Just plain JSON.
    Example:
    [
    "Home",
    "Features",
    {"Dashboard":["Profile", "Settings"]}
    ]`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AI SiteMap Builder",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku:beta",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    console.log(text);

    try {
      const parsed = JSON.parse(text);
      setSitemap(parsed);
    } catch (err) {
      console.log(err);
      alert("Could not parse AI response");
    } finally {
      setLoading(false);
      setIdea("");
    }
  };

  const renderTree = (node, depth = 0) => {
    if (typeof node === "string") {
      return (
        <div className={`pl-${depth * 4} flex items-center gap-2 my-1`}>
          <span>📄</span>
          <span className="font-medium">{node}</span>
        </div>
      );
    }
    return Object.entries(node).map(([folder, children], i) => (
      <div key={i} className={`pl-${depth * 4} border-l border-white/20 ml-2`}>
        <div className="flex items-center gap-2 my-1 mx-2">
          <span>📂</span>
          <span className="font-semibold">{folder}</span>
        </div>
        <div className="ml-4 border-l border-white/20 my-1 mx-2">
          {children.map((child, i) => (
            <div key={i}>{renderTree(child, depth + 1)}</div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15162c] to-[#0f0c29] text-white text-center p-6">
      <h2 className="text-3xl font-bold mb-4">🧠Describe Your App</h2>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="A travel booking website with user dashboard"
        className="w-full max-w-2xl p-4 bg-white/10 rounded border border-white/20 mb-4 font-medium placeholder-white/50"
      />
      <div>
        <button
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold"
          disabled={loading}
          onClick={generate}
        >
          {loading ? "Generating..." : "Generate Sitemap"}
        </button>
      </div>
      {sitemap.length > 0 && (
        <div className="mt-20 max-w-2xl mx-auto flex flex-col items-center">
          <h3 className="font-bold text-2xl">🗺️Generated Sitemap</h3>
          <div className="py-6 bg-white/10 mt-5 px-15 rounded-lg">
            <ul className="list-disc list-inside text-white/90">
              {sitemap.map((node, i) => (
                <div key={i}>{renderTree(node)}</div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studio;
