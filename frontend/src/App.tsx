import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Home from "@/pages/Home";
import { useThemeStore } from "@/store/useThemeStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { FullScreenLoading }   from "@/components/Loading";

function App() {
  const { theme } = useThemeStore();
  const { isLoading } = useLoadingStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {isLoading && <FullScreenLoading message="Please wait..." />}
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
