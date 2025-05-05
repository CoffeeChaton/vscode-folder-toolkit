import { expect, it } from 'vitest';
import { contributes } from '../package.json';
import { safeParserConfig0 } from './config.hash.schema';

const { configuration } = contributes;

it('check config-0 default val is allow', (): void => {
    const list: unknown[] = configuration[0].properties['vscode-folder-toolkit.hashToolkitConfig']?.default ?? [];

    for (const data of list) {
        const shouldBeOK = safeParserConfig0(data);
        expect(shouldBeOK.success).toBe(true);
    }
});

it('check config-0 fake input', (): void => {
    const data: unknown = {
        'name': 'default md5',
        'fn': 'md 5',
        'report': [
            'json',
            'md',
        ],
        'blockList': [
            '\\/node_modules(?:\\/|$)',
            '\\/\\.git(?:\\/|$)',
            '\\/\\.svn(?:\\/|$)',
        ],
    };

    const shouldBeError = safeParserConfig0(data);
    expect(shouldBeError.success).toBe(false); // report should be "json" | "md" | "both"
});
