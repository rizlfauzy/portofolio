// react
import { memo, useEffect } from "react";

// stores
import { useLoadingStore } from "@/store/useLoadingStore";
import { useThemeStore } from "@/store/useThemeStore";

// components
import Navbar from "@/components/layout/Navbar";
import { FullScreenLoading } from "@/components/Loading";
import Alert from "@/components/Alert";
import Head from "@/components/Head";

export default memo(function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  // stores
  const { isLoading } = useLoadingStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head title={title} />
      <Alert />
      {isLoading && <FullScreenLoading message="Please wait..." />}
      <Navbar />
      {children}
    </div>
  );
});
