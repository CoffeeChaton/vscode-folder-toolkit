import type { InferOutput } from 'valibot';
import type { TImg2webp_config } from './img2webp.def.ts';
import { array, literal, number, object, safeParser, string, union } from 'valibot';

const schema = object({
    name: string(),
    opt: string(),
    allowList: array(string()),
    max_cover_files: number(),
    repors: array(union([literal('json'), literal('md')])),
    blockList: array(string()),
});

export type TCheck = {
    success: boolean,
    issues: unknown, // keep isolatedDeclarations happy
};

export function safeParserConfig_1(data: unknown): TCheck {
    return safeParser(schema)(data);
}

{
    // check type in tsc
    type T_schema = InferOutput<typeof schema>;
    const _test_1: IsEqual<T_schema, TImg2webp_config> = true;
}
