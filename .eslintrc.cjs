// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path')

module.exports = {
    root: true,
    extends: [
        'brian',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        es2022: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        // 'eslint-plugin-tsdoc',
        'no-autofix',
    ],
    parserOptions: {
        sourceType: 'module',
        // ecmaVersion: '2022',
        // project: [
        //     path.join(__dirname, 'tsconfig.json'),
        //     path.join(__dirname, 'src/backend/tsconfig.json'),
        //     path.join(__dirname, 'src/frontend/tsconfig.json'),
        //     path.join(__dirname, 'src/ecs/tsconfig.json'),
        // ],
    },
    rules: {
        'prefer-const': 'off',
        'no-autofix/prefer-const': 'error',
        'unicorn/consistent-function-scoping': ['error', {
            checkArrowFunctions: false,
        }],
    },
    ignorePatterns: [
        'dist',
    ],
    // Fix import resolution
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
                // moduleDirectory: ['./'],
            },
        },
    },
}
