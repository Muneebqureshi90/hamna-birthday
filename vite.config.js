import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/hamna-birthday/",
  // host:true lets you open the dev server on your phone over Wi-Fi —
  // the URL printed as "Network:" is the one to use for Safari/Chrome testing.
  server: { host: true, port: 5173 },
  build: { assetsInlineLimit: 0 }, // keep audio a real file, never a data URI
});