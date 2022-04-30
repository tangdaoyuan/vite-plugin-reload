import fs from 'fs'
import path from 'path'
import os from 'os'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { watch } from 'chokidar'
import type { ViteDevServer } from 'vite'
import { defaultOptions } from '../src/options'
import { createWatcher } from '../src/watcher'

const configFile = 'vite.config.ts' as const

const options = {
  ...defaultOptions,
  includes: [fs.mkdtempSync(path.join(os.tmpdir(), 'vite-plugin-reload'))],
}

function createMockConfigFile(tmpDir: string) {
  const configFilePath = path.join(tmpDir, configFile)
  fs.writeFileSync(configFilePath, '')

  return {
    configFilePath,
    cleanup: () => {
      fs.unlinkSync(configFilePath)
      fs.rmdirSync(tmpDir)
    },
  }
}

function createMockWatcher(server: ViteDevServer) {
  server.watcher = watch('.')

  const { cleanup, configFilePath } = createMockConfigFile(options.includes[0])
  const unWatch = createWatcher(options, server, configFilePath)
  return () => {
    unWatch()
    server.watcher.close()
    cleanup()
  }
}

describe('basic', () => {
  const $console = vi.spyOn(console, 'log').mockImplementation(() => undefined)

  const server = {} as ViteDevServer
  let unWatch: Function = () => undefined
  beforeAll(() => {
    vi.useFakeTimers()
    unWatch = createMockWatcher(server)
  })

  afterAll(() => {
    unWatch()
    vi.useRealTimers()
  })

  it('works', async() => {
    expect($console).not.toBeCalled()
    expect(server.watcher.listenerCount('change')).toBe(1)
    const configPath = path.join(options.includes[0], configFile)
    server.watcher.emit('change', configPath)
    expect($console).toBeCalledTimes(1)
  })
})
