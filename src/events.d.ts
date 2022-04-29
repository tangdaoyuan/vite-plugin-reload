import 'vite/types/customEvent'
import type { ReloadSymbol } from './constant'

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    [ReloadSymbol]: null
  }
}
