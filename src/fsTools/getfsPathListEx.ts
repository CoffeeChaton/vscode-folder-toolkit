import type { TFilter } from './CollectorFsPathEx.ts';
import { getfsPathList } from './CollectorFsPathEx.ts';

type TRes = {
    included: readonly string[],
    excluded: Record<string, readonly string[]>,
};

export function getfsPathListEx(
    select: readonly string[],
    blockListRaw: readonly string[],
): TRes {
    type TBlockRuler = {
        name: string,
        reg: RegExp,
    };

    const blockList: readonly TBlockRuler[] = blockListRaw.map((reg: string): TBlockRuler => ({ name: reg, reg: new RegExp(reg) }));

    const excluded: Record<string, string[]> = {};

    const filter: TFilter = (path: string, root: string): boolean => {
        // biome-ignore lint/style/useTemplate: <explanation>
        const checkPath: string = path.replace(root + '/', '');
        const blockingRule: TBlockRuler | undefined = blockList.find(({ reg }) => reg.test(checkPath));
        if (blockingRule) {
            excluded[blockingRule.name] ??= [];
            excluded[blockingRule.name].push(path);
            return false;
        }

        return true;
    };

    const included: ReadonlySet<string> = getfsPathList(select, filter);

    return {
        included: [...included],
        excluded,
    };
}
