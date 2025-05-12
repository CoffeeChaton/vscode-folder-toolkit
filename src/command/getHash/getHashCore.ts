import type { THashConfig } from '../../config.hash.ts';
import type { TErrorLog, TJSON, TProgress, TToken } from './def.ts';
import type { TReport } from './getFileDataCore.ts';
import { getfsPathListEx } from '../../fsTools/getfsPathListEx.ts';
import { sum } from '../../Math/sum.ts';
import { homepage, version } from '../../package.json.ts';
import { fmtFileSize } from '../../utility/fmtFileSize.ts';
import { get_statistics_report } from './get_statistics_report.ts';
import { getFileDataCoreEx } from './getFileDataCore.ts';

export type THashReport = {
    json: TJSON,
    errLog: TErrorLog,
};

export async function getHashCore(
    select: readonly string[],
    blockList: readonly string[],
    selectConfig: THashConfig,
    progress: TProgress,
    token: TToken,
): Promise<THashReport> {
    const timeStart: number = Date.now();
    const { included, excluded } = getfsPathListEx(select, blockList);
    progress.report({ message: `total has ${included.length} files to calc hash`, increment: 0 });

    const errLog: TErrorLog = {};
    const datas: readonly TReport[] = await getFileDataCoreEx(included, selectConfig, errLog, progress, token);

    const list: number[] = datas.map(v => v.Bytes);
    const totalSize: string = fmtFileSize(sum(list), 2);
    const totalFile: number = list.length;
    const timeEnd: number = Date.now();
    const useMs: number = timeEnd - timeStart;

    // -------
    const comment = {
        version,
        homepage,
    };

    const json: TJSON = {
        header: { comment, select },
        body: {
            datas,
            statistics: get_statistics_report(datas, selectConfig),
        },
        footer: { useMs, totalSize, totalFile, selectConfig, excluded },
    };

    return {
        json,
        errLog,
    };
}
