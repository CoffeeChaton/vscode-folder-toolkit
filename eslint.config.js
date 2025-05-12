// @ts-check
// import oxlint from 'eslint-plugin-oxlint';
import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

const tseslint_ruler = tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    //
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        'eslint.config.js',
                        // 'esbuild.js',
                    ],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowNumber: true,
                    allowBoolean: true,
                    allowNullish: false,
                    allowAny: false,
                },
            ],
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'type',
            ],
        },
    },
);

const config = [
    {
        plugins: {
            perfectionist,
        },
        // https://github.com/antfu/eslint-config/blob/main/src/configs/perfectionist.ts
        rules: {
            'perfectionist/sort-exports': ['warn', { order: 'asc', type: 'natural' }],
            'perfectionist/sort-imports': ['warn', {
                groups: [
                    'type',
                    ['parent-type', 'sibling-type', 'index-type', 'internal-type'],

                    'builtin',
                    'external',
                    'internal',
                    ['parent', 'sibling', 'index'],
                    'side-effect',
                    'object',
                    'unknown',
                ],
                newlinesBetween: 'ignore',
                order: 'asc',
                type: 'natural',
            }],
            'perfectionist/sort-named-exports': ['warn', { order: 'asc', type: 'natural' }],
            'perfectionist/sort-named-imports': ['warn', { order: 'asc', type: 'natural' }],
        },
    },
    ...tseslint_ruler,
    sonarjs.configs.recommended, // https://github.com/SonarSource/SonarJS/blob/master/packages/jsts/src/rules/README.md#for-eslint-9
    {
        rules: {
            //
            'no-restricted-syntax': 'off',
            'sonarjs/no-commented-code': 'off',
            'sonarjs/os-command': 'off',
            'sonarjs/no-unused-vars': 'off',
            'sonarjs/no-nested-functions': 'off',
            // set TIMING=1 && eslint . --cache
            // > 10%
            'sonarjs/deprecation': 'off',
            'sonarjs/assertions-in-tests': 'off',
            'sonarjs/aws-restricted-ip-admin-access': 'off',
            'sonarjs/cognitive-complexity': 'off',
            'sonarjs/no-dead-store': 'off',
            'sonarjs/no-redundant-assignments': 'off',
            'sonarjs/no-skipped-tests': 'off',
        },
        ignores: [
            'dist/**/*.js',
        ],
    },
];

export default config;
