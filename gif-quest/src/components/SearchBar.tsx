import { X } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  handleGifs: () => void;
  setGifs: (value: []) => void;
}

const SearchBar = ({ query, setQuery, handleGifs, setGifs }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleClear = () => {
    setQuery("");
    setGifs([]);
  };
  return (
    <div className="space-y-5">
      <div className={query.length !== 0 ? `flex gap-2 flex-row` : ""}>
        <Input
          value={query}
          placeholder="Search GIFs"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm"
        />
        {query.length !== 0 && (
          <Button
            className="w-10 text-red-500"
            variant={"ghost"}
            onClick={handleClear}
          >
            <X />
          </Button>
        )}
      </div>
      <div className="">
        <Button className="w-full" onClick={handleGifs}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
