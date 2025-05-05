import type { THashConfig } from '../../config.hash';
import type { TStatistics } from './def';
import type { TReport } from './getFileDataCore';
import { groupBy } from 'es-toolkit/array';
import { name } from '../../../package.json';

export function get_statistics_report(datas: readonly TReport[], selectConfig: THashConfig): TStatistics {
    const minVal: number = selectConfig.minCollisionValueToShow;
    const map: Record<string, TReport[]> = groupBy(datas, (item: TReport): string => {
        // if node >= 21 , use Map.groupBy()
        return item.hash.v;
    });

    const report: Record<string, string[]> = {};

    for (const [k, report0] of Object.entries(map)) {
        if (report0.length > minVal) {
            report[k] = report0.map((v) => v.path);
        }
    }

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
