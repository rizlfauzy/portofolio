// env
const { VITE_EMAIL } = import.meta.env;

// react
import { memo } from "react";

// store
import { useLanguageStore } from "@/store/useLanguageStore";

// image
import profileImage from "@/assets/img/foto_cv.png";

export default memo(function Page() {
  const { t } = useLanguageStore();

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section id="jumbotron" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid gap-2 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="md:w-125 md:h-125 w-85 h-85 object-cover -translate-y-20">
              <img src={profileImage} alt="Profile" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="md:text-4xl text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("hi")}</h1>
            <h2 className="text-5xl md:text-7xl font-semibold text-gray-700 dark:text-gray-300">{t("fullStack")}</h2>
            <h2 className="text-5xl md:text-7xl font-semibold text-gray-700 dark:text-gray-300 text-right">{t("developer")}</h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">{t("desc")}</p>
            {/* buttons for my contact and my cv */}
            <div className="mt-8 flex space-x-4">
              <a
                href="https://drive.google.com/file/d/1n9l8sXo2mLh7j3Z5z5z5z5z5z5z5z/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {t("viewCV")}
              </a>
              <a
                href={`mailto:${VITE_EMAIL}`}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {t("contact")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
