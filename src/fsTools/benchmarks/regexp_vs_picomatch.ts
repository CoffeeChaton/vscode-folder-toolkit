import picomatch from 'picomatch';
import { getfsPathList, type TFilter } from '../CollectorFsPathEx.ts';

export const fn0 = (path_list: string[]): ReadonlySet<string> => {
    const rgList = [
        /(?:\/|^)node_modules(?:$|\/)/u,
        /(?:\/|^).git(?:$|\/)/u,
    ];

    const filter: TFilter = (path: string): boolean => {
        return !rgList.some((rg) => rg.test(path));
    };

    return getfsPathList(path_list, filter);
};

export const fn1 = (path_list: string[]): ReadonlySet<string> => {
    const ignorePatterns = [
        '**/node_modules/**',
        '**/.git/**',
    ];
    const excludeMatcher = picomatch(ignorePatterns, { dot: true, windows: false });

    const filter: TFilter = (path: string): boolean => {
        return !excludeMatcher(path);
    };

    return getfsPathList(path_list, filter);
};
