import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NoteForm = () => {
  const [note, setNote] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!note.trim()) {
      toast.error("Please fill the note!");
    } else {
      setLoading(true);
      await addDoc(collection(db, "notes"), {
        content: note,
        category: category,
        createdAt: serverTimestamp(),
      });
      setNote("");
      setLoading(false);
      toast.success("Note saved successfully!");
    }
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="Type your note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={50}
        disabled={loading}
      />
      <div className="flex justify-between text-xs mx-1 text-gray-500 mb-3">
        <span>{note.length}/50</span>
      </div>
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value.toLowerCase())}
        maxLength={10}
        disabled={loading}
      />
      <Button
        className="w-full mt-3 cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Note"}
      </Button>
    </div>
  );
};

export default NoteForm;
