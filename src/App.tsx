import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import MainPage from "@/pages/main-page";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
