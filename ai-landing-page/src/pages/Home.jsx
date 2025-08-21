import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const apiKey = "your-api-key";

const Home = () => {
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("Select your category");
  const [model, setModel] = useState("Select your model");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const prompt = `Create a clean and responsive landing page using HTML for a ${category} product called "${idea}".
        The pages should include:
        - Bold heading
        - Short subheading
        - Three feature cards
        - Call-To-Action button
    Use plain HTML and Tailwind CSS.
    Do not use codeblocks.
    Return ONLY valid HTML.
    `;

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data.choices[0].message.content);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("This model is under maintanence. Please choose other one!");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(result);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div>
      <div className="min-h-screen bg-[#f6f5ff] px-4 py-10 font-sans">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            AI Landing Page Generator
          </h1>
          <input
            type="text"
            className="w-full border p-3 border-gray-300 rounded-lg mb-4"
            placeholder="Write your idea...💡 (ex: Travel, Shopping)"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option value="AI SaaS">AI SaaS</option>
            <option value="Productivity Tool">Productivity Tool</option>
            <option value="Startup">Startup</option>
            <option value="Blog">Blog</option>
            <option value="Portfolio">Portfolio</option>
          </select>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option value="moonshotai/kimi-k2:free">Kimi-K2</option>
            <option value="qwen/qwen3-coder:free">Qwen3 Coder</option>
            <option value="meta-llama/llama-3.1-405b-instruct:free">
              Llama
            </option>
            <option value="deepseek/deepseek-r1-0528:free">DeepSeek-R1</option>
            <option value="google/gemini-2.0-flash-exp:free">
              Gemini 2.0 Flash
            </option>
            <option value="openai/gpt-oss-20b:free">GPT-OSS</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mb-4 bg-purple-700 text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-purple-800"
          >
            {loading ? "Generating..." : "Generate Landing Page 🔥"}
          </button>

          {result && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-3">Live Preview</h2>
              <iframe
                srcDoc={result}
                className="w-full border h-[800px] overflow-x-auto border-gray-300 p-5 rounded-lg mb-2"
              />
              <div className="mt-6 flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">HTML Code</h3>
                </div>
                <div>
                  <button
                    onClick={handleCopyCode}
                    className="mb-4 bg-gray-700 text-white font-semibold py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
              <div>
                <pre className="bg-black text-white p-4 text-sm rounded-lg overflow-x-auto">
                  {result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
