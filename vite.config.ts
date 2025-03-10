import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      name: 'WegarPackageWegarStore',
      formats: ['es', 'cjs', 'umd'],
      entry: './src/store/index.ts',
      fileName: (format) => {
        if (format === 'es') {
          return 'index.mjs'
        }
        if (format === 'cjs') {
          return 'index.cjs'
        }
        return 'index.js'
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'zustand'],
      output: {
        globals: {
          react: 'WegarPackageReact',
          'react-dom': 'WegarPackageReactDOM',
          zustand: 'WegarPackageZustand',
        },
      },
    },
  }
})
