import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        '/favicons/192x192.png',
        '/favicons/apple-touch-icon.png',
        '/favicons/512x512.png',
      ],
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: 'Vacuum Online',
        short_name: 'Vacuum',
        description: 'Vacuum PWA',
        theme_color: '#0f005d',
        background_color: '#0f005d',
        display: 'standalone',
        orientation: 'landscape-primary',
        icons: [
          {
            src: '/favicons/192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/favicons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'], // что будут кэшироваться все файлы с расширениями
        cleanupOutdatedCaches: true, // Включение этой опции заставляет Workbox автоматически очищать устаревшие кэши, которые не соответствуют текущей версии
        clientsClaim: true, // Когда эта опция включена, Service Worker сразу же берет под контроль все существующие страницы, без необходимости ждать, пока пользователь закроет и снова откроет страницы. Это полезно, если вы хотите, чтобы новые версии вашего сайта применялись сразу же после обновления
        skipWaiting: true,
      },
      devOptions: {
        enabled: true, // Отключает SW в режиме разработки
        navigateFallback: 'index.html', // Этот параметр определяет файл, который должен использоваться как резервный вариант при навигации, если запрашиваемый ресурс не найден. Чаще всего используется для поддержки режима SPA (Single Page Application), где все несуществующие пути перенаправляются на index.html.
        suppressWarnings: true, // Подавляет предупреждения, связанные с PWA или Service Worker-ом, в консоли во время разработки. Это может быть полезно для уменьшения шума в логах.
        type: 'module', // Указывает, что Service Worker должен использоваться как ES-модуль. Это полезно для использования современных JavaScript-функций и импорта/экспорта модулей непосредственно внутри
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 8080,
  },
})
