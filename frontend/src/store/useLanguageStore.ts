import { create } from "zustand";
import en from "@/translation/en/translate.json";
import id from "@/translation/id/translate.json";

type Language = "id" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = { en, id };

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "id",

  setLanguage: (lang) => set({ language: lang }),

  t: (key) => {
    const lang = get().language;
    // @ts-expect-error accessing dynamic key
    return translations[lang][key] || key;
  },
}));
