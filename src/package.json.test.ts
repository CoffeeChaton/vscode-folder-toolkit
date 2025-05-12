import { expect, it } from 'vitest';
import json from '../package.json' with { type: 'json' };
import * as json2 from './package.json.ts';

it('check pack .json === .ts', (): void => {
    const jsonTsHappy = json as unknown as Record<string, unknown>;
    for (const [k, v] of Object.entries(json2)) {
        expect(jsonTsHappy[k]).toBe(v);
    }
});
