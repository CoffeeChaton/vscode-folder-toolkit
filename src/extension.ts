import * as vscode from 'vscode';
import { getHashVsc } from './command/getHash/getHashVsc.ts';
import { img2webp } from './command/img2webp/img2webp.ts';
import { my_ffmpeg } from './command/my_ffmpeg/my_ffmpeg.ts';

export function activate(context: vscode.ExtensionContext): void {
    // https://github.com/microsoft/vscode/blob/89d6652d8f895f097de8c6ebb06981f92e59a130/extensions/git/package.nls.json#L99
    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-folder-toolkit.getHash', getHashVsc),
        vscode.commands.registerCommand('vscode-folder-toolkit.img2webp', img2webp),
        vscode.commands.registerCommand('vscode-folder-toolkit.my_ffmpeg', my_ffmpeg),
    );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
