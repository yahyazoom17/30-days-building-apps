interface Props {
  quote: string;
  setQuote: (value: string) => void;
  handleAddQuote: () => void;
  isEditMode: boolean;
  handleEdit: () => void;
}
const QuoteInput = ({
  quote,
  setQuote,
  handleAddQuote,
  isEditMode,
  handleEdit,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <input
        className="bg-gray-100 w-100 py-2 my-3 rounded text-gray-800 px-3 border border-gray-200"
        placeholder="Type a quote..."
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <button
        onClick={() => {
          if (!isEditMode) {
            handleAddQuote();
          } else {
            handleEdit();
          }
        }}
        className="py-2 mx-1 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-3 my-3 rounded transition-all duration-75"
      >
        {!isEditMode ? `Add` : `Update`}
      </button>
    </div>
  );
};

export default QuoteInput;
