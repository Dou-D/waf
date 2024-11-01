import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/dashboard',
      component: '@/pages/Dashboard',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/data',
      component: '@/pages/Data',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/setting',
      component: '@/pages/Setting',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: "/logs",
      component: '@/pages/Log',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/login',
      component: 'login',
      layout: false,
    },
    {
      path: '/disposal',
      component: '@/pages/Disposal',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/attack',
      component: '@/pages/Attack',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: "/menace",
      component: "@/pages/Menace",
      wrappers: ['@/wrappers/auth']
    },
    {
      path: '/linkage',
      component: '@/pages/Linkage',
    },
    {
      path: "/attack/description",
      component: '@/pages/Attack/description',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: "/know",
      component: '@/pages/Know',
      wrappers: ['@/wrappers/auth'],
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
    '/api2': {
      target: 'http://10.4.5.17:8000',
      changeOrigin: true,
      pathRewrite: {'^/api2': ''},
    },
    '/api': {
      target: 'http://10.4.5.17:8080',
      changeOrigin: true,
    },
  },
});
