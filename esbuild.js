/* eslint-disable @typescript-eslint/use-unknown-in-catch-callback-variable */
/* eslint-disable no-undef */
import { writeFile } from 'node:fs/promises';
import { context } from 'esbuild';

// const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
    name: 'esbuild-problem-matcher',

    setup(build) {
        build.onStart(() => {
            console.log('[watch] build started');
        });
        build.onEnd((result) => {
            result.errors.forEach(({ text, location }) => {
                console.error(`✘ [ERROR] ${text}`);
                console.error(`    ${location.file}:${location.line}:${location.column}:`);
            });
            console.log('[watch] build finished');
        });
    },
};

async function main() {
    const ctx = await context({
        entryPoints: [
            'src/extension.ts',
        ],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        //  sourcesContent: false,
        platform: 'node',
        outdir: 'dist',
        // loader: { '.wasm': 'file', '.node': 'file' },
        external: ['vscode'],
        // logLevel: 'silent',
        plugins: [
            /* add to the end of plugins array */
            esbuildProblemMatcherPlugin,
        ],
        metafile: !watch,
        legalComments: 'linked',
        target: ['node20.18'],
        treeShaking: true,
    });
    if (watch) {
        await ctx.watch();
    } else {
        const { metafile } = await ctx.rebuild();
        await writeFile('dist/meta.json', JSON.stringify(metafile, null, '\t'));
        await ctx.dispose();
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
