module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'next/core-web-vitals',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
    ],
    plugins: ['unused-imports', '@typescript-eslint', 'jest-dom'],
    rules: {
        'unused-imports/no-unused-imports-ts': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'import/newline-after-import': ['error'],
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: true,
            },
        ],
    },
};
