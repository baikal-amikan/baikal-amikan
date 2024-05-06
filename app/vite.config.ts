import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "../docs",
  },
  publicDir: process.env.NODE_ENV === 'development' ? "../public" : undefined,
});
