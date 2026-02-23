import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number.parseInt(env.VITE_PORT ?? "3000", 10);
  const sourcemap = mode === "development";

  return {
    plugins: [react(), tailwindcss()],
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;

            if (id.includes("react-router-dom")) return "router";
            if (id.includes("moment")) return "utils";
            if (id.includes("react") || id.includes("react-dom")) return "vendor";
          },
        },
      },
      minify: "esbuild",
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      sourcemap,
      target: ["chrome89", "firefox89", "safari15", "edge89"],
    },
    server: {
      port: Number.isNaN(port) ? 3000 : port,
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: env.VITE_PREFIX || "/",
  };
});
