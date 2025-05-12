import picomatch from 'picomatch';
import { getfsPathList, type TFilter } from '../CollectorFsPathEx.ts';

export const fn0 = (path_list: string[]): ReadonlySet<string> => {
    const rgList = [
        /(?:\/|^)node_modules(?:$|\/)/u,
        /(?:\/|^).git(?:$|\/)/u,
    ];

    const filter: TFilter = (path: string, rootPath: string): boolean => {
        // biome-ignore lint/style/useTemplate: <explanation>
        const matchPath: string = path.replace(rootPath + '/', '');
        return !rgList.some((rg) => rg.test(matchPath));
    };

    return getfsPathList(path_list, filter);
};

export const fn1 = (path_list: string[]): ReadonlySet<string> => {
    const ignorePatterns = [
        '**/node_modules/**',
        '**/.git/**',
    ];
    const excludeMatcher = picomatch(ignorePatterns, { dot: true, windows: false });

    const filter: TFilter = (path: string, rootPath: string): boolean => {
        // biome-ignore lint/style/useTemplate: <explanation>
        const matchPath: string = path.replace(rootPath + '/', '');
        return !excludeMatcher(matchPath);
    };

    return getfsPathList(path_list, filter);
};
