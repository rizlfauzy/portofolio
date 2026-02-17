const { VITE_PREFIX_API, VITE_PREFIX } = import.meta.env;

interface FetchOptions {
  url: string;
  method?: string;
  data?: unknown;
  headers?: HeadersInit;
  host?: string;
}

export default function useFetch() {
  async function fetchData({ url, method = "GET", data, headers = {}, host = VITE_PREFIX_API }: FetchOptions) {
    if (host === "/") host = "";

    try {
      const res = await fetch(`${host}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const json = await res.json();

      if (json.code === 401) {
        localStorage.removeItem("portfolio_session"); // Changed key to be project specific
        const a = document.createElement("a");
        a.href = `${VITE_PREFIX}login`;
        a.click();
        return;
      }

      // Check for empty object if that's the error condition intended
      if (json && Object.keys(json).length === 0) {
        throw new Error("No data returned");
      }

      return json;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return { error: true, message };
    }
  }

  async function fetchFile({ url, method = "POST", data, headers = {}, host = VITE_PREFIX_API }: FetchOptions) {
    if (host === "/") host = "";

    try {
      const res = await fetch(`${host}${url}`, {
        method,
        headers: {
          ...headers,
        },
        body: data as BodyInit, // Body is passed directly (FormData etc)
      });

      const json = await res.json();

      if (json.code === 401) {
        localStorage.removeItem("portfolio_session");
        const a = document.createElement("a");
        a.href = `${VITE_PREFIX}login`;
        a.click();
        return;
      }

      if (json && Object.keys(json).length === 0) {
        throw new Error("No data returned");
      }

      return json;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return { error: true, message };
    }
  }

  async function getData({ url, headers = {}, host = VITE_PREFIX_API }: { url: string; headers?: HeadersInit; host?: string }) {
    if (host === "/") host = "";

    try {
      const res = await fetch(`${host}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        method: "GET",
      });

      const json = await res.json();

      if (json.code === 401) {
        localStorage.removeItem("portfolio_session");
        const a = document.createElement("a");
        a.href = `${VITE_PREFIX}login`;
        a.click();
        return;
      }

      const checkisUrlHealth = url.includes("health");
      if (!checkisUrlHealth && json && Object.keys(json).length === 0) {
        throw new Error("No data returned");
      }

      return json;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return { error: true, message };
    }
  }

  return { fetchData, fetchFile, getData };
}
