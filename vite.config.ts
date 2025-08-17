import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/daily-crunch/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Polyfill Node.js modules for browser compatibility
      "events": path.resolve(__dirname, "./src/lib/events.ts"),
    },
  },
  define: {
    // Ensure global variables are available
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@huggingface/transformers'],
  },
}));
