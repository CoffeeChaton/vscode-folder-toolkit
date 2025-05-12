import { expect, it } from 'vitest';
import json from '../../package.json' with { type: 'json' };
import { safeParserConfig_1 } from './img2webps.chema.ts';
const { configuration } = json.contributes;

it('check config-0 default val is allow', (): void => {
    const list: unknown[] = configuration[1].properties['vscode-folder-toolkit.img2webp']?.default ?? [];

    for (const data of list) {
        const shouldBeOK = safeParserConfig_1(data);
        expect(shouldBeOK.success).toBe(true);
    }
});
