import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainPage from "@/pages/main-page";
import ProductPage from "@/pages/product-page";
import { CartProvider } from "@/contexts/CartContext";
import { MetaPixelProvider } from "@/contexts/MetaPixelContext";
import { MetaPixelTracker } from "@/components/MetaPixelTracker";
import { MetaPixelTest } from "@/components/MetaPixelTest";
import { PixelInfo } from "@/components/PixelInfo";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <CartProvider>
      <Router>
        <MetaPixelProvider pixelId="YOUR_PIXEL_ID_HERE">
          <MetaPixelTracker />
          <div className="w-full min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
            <Footer />
          </div>
          <MetaPixelTest />
          <PixelInfo />
          <Toaster />
        </MetaPixelProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
