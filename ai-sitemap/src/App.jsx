import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Studio from "./pages/Studio";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
