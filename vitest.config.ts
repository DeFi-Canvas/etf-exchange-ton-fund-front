import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
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
            ],
        },
    },
});
