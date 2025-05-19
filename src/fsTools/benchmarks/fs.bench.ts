/* eslint-disable sonarjs/prefer-single-boolean-return */
// eslint-disable no-unused-vars
import { fdir } from 'fdir';
import { bench, group, run, summary } from 'mitata';
import { getfsPathList } from '../CollectorFsPathEx.js';
import { readdirSync } from 'node:fs';

const settings = {
    small: ['/home/w2u/dev/', '/home/w2u/.cache/'],
    a2: ['/home/w2u/dev/', '/home/w2u/.cache/', '/home'],
    a3: ['/home', '/home/w2u/dev/', '/home/w2u/.cache/'],
};

async function main() {
    for (const [name, list] of Object.entries(settings)) {
        group(`${name} (length ${JSON.stringify(list)})`, () => {
            summary(() => {
                bench('fdir-sync', async () => {
                    for (const r of list) {
                        const api = new fdir()
                            .filter((path: string) => {
                                if (
                                    path.includes('node_modules')
                                    || path.includes('.git')
                                ) {
                                    return false;
                                }
                                return true;
                            }).withFullPaths().crawl(r);

                        const e = api.sync();
                    }
                });

                bench('fdir', async () => {
                    for (const r of list) {
                        const api = new fdir().filter((path: string) => {
                            if (
                                path.includes('node_modules')
                                || path.includes('.git')
                            ) {
                                return false;
                            }
                            return true;
                        }).withFullPaths().crawl(r);

                        const e = await api.withPromise();
                    }
                });

                bench('my_func', async () => {
                    const rg = /\/(?:node_modules|\.git)$/u;
                    const e = getfsPathList(list, (path: string) => {
                        if (
                            rg.test(path)
                        ) {
                            return false;
                        }
                        return true;
                    });
                });

                bench('my_func', async () => {
                    const rg = /\/(?:node_modules|\.git)$/u;
                    // eslint-disable-next-line sonarjs/no-unused-collection
                    const set = new Set<string>();
                    for (const path of list) {
                        const arr = readdirSync(path).filter((path: string) => {
                            if (
                                rg.test(path)
                            ) {
                                return false;
                            }
                            return true;
                        });
                        for (const a of arr) {
                            set.add(a);
                        }
                    }
                });
            });
        });
    }

    await run();
}
void main();
