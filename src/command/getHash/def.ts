import type * as vscode from 'vscode';

import type { TReport } from './getFileDataCore.ts';

export type TProgress = vscode.Progress<{
    message: string,
    increment: number,
}>;

export type TToken = vscode.CancellationToken;

type TErrMsg = {
    fsPath: string,
    error: unknown,
};

export type TErrorLog = Record<string, TErrMsg[]>;

export type TStatisticsReport = {
    hash: string,
    counter: number,
    files: string[],
};

export type TStatistics = {
    msg: string[],
    report: TStatisticsReport[],
};

export type TJSON = {
    header: unknown,
    body: {
        datas: readonly TReport[],
        statistics: TStatistics,
    },
    footer: unknown,
};
