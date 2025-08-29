// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="text-center">
          <h1 className="text-xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Sticker <span className="text-indigo-600">Generator</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Type an idea - get a clean, black-ink sticker design. No background,
            high contrast, ideal for skin art.
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/studio")}
            className=" bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md hover:rounded-4xl transition-all shadow-md"
          >
            Generate Sticker 🔥
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 0.97 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="aspect-[4/2] rounded-xl bg-gradient-to-br from-indigo-50 to-pink-50 grid place-items-center mt-10">
            <div className="text-center">
              <div className="text-7xl mb-3">🖊️</div>
              <p className="text-gray-600 font-semibold mt-10">
                Your AI Designed Sticker will look like this!
              </p>
            </div>
            <p className="font-semibold text-gray-600">
              Built with React + Vite and Tailwind with OpenRouter By{" "}
              <span className="font-bold">
                Webb
                <span className="text-yellow-500">iva</span> (Yahya)
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Home;
