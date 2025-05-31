import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
    base: '/',
    resolve: {
        alias: {
            util: 'rollup-plugin-node-polyfills/polyfills/util',
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
            // 'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
        svgr(),
        // Allows using self-signed certificates to run the dev server using HTTPS.
        // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
        basicSsl(),
    ],
    publicDir: './public',
    server: {
        // Exposes your dev server and makes it accessible for the devices in the same network.
        host: true,
    },
    build: {
        // minify: 'terser',
        // rollupOptions: {
        //     output: {
        //         manualChunks(id) {
        //             if (id.includes('node_modules')) {
        //                 return id
        //                     .toString()
        //                     .split('node_modules/')[1]
        //                     .split('/')[0]
        //                     .toString();
        //             }
        //         },
        //     },
        //     cache: true,
        // },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
