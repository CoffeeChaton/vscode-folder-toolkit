import { styleText } from 'node:util'; // need node.js >= v21.7.0, v20.12.0 , only use in debug now

export function bold(text: string): string {
    return styleText('bold', text);
}

export function gray(text: string): string {
    return styleText('gray', text);
}

export function blue(text: string): string {
    return styleText('blue', text);
}

export function red(text: string): string {
    return styleText('red', text);
}

export function yellow(text: string): string {
    return styleText('yellow', text);
}

export function green(text: string): string {
    return styleText('green', text);
}
