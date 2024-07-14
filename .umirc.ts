import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/dashboard',
      component: '@/pages/Dashboard',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/attack',
      component: '@/pages/Data',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/login',
      component: 'login',
      layout: false,
    },
    { path: '/*', component: '@/pages/404', layout: false },
  ],
  mfsu: {
    strategy: 'eager',
    esbuild: true,
  },
  npmClient: 'pnpm',
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },

  proxy: {
    '/api': {
      target: 'http://10.4.5.17:8081',
      changeOrigin: true,
    },
  },
});
