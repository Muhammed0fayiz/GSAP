import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LearnIndex from "./pages/LearnIndex";
import LessonPage from "./pages/LessonPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import Examples from "./pages/Examples";
import Library from "./pages/Library";
import CheatSheet from "./pages/CheatSheet";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<LearnIndex />} />
          <Route path="/learn/:slug" element={<LessonPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/library" element={<Library />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
