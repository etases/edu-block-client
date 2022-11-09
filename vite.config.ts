import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
// import removeConsole from 'vite-plugin-remove-console'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
    }),
    tsConfigPaths(),
    dynamicImport(),
    // removeConsole(),
  ],
  server: {
    port: 3000,
    // host: '0.0.0.0',
    // https: true,
  },
})
