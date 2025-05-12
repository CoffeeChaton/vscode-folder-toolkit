import { expect, it } from 'vitest';
import json from '../package.json' with { type: 'json' };
import { safeParserConfig0 } from './config.hash.schema.ts';

const { configuration } = json.contributes;

it('check config-0 default val is allow', (): void => {
    const list: unknown[] = configuration[0].properties['vscode-folder-toolkit.hashToolkitConfig']?.default ?? [];

    for (const data of list) {
        const shouldBeOK = safeParserConfig0(data);
        expect(shouldBeOK.success).toBe(true);
    }
});
