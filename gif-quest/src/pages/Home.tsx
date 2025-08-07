import GifGrid from "@/components/GifGrid";
import SearchBar from "@/components/SearchBar";
import { fetchGif } from "@/lib/giphy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    if (!gifs) {
      const fetchTrending = async () => {
        const res = await fetchGif("trending");
        setGifs(res.data);
      };
      fetchTrending();
    }
  });

  const handleGifs = async () => {
    try {
      const res = await fetchGif(query);
      console.log(res);
      if (res.meta.status === 200) {
        setGifs(res.data);
      } else {
        toast.error(res.meta.msg);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="max-w-4xl text-center w-full mx-auto p-6 bg-white rounded-lg shadow-sm space-y-6">
        <h1 className="font-bold text-3xl">GIF Quest🎉</h1>
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleGifs={handleGifs}
          setGifs={setGifs}
        />
        <GifGrid gifs={gifs} />
      </div>
    </div>
  );
};

export default Home;
