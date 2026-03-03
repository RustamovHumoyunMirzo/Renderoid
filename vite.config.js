import { defineConfig } from 'vite'

export default defineConfig({
  root: 'playground',
  build: {
    outDir: '../dist',
    lib: {
      entry: '../src/index.js',
      name: 'Renderoid',
      formats: ['es', 'umd'],
      fileName: (format) => `renderoid.${format}.js`
    },
    rollupOptions: {
      external: [],
    }
  },
  server: {
    port: 5173
  }
})