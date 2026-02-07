import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';

const customized = stylistic.configs.customize({
    indent: 4,
    quotes: 'single',
    semi: true,
    braceStyle: '1tbs',
    arrowParens: 'always',
});

export default defineConfig([
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: 'latest',
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            ...customized.rules,
            '@stylistic/linebreak-style': [
                'error',
                'unix',
            ],
            'camelcase': ['off'],
            'prefer-const': ['error'],
        },
    },
]);
