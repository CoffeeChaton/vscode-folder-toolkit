// eslint-disable no-unused-vars
import { matchesGlob } from 'node:path'; // Stability: 1 - Experimental ...
import { bench, group, run, summary } from 'mitata';
import picomatch from 'picomatch';
import { getfsPathList } from '../CollectorFsPathEx.js';

const settings = {
    small: ['/home/w2u/dev/', '/home/w2u/.cache/'],
    a2: ['/home/w2u/dev/', '/home/w2u/.cache/', '/home'],
    a3: ['/home', '/home/w2u/dev/', '/home/w2u/.cache/'],
};

async function main() {
    for (const [name, searchs] of Object.entries(settings)) {
        const rg = /\/(?:node_modules|\.git)$/u;
        const file_list = [...getfsPathList(searchs, (path: string) => !rg.test(path))];

        group(`${name} (length ${JSON.stringify(searchs)})(size ${file_list.length})`, () => {
            summary(() => {
                bench('matchesGlob', async () => {
                    for (const fs_path of file_list) {
                        matchesGlob(fs_path, '**/*.ts');
                    }
                });
                bench('picomatch', async () => {
                    const isMatch = picomatch('**/*.ts');
                    for (const fs_path of file_list) {
                        isMatch(fs_path);
                    }
                });
            });
        });
    }

    await run();
}
void main();
