// react
import { memo, useEffect, useCallback } from "react";

// store
import { useProfileStore } from "@/store/useProfileStore";
import { useLanguageStore } from "@/store/useLanguageStore";

// icons
import { Download, Briefcase, GraduationCap } from "lucide-react";

// service
import useHomeService from "@/services/homeService";

export default memo(function Page() {
  const { t } = useLanguageStore();
  const { profile, setProfile } = useProfileStore();
  const { getProfile } = useHomeService();

  // init
  const initData = useCallback(async () => {
    const [res] = await Promise.all([getProfile()]);
    setProfile(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProfile]);

  useEffect(() => {
    async function init() {
      await initData();
    }
    init();
  }, [initData]);

  if (!profile) return <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900"></div>;

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">{t("greeting")}</span>
            <span className="block text-blue-600 dark:text-blue-400">{profile.name}</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">{profile.about}</p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
            <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
              {t("contact")}
            </a>
            <a
              href="#"
              className="mt-3 sm:mt-0 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 gap-2"
            >
              <Download size={20} />
              {t("downloadCV")}
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            {t("experience")}
          </h2>
          <div className="space-y-8">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{exp.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.duration}</p>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-green-600" />
            {t("education")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {profile.educations.map((edu) => (
              <div key={edu.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.school}</h3>
                <p className="text-blue-600 dark:text-blue-400">{edu.degree}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack / Skills (from About description or array) */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
