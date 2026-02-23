// react
import { memo } from "react";

// icons
import { Moon, Sun, Globe } from "lucide-react";

// stores
import { useThemeStore } from "@/store/useThemeStore";
import { useLanguageStore } from "@/store/useLanguageStore";

// image
import logo from "@/assets/img/rf_logo.png";

export default memo(function Navbar() {
  // stores
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage, t } = useLanguageStore();

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0 flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8 object-cover" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Rizal Fauzi</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t("about")}
              </a>
              <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t("experience")}
              </a>
              <a href="#education" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t("education")}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLanguage(language === "id" ? "en" : "id")} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer" aria-label="Toggle language">
              <Globe size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">{language}</span>
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer" aria-label="Toggle theme">
              {theme === "light" ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-yellow-400" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
})
