import type { InferOutput } from 'valibot';
import type { THashConfig } from './config.hash.ts';
import { array, literal, number, object, pipe, safeParser, string, toMinValue, union } from 'valibot';

const schema = object({
    name: string(),
    fn: union([literal('sha1'), literal('sha256'), literal('md5')]),
    report: union([literal('json'), literal('md'), literal('both')]),
    maxOpenFiles: pipe(number(), toMinValue(1)),
    minCollisionValueToShow: pipe(number(), toMinValue(1)),
    blockList: array(string()),
});

type TSchema = typeof schema;

export type TCheck = {
    success: boolean,
    issues: unknown, // keep isolatedDeclarations happy
};

export function safeParserConfig0(data: unknown): TCheck {
    return safeParser(schema)(data);
}

{
    // check type in tsc
    type THashConfig_valibot = InferOutput<TSchema>;

    const _test_2: IsEqual<THashConfig_valibot, THashConfig> = true;
}
