# vite-plugin-reload

> Reload Vite for plugin development

## Install

```
npm i vite-plugin-reload --save-dev
```


## Usage

  ```ts
  import VitePluginReload from 'vite-plugin-reload'

  export default defineConfig({
    plugins: [
      // ... etc
      VitePluginReload({
        includes: [
          '../src/**/*', // directory for plugin development
        ],
      }),
    ],
    // ...etc
  })
  ```


## Options

### includes

  - Array of files, directories, or glob patterns for tracking.
  - Default: `[]`
  - Example: `['../src/**/*']`

### delay

  - Delay in milliseconds to wait before reloading.
  - Default: `500`
  - Example: `500`
