import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
// import removeConsole from 'vite-plugin-remove-console'
import svgr from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
    }),
    tsConfigPaths(),
    dynamicImport(),
    svgr(),
    splitVendorChunkPlugin(),
    // removeConsole(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    // https: true,
  },
  build: {
    manifest: true,
    minify: 'esbuild',
    // terserOptions: {
    //   parse: {
    //     bare_returns: true,
    //     html5_comments: false,
    //     shebang: false,
    //   },
    //   compress: {
    //     arguments: true,
    //     booleans_as_integers: true,
    //     drop_console: true,
    //     passes: 3,
    //   },
    //   mangle: {
    //     properties: true,
    //     keep_fnames: false,
    //     keep_classnames: false,
    //   },
    //   format: {
    //     indent_level: 2,
    //     shebang: false,
    //   },
    // },
  },
})
