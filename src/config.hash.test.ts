import { expect, it } from 'vitest';
import { contributes } from '../package.json';
import { safeParserConfig0 } from './config.hash.schema.ts';

const { configuration } = contributes;

it('check config-0 default val is allow', (): void => {
    const list: unknown[] = configuration[0].properties['vscode-folder-toolkit.hashToolkitConfig']?.default ?? [];

    for (const data of list) {
        const shouldBeOK = safeParserConfig0(data);
        expect(shouldBeOK.success).toBe(true);
    }
});
