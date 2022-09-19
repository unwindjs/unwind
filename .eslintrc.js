// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'plugin:typescript-sort-keys/recommended',
	],
	overrides: [
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'react-hooks',
		'sort-keys-fix',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		'no-unused-vars': 'off',
		quotes: ['error', 'single', { 'avoidEscape': true }],
		'react/jsx-sort-props': ['error', { shorthandFirst: true }],
		'react/prop-types': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		semi: ['error', 'never'],
		'sort-keys-fix/sort-keys-fix': ['error', 'asc', { natural: true }],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
