import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        include: ['src/**/*.{test,spec}.ts'],
        coverage: {
            exclude: [
                'src/**/*.test.ts',
                'src/**/*.tsx',
                'src/API/contracts/**',
                'src/API/scheme/rest-genereted/**',
                'vitest.config.ts',
                'vite.config.ts',
                '.eslintrc.cjs',
                'src/*.ts',
                'dist/assets',
                'src/navigation/containers.ts',
                'src/navigation/page-containers.ts/deposit-containers.ts',
                'src/navigation/page-containers.ts/whalet-containers.ts',
                'src/navigation/page-containers.ts/what-to-buy-containers.ts',
                'src/navigation/page-containers.ts/withdraw-containers.ts',
                'src/navigation/page-routes/deposit-router.ts',
                'src/navigation/page-routes/index-router.ts',
                'src/navigation/page-routes/what-to-buy-router.ts',
                'src/navigation/page-routes/withdraw-router.ts',
            ],
        },
    },
});
