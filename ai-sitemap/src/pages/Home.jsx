import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#2e026d] to-[#15162c]"
    >
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.5,
        }}
        className="text-6xl font-extrabold mb-4 text-white"
      >
        🗺️AI SiteMap Builder
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
        className="text-xl text-white/80 font-semibold max-w-2xl mb-8"
      >
        Generate beautiful sitemaps for your app ideas instantly using AI🧠
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.9,
        }}
      >
        <Link
          to={"/studio"}
          className="px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-all font-semibold shadow-sm hover:-translate-y-1.5 hover:shadow-lg"
        >
          Create my sitemap 🚀
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;
