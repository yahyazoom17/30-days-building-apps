import { Download } from "lucide-react";

const ImagePreview = ({ image, error }) => {
  if (error) {
    return <p className="text-rose-600">{error}</p>;
  }

  if (!image) {
    return (
      <div className="h-64 text-gray-500 bg-white border border-gray-200 rounded-2xl grid place-items-center mt-10">
        Waiting to 🖊️ your ideas...
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm mt-20 border-gray-200">
      <img
        src={image}
        alt="Generated Image"
        className="w-full rounded-xl object-cover"
      />
      <div className="flex justify-end">
        <a
          href={image}
          download="sticker.png"
          className="inline-flex justify-center items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-xl"
        >
          <Download />
          Download PNG
        </a>
      </div>
    </div>
  );
};

export default ImagePreview;
