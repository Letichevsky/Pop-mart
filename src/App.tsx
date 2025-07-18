import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import MainPage from "@/pages/main-page";
import ProductPage from "@/pages/product-page";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
