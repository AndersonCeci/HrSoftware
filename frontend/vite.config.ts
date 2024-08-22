import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const userData = import.meta.env.REACT_APP_EMPLOYEE_API;

export default defineConfig({
  plugins: [react()],
  envPrefix: "REACT_APP_",
  server: {
    proxy:
      userData.role === "hr"
        ? {
            "/api/today": {
              target: "https://zenquotes.io",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/today/, "/api/today"),
            },
          }
        : {
            "/api/joke": {
              target: "https://v2.jokeapi.dev",
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(/^\/api\/joke/, "/joke/Programming?type=single"),
            },
          },
  },
});
