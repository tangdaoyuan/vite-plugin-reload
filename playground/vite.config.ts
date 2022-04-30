import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginReload from '../src'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePluginReload({
    includes: ['../src/**/*'],
  })],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
