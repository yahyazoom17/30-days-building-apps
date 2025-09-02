import {
  Brain,
  Divide,
  Dot,
  Equal,
  Minus,
  MoveLeft,
  Percent,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { explainExpression } from "./lib/ai";

const App = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [aiMessage, setAiMessage] = useState(
    "Type an expression, press = then Ask AI for explanation"
  );
  const [loading, setLoading] = useState(false);

  const handleClick = (val) => {
    setExpression((prev) => prev + val);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
    setAiMessage("Type an expression and press =");
  };

  const handleBackSpace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      const value = eval(expression);
      setResult(value.toString());
      setAiMessage("Now click 'Ask AI' for explanation");
    } catch (err) {
      setResult("Error");
      toast.error("Invalid expression!");
      console.log(err);
    }
  };

  const handleAskAI = async () => {
    setLoading(true);
    const text = await explainExpression(expression, result);
    if (text.status === "success") {
      setAiMessage(text.message);
    } else {
      toast.error(text.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl text-white font-bold">AI Calculator</h1>
          <span className="text-white/50 text-sm font-medium">By Webbiva</span>
        </div>
        {/* Two Colum: calc on left and ai panel on right */}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6">
            {/* Display */}
            <div className="mb-4">
              <div className="text-white/60 text-xs uppercase">Expression</div>
              <div className="text-white text-lg min-h-[40px]">
                {expression || "0"}
              </div>
              <div className="h-px bg-white/10 my-3"></div>
              <div className="text-white/60 text-xs uppercase">Result</div>
              <div className="text-white text-lg min-h-[40px]">
                {result || "0"}
              </div>
            </div>
            {/* Keypad */}
            <div className="grid grid-cols-4 gap-3">
              {/* Row 1 */}
              <button onClick={handleClear} className="btn danger">
                C
              </button>
              <button
                onClick={handleBackSpace}
                className="btn flex items-center justify-center"
              >
                <MoveLeft />
              </button>
              <button
                onClick={() => handleClick("%")}
                className="btn flex items-center justify-center"
              >
                <Percent />
              </button>
              <button
                onClick={() => handleClick("/")}
                className="btn flex items-center justify-center"
              >
                <Divide />
              </button>
              {/* Row 2 */}
              <button onClick={() => handleClick("7")} className="btn">
                7
              </button>
              <button onClick={() => handleClick("8")} className="btn">
                8
              </button>
              <button onClick={() => handleClick("9")} className="btn">
                9
              </button>
              <button
                onClick={() => handleClick("*")}
                className="btn flex items-center justify-center"
              >
                <X />
              </button>
              {/* Row 3 */}
              <button onClick={() => handleClick("4")} className="btn">
                4
              </button>
              <button onClick={() => handleClick("5")} className="btn">
                5
              </button>
              <button onClick={() => handleClick("6")} className="btn">
                6
              </button>
              <button
                onClick={() => handleClick("-")}
                className="btn flex items-center justify-center"
              >
                <Minus />
              </button>
              {/* Row 4 */}
              <button onClick={() => handleClick("1")} className="btn">
                1
              </button>
              <button onClick={() => handleClick("2")} className="btn">
                2
              </button>
              <button onClick={() => handleClick("3")} className="btn">
                3
              </button>
              <button
                onClick={() => handleClick("+")}
                className="btn flex items-center justify-center"
              >
                <Plus />
              </button>
              {/* Row 5 */}
              <button
                onClick={() => handleClick("0")}
                className="btn col-span-2"
              >
                0
              </button>
              <button
                onClick={() => handleClick(".")}
                className="btn flex items-center justify-center"
              >
                <Dot size={40} />
              </button>
              <button
                onClick={handleEqual}
                className="btn equals flex items-center justify-center"
              >
                <Equal />
              </button>
            </div>
          </div>
          {/* AI Explain Card */}
          <div className="bg-white/10 rounded-3xl shadow-xl p-6 relative">
            <div className="flex mb-4 items-center justify-between gap-2">
              <h2 className="text-white font-semibold text-2xl flex items-center gap-2">
                <Brain />
                AI Explanation
              </h2>
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="btn ai"
              >
                {loading ? "Thinking..." : "Ask AI"}
              </button>
            </div>
            <div className="text-white/90 text-lg min-h-[180px] overflow-y-auto prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aiMessage}
              </ReactMarkdown>
            </div>
            {/* Privacy Statement */}
            <div className="w-full text-center text-white/40 text-sm absolute bottom-5 left-1/2 -translate-x-1/2">
              Privacy Note: We only send the final expression and result when
              you click "Ask AI".
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
