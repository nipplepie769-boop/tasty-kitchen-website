import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // production base path for GitHub Pages (update to match your repo name)
  base: mode === 'production' ? '/the-tasty-kitchen/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  // Use only the official React plugin. Removed the third-party tagging plugin to keep
  // the build configuration minimal and brand-neutral.
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
