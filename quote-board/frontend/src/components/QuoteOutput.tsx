interface Quote {
  id: number;
  text: string;
}

interface Props {
  quotes: Quote[];
  handleDelete: (id: number) => void;
  setIsEditMode: (value: boolean) => void;
  setQuote: (value: string) => void;
  setEditId: (value: number) => void;
}

const QuoteOutput = ({
  quotes,
  handleDelete,
  setIsEditMode,
  setQuote,
  setEditId,
}: Props) => {
  return (
    <div className="bg-gray-100 p-4 rounded space-y-3">
      {quotes.length > 0 ? (
        quotes.map((q, i) => (
          <div
            key={i}
            className="bg-white py-5 px-3 flex flex-col md:flex-row justify-between items-center rounded-lg shadow-sm"
          >
            <div className="text-xl mx-3">{q.text}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setEditId(q.id);
                  setQuote(q.text);
                  setIsEditMode(true);
                }}
                className="py-2 cursor-pointer bg-yellow-600 hover:bg-yellow-500 text-white px-3 rounded transition-all duration-75"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(q.id)}
                className="py-2 cursor-pointer bg-red-600 hover:bg-red-500 text-white px-3 rounded transition-all duration-75"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-800 text-center">No quotes added!</div>
      )}
    </div>
  );
};

export default QuoteOutput;
