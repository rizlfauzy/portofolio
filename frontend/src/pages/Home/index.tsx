// env
const { VITE_EMAIL } = import.meta.env;

// react
import { memo, useCallback, useEffect, useMemo, useState } from "react";

// store
import { useLanguageStore } from "@/store/useLanguageStore";

// image
import profileImage from "@/assets/img/foto_cv.png";

export default memo(function Page() {
  const { t } = useLanguageStore();

  const carouselImages = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const index = i + 1;
        return `https://picsum.photos/seed/portfolio-${index}/1920/1080`;
      }),
    []
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const goPrev = useCallback(() => {
    setActiveImageIndex((current) => (current - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  const goNext = useCallback(() => {
    setActiveImageIndex((current) => (current + 1) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % carouselImages.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [carouselImages.length]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section
        id="jumbotron"
        className="relative isolate py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Background carousel */}
        <div className="absolute inset-0 z-0">
          <img
            key={activeImageIndex}
            src={carouselImages[activeImageIndex]}
            alt="Image Carousel Background"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-900/60" />
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous background"
          className="absolute z-10 left-3 top-1/2 -translate-y-1/2 rounded-md px-3 py-2 bg-gray-900/30 dark:bg-gray-100/10 text-gray-100 dark:text-gray-100 hover:bg-gray-900/40 dark:hover:bg-gray-100/20 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next background"
          className="absolute z-10 right-3 top-1/2 -translate-y-1/2 rounded-md px-3 py-2 bg-gray-900/30 dark:bg-gray-100/10 text-gray-100 dark:text-gray-100 hover:bg-gray-900/40 dark:hover:bg-gray-100/20 transition-colors"
        >
          ›
        </button>

        <div className="relative z-10 grid gap-2 lg:grid-cols-2">
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
