import type { Plugin, ViteDevServer } from 'vite'
import { ReloadSymbol } from './constant'
import { defaultOptions } from './options'
import type { Options } from './types'
import { createWatcher } from './watcher'

export default function ViteReloadPlugin(options?: Partial<Options>): Plugin {
  const _options = { ...defaultOptions, ...options }

  let configFile: string | undefined
  return {
    name: 'vite-plugin-reload',
    apply: 'serve',
    enforce: 'pre',
    config(c) {
      if (!c.server)
        c.server = {}
      if (!c.server.watch)
        c.server.watch = {}

      c.server.watch.disableGlobbing = false
    },
    configResolved(c) {
      configFile = c.configFile
    },
    configureServer(server: ViteDevServer) {
      server.ws.on(ReloadSymbol, () => {
        server.ws.send({ type: 'full-reload' })
      })
      createWatcher(_options, server, configFile!)
    },
  }
}
