import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#2e026d] to-[#15162c]">
      <h1 className="text-6xl font-extrabold mb-4 text-white">
        🗺️AI SiteMap Builder
      </h1>
      <p className="text-xl text-white/80 font-semibold max-w-2xl mb-8">
        Generate beautiful sitemaps for your app ideas instantly using AI🧠
      </p>
      <Link
        to={"/studio"}
        className="px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-all font-semibold shadow-sm hover:-translate-y-1.5 hover:shadow-lg"
      >
        Create my sitemap 🚀
      </Link>
    </div>
  );
};

export default Home;
