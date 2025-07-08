import type { RolldownOptions } from 'rolldown';
import { defineConfig } from 'rolldown';

const config: RolldownOptions = defineConfig({
    input: 'src/extension.ts',
    output: {
        file: 'dist/extension.js',
        format: 'esm',
        minify: false,
        sourcemap: true,

        legalComments: 'inline', // esbuild legalComments: 'linked', // https://github.com/rolldown/rolldown/pull/4528
    },
    transform: {
        target: 'es2022', // happy of nodejs 20 // https://github.com/rolldown/rolldown/pull/4651
    },
    treeshake: true,
    external: ['vscode'],
    platform: 'node',
});
export default config;
