import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
    server: {
        port: 4000
    },
    plugins: [
        nodePolyfills(),
    ],
});
