import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white/70 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-extrabold text-xl">
          <Link to={"/"}>
            AI Sticker <span className="text-indigo-600">Studio</span>
          </Link>
        </div>
        <div className="text-sm font-bold">
          By Webb<span className="text-yellow-500">iva</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
