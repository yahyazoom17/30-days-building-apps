import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Note {
  id: string;
  content: string;
  category: string;
  createdAt: Timestamp;
}

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editedNote, setEditedNote] = useState<string>("");

  useEffect(() => {
    const unSubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];

      setNotes(notesData);
    });

    return () => unSubscribe();
  }, []);

  if (notes.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-400">
        No notes yet. Start typing!
      </p>
    );
  }

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
    toast.success("Note deleted successfully!");
  };

  const editNote = async (id: string) => {
    await updateDoc(doc(db, "notes", id), {
      content: editedNote,
      updatedAt: serverTimestamp(),
    });
    toast.success("Note edited successfully!");
    setEditedNote("");
  };

  return (
    <div
      className={`grid gap-4 mt-4 ${
        notes.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {notes.map((note, index) => (
        <div
          key={index}
          className="group flex items-center justify-between p-2 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-200"
        >
          <div>
            <p className="font-semibold py-3 px-2 text-lg text-gray-800 flex items-center">
              {note.content}
              <p className="text-xs mx-2 group-hover:hidden">
                <Badge>{note.category}</Badge>
              </p>
            </p>
            <p className="font-light text-sm px-2 mt-[-10px] mb-1 text-gray-400 group-hover:hidden">
              {`${note.createdAt.toDate().getSeconds()}s ago`}
            </p>
          </div>

          <div className="space-x-1 hidden group-hover:block transition-all duration-1000">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="p-0 cursor-pointer text-gray-700 hover:text-gray-800 transition-all duration-200"
                >
                  <Pencil />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Input
                      placeholder={note.content}
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setEditedNote("")}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => editNote(note.id)}>
                    Save Changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              onClick={() => deleteNote(note.id)}
              variant={"ghost"}
              className="p-0 cursor-pointer text-red-500 hover:text-red-600 transition-all duration-200"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
