import type { THashConfig } from '../../config.hash.ts';
import type { TProgress, TToken } from './def.ts';
import type { THashReport } from './getHashCore.ts';
import * as vscode from 'vscode';
import { safeParserConfig0 } from '../../config.hash.schema.ts';
import { name } from '../../package.json.ts';
import { openAndShow } from '../share/openAndShow.ts';
import { getHashCore } from './getHashCore.ts';
import { json2md } from './json2md.ts';

async function getConfig(): Promise<THashConfig | undefined> {
    const allConfig = vscode.workspace.getConfiguration(name);
    const section = 'hashToolkitConfig';
    const Configs: unknown = allConfig.get<unknown>(section);
    if (!Array.isArray(Configs)) {
        vscode.window.showErrorMessage(`${name}.${section} should be an array`);
        return;
    }

    for (const config of Configs) {
        const c = safeParserConfig0(config);
        if (!c.success) {
            vscode.window.showErrorMessage(`${name}.${section} some config is invalid`);
            void openAndShow('json', JSON.stringify(c.issues, null, '\t'));
            return;
        }
    }

    type TItem = {
        label: string,
        v: THashConfig,
    };
    const items: TItem[] = Configs.map((v: THashConfig): TItem => ({ label: `${v.name}(${v.fn}/${v.report})`, v }));
    const config: TItem | undefined = await vscode.window.showQuickPick(items, { title: 'report style' });
    if (config === undefined) return;
    return structuredClone(config.v);
}

export async function getHashVsc(_file: vscode.Uri, selectedFiles: vscode.Uri[]): Promise<void> {
    const select: readonly string[] = selectedFiles.map((u): string => u.fsPath.replaceAll('\\', '/'));

    const selectConfig: THashConfig | undefined = await getConfig();
    if (selectConfig === undefined) return;

    const { blockList } = selectConfig;

    vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'calc hash',
            cancellable: true,
        },
        async (progress: TProgress, token: TToken) => {
            token.onCancellationRequested((): void => {
                vscode.window.showInformationMessage('task is cancel');
            });
            const ans: THashReport = await getHashCore(
                select,
                blockList,
                selectConfig,
                progress,
                token,
            );

            const { report } = selectConfig;
            if (report === 'json' || report === 'both') {
                const { json } = ans;
                void openAndShow('json', JSON.stringify(json, null, '\t'));
            }

            if (report === 'md' || report === 'both') {
                void openAndShow('markdown', json2md(ans.json));
            }

            if (Object.keys(ans.errLog).length > 0) {
                const { errLog } = ans;
                ans.errLog = {};
                void openAndShow('json', JSON.stringify(errLog, null, '\t'));
            }

            progress.report({ message: 'finish', increment: 100 });
            //   vscode.window.showInformationMessage('task is finish');
        },
    );
}
