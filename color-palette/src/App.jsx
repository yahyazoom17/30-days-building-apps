import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [mood, setMood] = useState("");
  const [number, setNumber] = useState("Number of Colors");
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copyText, setCopyText] = useState("Copy Hex");
  const [saveText, setSaveText] = useState("Save Palette");
  const [saved, setSaved] = useState(false);

  const OPENROUTER_API_KEY = "your-api-key";

  const OPENROUTER_MODEL = "openai/gpt-oss-20b:free";

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("Copy Hex");
    }, 3000);
    toast.success("Color copied to clipboard!");
  };

  useEffect(() => {
    const fetchedColors = localStorage.getItem("colors");
    const hexMatches = fetchedColors.match(/#[A-Fa-f0-9]{6}/g);
    if (fetchedColors) {
      setColors(hexMatches);
      setSaved(true);
    }
  }, []);

  const handleSavePalette = () => {
    localStorage.setItem("colors", colors);
    setSaveText("Saved");
    toast.success("Color palette saved successfully!");
    setSaved(true);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setSaved(false);
    setColors([]);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: OPENROUTER_MODEL,
          messages: [
            {
              role: "user",
              content: `Give me ${number} hex colors in ${mood} mood for: ${prompt}. Return ONLY valid colors.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const colors = response.data.choices[0].message.content;
      const hexMatches = colors.match(/#[A-Fa-f0-9]{6}/g);

      if (hexMatches) {
        setColors(hexMatches);
      }
    } catch (error) {
      console.log(error);
      setColors(["#D3DAD9", "#EEE6CA", "#715A5A", "#44444E", "#37353E"]); //default fallback colors
      toast.error("Sorry something went wrong!");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="bg-[#1e1b4e] min-h-screen text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center">
        🎨AI Color Palette
      </h1>
      <input
        type="text"
        value={prompt}
        className="w-full max-w-md border p-3 rounded bg-[#2a265f] text-white mb-4 font-medium"
        placeholder="Enter your brand / mood (eg: Sun, Moon)"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2 items-center mb-4 space-x-4">
        <select
          className="w-full border p-3 rounded bg-[#2a265f] text-white font-medium"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="Calm">Calm</option>
          <option value="Dark">Dark</option>
          <option value="Inspiring">Inspiring</option>
          <option value="Energitic">Energitic</option>
        </select>
        <input
          type="number"
          value={number}
          className="w-full border p-3 rounded bg-[#2a265f] text-white font-medium"
          placeholder="Number of colors"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button
        disabled={loading}
        onClick={handleGenerate}
        className="bg-[#10b981] text-white px-6 py-2 rounded font-semibold hover:bg-[#059669] cursor-pointer mb-4"
      >
        {loading ? "Generating..." : "Generate Palette"}
      </button>

      {/* Result */}

      {colors.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-10">
          {colors.map((color, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="group w-30 h-40 rounded shadow-sm hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center"
                style={{ backgroundColor: color }}
                onClick={() => handleCopyColor(color)}
              >
                <span className="bg-gray-800 text-white px-2 py-1 rounded font-semibold hidden group-hover:block">
                  {copyText}
                </span>
              </div>
              <span className="mt-3 font-semibold">{color}</span>
            </div>
          ))}
          <div className="row-start-4 md:col-start-3 mt-5 md:row-start-3">
            {!saved && (
              <button
                disabled={loading}
                onClick={handleSavePalette}
                className="bg-[#10b981] text-white px-6 py-2 rounded font-semibold hover:bg-[#059669] cursor-pointer mb-4"
              >
                {saveText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
