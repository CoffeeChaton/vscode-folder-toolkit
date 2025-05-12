import picomatch from 'picomatch';
import { expect, it } from 'vitest';
import { fn0, fn1 } from './regexp_vs_picomatch.ts';

it('check picomatch exp', (): void => {
    const ignorePatterns = ['**/node_modules/**', '**/.git/**'];
    const excludeMatcher = picomatch(ignorePatterns /*{ dot: true }*/);

    const map = [
        [false, '/home/w2u/dev/vscode-folder-toolkit/node_modules'],
        [false, '/home/w2u/dev/vscode-folder-toolkit/.git'],
        [true, '/home/w2u/dev/vscode-folder-toolkit/src'],
        [true, '/home/w2u/dev/vscode-folder-toolkit/src/a.ts'],
    ] as const;

    for (const [shouldbe, fsPath] of map) {
        const shouldExclude: boolean = excludeMatcher(fsPath);
        expect(!shouldExclude).toBe(shouldbe);
    }
});

it('check picomatch deep EQ 2', (): void => {
    const path_list = ['/home/w2u/dev/vscode-folder-toolkit/'];

    const ans0 = fn0(path_list);
    const ans1 = fn1(path_list);
    // console.log({
    //     '#run': true,
    //     ans0_size: ans0.size,
    //     ans1_size: ans1.size,
    // });
    expect(ans0.size).toBe(ans1.size);
    expect(ans0).toStrictEqual(ans1);
});
