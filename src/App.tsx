import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import MainPage from "@/pages/main-page";
import ProductPage from "@/pages/product-page";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="w-full min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </CartProvider>
  );
}

export default App;
