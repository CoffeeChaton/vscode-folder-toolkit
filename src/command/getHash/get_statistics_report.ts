import type { THashConfig } from '../../config.hash.ts';
import type { TStatistics, TStatisticsReport } from './def.ts';
import type { TReport } from './getFileDataCore.ts';
import { name } from '../../package.json.ts';

function get_report(datas: readonly TReport[], minVal: number): TStatisticsReport[] {
    const map: Map<string, TReport[]> = Map.groupBy(datas, (item: TReport): string => item.hash.v);

    const report: TStatisticsReport[] = [];

    for (const [key, files] of map) {
        if (files.length > minVal) {
            report.push({
                hash: key,
                counter: files.length,
                files: files.map((item: TReport): string => item.path),
            });
        }
    }

    report.sort((a: TStatisticsReport, b: TStatisticsReport): number => b.counter - a.counter);

    return report;
}

export function get_statistics_report(datas: readonly TReport[], selectConfig: THashConfig): TStatistics {
    const minVal: number = selectConfig.minCollisionValueToShow;
    const report: TStatisticsReport[] = get_report(datas, minVal);

    const mini_opt = 'minCollisionValueToShow';
    const section = 'hashToolkitConfig';
    const full_key = `${name}.${section}`;

    const msg: string[] = [
        '1. notes: Different files may happen to have the same hash, which is called [Hash collision](https://en.wikipedia.org/wiki/Hash_collision).',
        `2. your't setting only show \` > ${minVal}\` from \`${mini_opt}\``,
        `3. [settings.json](vscode://settings/${full_key})`,
    ];

    return {
        msg,
        report,
    };
}
