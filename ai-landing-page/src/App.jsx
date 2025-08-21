import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
const App = () => {
  return (
    <div className="min-h-screen bg-[#f0f9ff] text-gray-800">
      <Home />
      <Toaster />
    </div>
  );
};

export default App;
