import type { TImg2webp_config } from '../../config/img2webp.def.ts';
import type { TProgress, TToken } from '../getHash/def.ts';
import * as vscode from 'vscode';
import { safeParserConfig_1 } from '../../config/img2webps.chema.ts';
import { name } from '../../package.json.ts';
import { get_bin_Path } from '../share/get_bin_Path.ts';
import { openAndShow } from '../share/openAndShow.ts';
import { img2webpCore } from './img2webpCore.ts';

async function getConfig(): Promise<TImg2webp_config | undefined> {
    const allConfig = vscode.workspace.getConfiguration(name);
    const section = 'img2webp';
    const Configs: unknown = allConfig.get<unknown>(section);
    if (!Array.isArray(Configs)) {
        vscode.window.showErrorMessage(`${name}.${section} should be an array`);
        return;
    }

    for (const config of Configs) {
        const c = safeParserConfig_1(config);
        if (!c.success) {
            vscode.window.showErrorMessage(`${name}.${section} some config is invalid`);
            void openAndShow('json', JSON.stringify(c.issues, null, '\t'));
            return;
        }
    }

    type TItem = {
        label: string,
        v: TImg2webp_config,
    };
    const items: TItem[] = Configs.map((v: TImg2webp_config): TItem => ({ label: v.name, v }));
    const config: TItem | undefined = await vscode.window.showQuickPick(items, { title: 'select option' });
    if (config === undefined) return;
    return structuredClone(config.v);
}

export async function img2webp(_file: vscode.Uri, selectedFiles: vscode.Uri[]): Promise<void> {
    const select: readonly string[] = selectedFiles.map((u): string => u.fsPath.replaceAll('\\', '/'));

    const cwebp_Path: string | undefined = get_bin_Path('cwebp_Path');
    if (cwebp_Path === undefined) return;

    const selectConfig: TImg2webp_config | undefined = await getConfig();
    if (selectConfig === undefined) return;

    vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'img2webp',
            cancellable: true,
        },
        async (progress: TProgress, token: TToken) => {
            token.onCancellationRequested((): void => {
                vscode.window.showInformationMessage('task is cancel!');
            });
            const ans = await img2webpCore(
                cwebp_Path,
                select,
                selectConfig,
                progress,
                token,
            );

            if (token.isCancellationRequested) return;

            if (selectConfig.repors.includes('json')) {
                void openAndShow('json', JSON.stringify(ans.json_report, null, '\t'));
            }
            if (selectConfig.repors.includes('md')) {
                void openAndShow('markdown', ans.markdown);
            }

            progress.report({ message: 'finish', increment: 100 });
            vscode.window.showInformationMessage('task is finish');
        },
    );
}
