import eslint from '@eslint/js';
import {defineConfig} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {ignores: ['dist', 'public', 'node_modules']},
    {
        extends: [eslint.configs.recommended, tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {globals: globals.node},
        rules: {
            '@typescript-eslint/no-unused-expressions': ['error', {allowShortCircuit: true, allowTernary: true}],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    args: 'after-used',
                    ignoreRestSiblings: true
                }
            ],
            '@typescript-eslint/no-explicit-any': ['error', {ignoreRestArgs: true}],
            '@typescript-eslint/no-duplicate-enum-values': 'off'
        }
    }
);
