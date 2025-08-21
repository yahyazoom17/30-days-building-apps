import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppPage from "./pages/AppPage";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/app" element={<AppPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
