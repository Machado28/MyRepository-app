module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],

	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
		'import/prefer-default-export': 'off',
	},
};
