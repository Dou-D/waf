import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/",
      redirect: '/dashboard',
    },
    {
      path: "/dashboard",
      component: "@/pages/Dashboard",
    },
    {
      path: "/login",
      component: "login",
      layout: false
    },
    {
      
    }
  ],
  mfsu: true,
  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  codeSplitting: {
    jsStrategy: "granularChunks"
  }
});
