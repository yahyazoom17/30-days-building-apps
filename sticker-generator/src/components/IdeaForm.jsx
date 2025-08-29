import { Brush } from "lucide-react";
import React, { useState } from "react";

const IdeaForm = ({ onGenerate }) => {
  const [val, setVal] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const idea = val.trim();

    if (!idea) return;
    onGenerate(idea);
  };

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row gap-3">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Type your idea here..."
        className="flex-1 border rounded-xl px-4 py-3 border-gray-200 shadow-sm placeholder-gray-500 font-semibold outline-none"
      />
      <button
        type="submit"
        className="inline-flex gap-2 shadow-sm hover:shadow-lg cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white items-center justify-center px-5 py-3 rounded-xl font-semibold"
      >
        <Brush size={20} className="w-4 h-4" />
        Generate
      </button>
    </form>
  );
};

export default IdeaForm;
