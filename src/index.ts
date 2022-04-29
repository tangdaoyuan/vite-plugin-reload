import type { Plugin } from 'vite'
import { transform } from './transform'

export default function viteReloadPlugin(): Plugin {
  return {
    name: 'vite-plugin-reload',
    transform(code, id) {
      transform(code, id)
    },
  }
}
