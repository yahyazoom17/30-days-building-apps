import axios from "axios";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Pencil, Save, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const AppPage = () => {
  const [text, setText] = useState("");
  const [quotes, setQuotes] = useState([{ _id: "0", text: "Example Quote" }]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [searchingText, setSearchingText] = useState("");

  const handleSearch = () => {
    if (searchingText.trim()) {
      const filtered = quotes.filter((quote) =>
        quote.text.toLowerCase().includes(searchingText.toLowerCase())
      );
      setQuotes(filtered);
    } else {
      setQuotes(quotes);
    }
  };

  const handleSort = (mode) => {
    setQuotes((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (mode === "old") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (mode === "new") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
      return sorted;
    });

    toast.success("Quotes sorted successfully!");
  };

  const getQuotes = async () => {
    const res = await axios.get("http://localhost:4000/api/quotes");
    setQuotes(res.data);
  };

  const handleAdd = async () => {
    if (!text.trim()) {
      toast.error("Please fill some quote!");
    } else {
      const res = await axios.post("http://localhost:4000/api/quotes", {
        text,
      });
      toast.success(res.data.message);
      getQuotes();
    }
    setText("");
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await axios.delete(`http://localhost:4000/api/quotes/${id}`);
      toast.success(res.data.message);
      getQuotes();
    }
  };

  const handleUpdate = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/quotes/${editingId}`,
      {
        text: editingText,
      }
    );
    toast.success(res.data.message);
    setEditingId(null);
    setEditingText("");
    getQuotes();
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-[#6f36e8] mb-10">
        📝 MotivaQuote
      </h1>
      {/* Create form */}
      <div className="max-w-xl mx-auto flex gap-3 mb-10">
        <input
          type="text"
          placeholder="Type your quotes..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-gray-50"
          onChange={(e) => setText(e.target.value)}
        />
        <motion.div whileTap={{ scale: 0.95 }}>
          <button
            className="bg-[#6f36e8] text-white px-5 py-2 rounded-md hover:bg-[#5e2ce4] cursor-pointer font-semibold"
            onClick={handleAdd}
          >
            Add
          </button>
        </motion.div>
      </div>
      {/* Quotes List */}
      <div className="max-w-xl mx-auto space-y-5">
        <div className="mx-auto flex flex-row justify-end items-center gap-2 my-10">
          <input
            type="text"
            value={searchingText}
            onChange={(e) => setSearchingText(e.target.value)}
            placeholder="Search quotes..."
            className="w-full px-3 py-2 border-gray-300 shadow-sm bg-gray-50 border rounded-md"
          />
          {searchingText ? (
            <motion.div whileTap={{ scale: 0.95 }}>
              <button
                className="bg-[#6f36e8] text-white px-5 py-2 rounded-md hover:bg-[#5e2ce4] cursor-pointer font-semibold"
                onClick={handleSearch}
              >
                Search
              </button>
            </motion.div>
          ) : (
            <motion.div whileTap={{ scale: 0.95 }}>
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="bg-pink-500 text-white rounded-md px-5 py-2 font-semibold"
              >
                <option className="bg-white text-black" value="new">
                  Newest First
                </option>
                <option className="bg-white text-black" value="old">
                  Oldest First
                </option>
              </select>
            </motion.div>
          )}
        </div>
        {quotes.map((quote) => (
          <motion.div
            key={quote._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              {editingId === quote._id ? (
                <div className="flex flex-row justify-between w-full items-center gap-3">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 font-semibold px-2 py-1 rounded-md hover:text-green-700 cursor-pointer"
                    >
                      <Save />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-600 font-semibold px-2 py-1 rounded-md hover:text-red-700 cursor-pointer"
                    >
                      <XCircle />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between w-full items-center group">
                  <p className="font-semibold">{quote.text}</p>
                  <div className="flex gap-4 invisible group-hover:visible">
                    <button
                      className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                      onClick={() => {
                        startEdit(quote._id, quote.text);
                      }}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1"
                      onClick={() => handleDelete(quote._id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default AppPage;
