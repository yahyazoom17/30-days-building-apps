import { useState } from "react";
import toast from "react-hot-toast";
import fallbackImg from "../assets/sample.png";
import IdeaForm from "../components/IdeaForm";
import ImagePreview from "../components/ImagePreview";
import InkLoader from "../components/InkLoader";

const Studio = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (prompt) => {
    try {
      setLoading(true);
      setError("");
      setImage(null);

      const apiKey = "your-api-key";

      const model = "google/gemini-2.5-flash-image-preview:free";

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:5173/",
            "X-Title": "AI Sticker Generator",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: `Create a unique tattoo design on plain white background based on this idea: "${prompt}".
                The tattoo style must be clean, high-contrast and suitable for body ink.
                Prefer black and white or color based on idea with detailed line art and shading.
                `,
              },
            ],
            modalities: ["image", "text"],
          }),
        }
      );
      console.log(response);
      const text = await response.text();
      if (!text) toast.error("No response from the model!");

      const data = JSON.parse(text);
      const msg = data?.choices?.[0]?.message;
      const imgUrl = msg?.images?.[0]?.image_url?.url;
      console.log(msg);
      console.log(imgUrl);

      if (!imgUrl) {
        setImage(fallbackImg);
        toast.error("Too many requests! Try again later...");
      } else {
        setImage(imgUrl);
        toast.success("You sticker generated successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate sticker! Check ApiKey or Model");
      setError("Failed to generate sticker! Check ApiKey or Model");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <IdeaForm onGenerate={handleGenerate} />
      <div className="mt-8">
        {loading ? (
          <InkLoader label="Penning your idea!" />
        ) : (
          <ImagePreview image={image} error={error} />
        )}
      </div>
    </main>
  );
};

export default Studio;
