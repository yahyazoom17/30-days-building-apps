// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-center items-center px-4 space-y-5">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Boost Your Motivation🌟
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-300 text-center mb-12 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Use MotivaQuote to boost not only your motivation but also your
        productivity🧑‍💻
      </motion.p>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          to={"/app"}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-500 hover:to-purple-500 hover:shadow-sm transition-all duration-300"
        >
          Start Using MotivaQuote 🚀
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
