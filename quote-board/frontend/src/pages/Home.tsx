import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QuoteInput from "../components/QuoteInput";
import QuoteOutput from "../components/QuoteOutput";
import {
  addQuote,
  editQuote,
  getAllQuotes,
  removeQuote,
} from "../utils/quote.ts";

interface Quote {
  id: number;
  text: string;
}

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [editId, setEditId] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllQuotes = async () => {
      const allQuotes = await getAllQuotes();
      setQuotes(allQuotes);
    };
    fetchAllQuotes();
  }, [quotes]);

  const handleAddQuote = async () => {
    setQuote("");
    const res = await addQuote(quote);
    setQuotes((prev) => [...prev, res.quote]);
    toast.success(res.message);
  };

  const handleEditQuote = async () => {
    setQuote("");
    const res = await editQuote(editId, quote);
    setQuotes((prev) => [...prev, res.quote]);
    setIsEditMode(false);
    toast.success(res.message);
  };

  const handleDeleteQuote = async (id: number) => {
    const res = await removeQuote(id);
    if (!res.message) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
    }
  };

  return (
    <div className="bg-white p-6 mx-auto space-y-3 rounded shadow-sm max-w-xl">
      <div className="font-bold text-3xl text-center">📚 Quote Board</div>
      <QuoteInput
        quote={quote}
        setQuote={setQuote}
        handleAddQuote={handleAddQuote}
        isEditMode={isEditMode}
        handleEdit={handleEditQuote}
      />
      <QuoteOutput
        quotes={quotes}
        handleDelete={handleDeleteQuote}
        setIsEditMode={setIsEditMode}
        setQuote={setQuote}
        setEditId={setEditId}
      />
    </div>
  );
};

export default Home;
