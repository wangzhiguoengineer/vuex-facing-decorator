module.exports = {
    'env': {
        'node': true,
        'browser': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        '@typescript-eslint/no-explicit-any': 'off',
    },
    'ignorePatterns': ['node_modules', 'dist'],
};
