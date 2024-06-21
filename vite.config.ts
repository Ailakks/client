import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
    plugins: [
        nodePolyfills()
    ],
    resolve: {
        alias: {
            stream: 'stream-browserify',
            buffer: 'buffer',
        }
    },
    define: {
        global: 'globalThis'
    }
});
