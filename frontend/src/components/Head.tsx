// env
const { VITE_TITLE_APPS } = import.meta.env;

// react
import { memo, useEffect } from "react";

export default memo(function Head({ title = "LOGIN", icon = "/vite.svg" }: { title?: string; icon?: string }) {
  useEffect(() => {
    document.title = `${title.toUpperCase()} | ${VITE_TITLE_APPS || "PORTFOLIO"}`;
    const iconLink = document.querySelector("link[rel*='icon']");
    if (iconLink) {
      (iconLink as HTMLLinkElement).href = icon;
    }

    // add meta description
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", `${VITE_TITLE_APPS || "PORTFOLIO"} APPS`);
  }, [title, icon]);

  return null;
});
