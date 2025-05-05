import { bench, group, run, summary } from 'mitata';
import { getfsPathList } from '../CollectorFsPathEx.js';
import { fn0, fn1 } from './regexp_vs_picomatch.js';

const settings = {
    small: ['/home/w2u/dev/', '/home/w2u/.cache/'],
    a2: ['/home/w2u/dev/', '/home/w2u/.cache/', '/home'],
    a3: ['/home', '/home/w2u/dev/', '/home/w2u/.cache/'],
};

async function main() {
    for (const [name, path_list] of Object.entries(settings)) {
        const rg = /\/(?:node_modules|\.git)$/u;
        const file_list = [...getfsPathList(path_list, (path: string) => !rg.test(path))];

        group(`${name} (length ${JSON.stringify(path_list)})(size ${file_list.length})`, () => {
            summary(() => {
                bench('regexp', async () => {
                    fn0(path_list);
                });
                bench('picomatch', async () => {
                    fn1(path_list);
                });
            });
        });
    }

    await run();
}
void main();
