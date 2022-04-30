import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'
import { bold, cyan, dim, magenta } from 'picocolors'
import micromatch from 'micromatch'
import type { Options } from './types'
import { ReloadSymbol } from './constant'

function log(file: string) {
// eslint-disable-next-line no-console
  console.log(
    `${dim(new Date().toLocaleTimeString())}`
  + ` ${bold(magenta(ReloadSymbol))} `
  + `${cyan(`reloading by file change: ${file}`)}`,
  )
}

export function touchConfigFile(configFile: string) {
  fs.utimesSync(configFile, Date.now(), Date.now())
}

export function createWatcher(options: Options, server: ViteDevServer, configFile: string) {
  const { includes, deplay } = options
  if (!includes.length)
    return () => undefined

  const { watcher } = server
  watcher.add(includes)
  watcher.on('change', (file: string) => {
    if (micromatch.isMatch(file, includes) || includes.some(include => file.startsWith(include))) {
      log(path.resolve(file))

      if (file === configFile)
        return
      setTimeout(() => {
        touchConfigFile(configFile)
      }, deplay)
    }
  })

  return () => {
    watcher.unwatch(includes)
  }
}

export type UnWatch = ReturnType<typeof createWatcher>
