import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/components/AppRouter";
import Header from "@/components/Header";
import VideoCall from "./components/VideoCall";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className="Content">
        <BrowserRouter>
          <Header />
          <VideoCall />
          <AppRouter />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
