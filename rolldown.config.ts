import type { RolldownOptions } from 'rolldown';
import { defineConfig } from 'rolldown';

const config: RolldownOptions = defineConfig({
    input: 'src/extension.ts',
    output: {
        file: 'dist/extension.js',
        format: 'esm',
        minify: false,
        target: 'es2022', // happy of nodejs 20
        sourcemap: true,
        comments: 'preserve-legal', // esbuild legalComments: 'linked',
    },
    treeshake: true,
    external: ['vscode'],
    platform: 'node',
});
export default config;
