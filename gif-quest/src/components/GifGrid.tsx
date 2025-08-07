import { ScrollArea } from "@/components/ui/scroll-area";

interface Gif {
  id: string;
  images: { fixed_height: { url: string } };
}

interface Props {
  gifs: Gif[];
}

const GifGrid = ({ gifs }: Props) => {
  return (
    <ScrollArea
      className={`w-full h-[600px] rounded-md border p-3 ${
        gifs.length === 0 ? `hidden` : ``
      }`}
    >
      <div className="list">
        {gifs ? (
          gifs.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              className="rounded shadow-sm hover:shadow-lg w-full mb-2 h-full"
            />
          ))
        ) : (
          <p>Loading GIFs...</p>
        )}
      </div>
    </ScrollArea>
  );
};

export default GifGrid;
