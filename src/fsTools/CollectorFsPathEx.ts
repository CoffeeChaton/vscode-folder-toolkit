// eslint-disable no-plusplus
import type { Stats } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';
import { N } from './N';

export type TFilter = (path: string, rootPath: string) => boolean;

function search(
    fsPath: string,
    need: Set<string>,
    rootPath: string,
    filter: TFilter,
): void {
    const stats: Stats = statSync(fsPath);
    if (stats.isDirectory()) {
        const files: string[] = readdirSync(fsPath);
        const len = files.length;
        for (let i = 0; i < len; i++) {
            const path = `${fsPath}/${files[i]}`;
            if (filter(path, rootPath)) {
                search(path, need, rootPath, filter);
            }
        }
    } else if (stats.isFile()) {
        need.add(fsPath);
    }
}

export function getfsPathList(
    searchs: readonly string[],
    filter: TFilter,
): ReadonlySet<string> {
    const need: Set<string> = new Set<string>();
    const len = searchs.length;
    for (let i = 0; i < len; i++) {
        const root: string = N(searchs[i]);
        search(root, need, root, filter);
    }

    return need;
}

// this is quick with `readdirSync(fsPath { recursive :true});` ...
