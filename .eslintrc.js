// 'off' or 0 - turn the rule off
// 'warn' or 1 - turn the rule on as a warning (doesn� t affect exit code)
// 'error' or 1 - turn the rule on as an error (exit code is 1 when triggered)
/**
 * Setup for Javascript:
		root: true,
		parser: '@babel/eslint-parser',
		extends: ['@react-native-community'], // for RN
		extends: ['plugin:react/recommended'], // for Reactjs
		ignorePatterns: 'node_modules',
 * Setup for Typescript:
		root: true,
		parser: '@typescript-eslint/parser',
		plugins: ['@typescript-eslint'],
		extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'], // for RN
		extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'], // for Reactjs
		ignorePatterns: 'node_modules',
 */
/**
	* Additional rules
	* For React:
		'react/self-closing-comp': 1,
		'react/prop-types': 0,
		'react/jsx-no-bind': 0,
		'react/jsx-no-duplicate-props': 1,
		'react/jsx-uses-vars': 1,
		'react/jsx-props-no-multi-spaces': 1,
		'react/jsx-curly-spacing': [
			1, {
				'when': 'always',
				'children': true
			}
		],
	* For React Native:
		'react-native/no-inline-styles': 0,
  
	* For Typescript:
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
*/

// eslint-disable-next-line no-undef
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
	], // for Reactjs
	ignorePatterns: 'node_modules',
	env: { browser: true },
	settings: { react: { version: 'detect' } },
	globals: {
		JSX: true,
		module: true,
		React: true,
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'prettier/prettier': 0,
		'react/self-closing-comp': 1,
		'react/prop-types': 0,
		'react/jsx-no-bind': 0,
		'react/jsx-no-duplicate-props': 1,
		'react/jsx-uses-vars': 1,
		'react/jsx-props-no-multi-spaces': 1,
		'react/react-in-jsx-scope': 'off',
		'react/jsx-curly-spacing': [
			1,
			{
				when: 'always',
				children: true,
			},
		],
		'react-native/no-inline-styles': 0,
		'object-curly-spacing': [1, 'always'],
		'jsx-quotes': [1, 'prefer-single'],
		quotes: [1, 'single'],
		eqeqeq: 1,
		'no-undef': 1,
		'no-unneeded-ternary': 1,
		'no-extra-bind': 2,
		'no-console': 1,
		'no-trailing-spaces': [
			1,
			{
				skipBlankLines: true,
			},
		],
		'comma-spacing': [
			1,
			{
				before: false,
				after: true,
			},
		],
		semi: 2,
		'semi-spacing': 1,
		'semi-style': [1, 'last'],
		'keyword-spacing': 1,
		'key-spacing': 1,
		'array-bracket-spacing': 1,
		'arrow-parens': [1, 'as-needed'],
		'arrow-spacing': 1,
		'block-spacing': 1,
		'func-call-spacing': 1,
		'brace-style': [1, '1tbs', { allowSingleLine: true }],
		'space-before-blocks': 1,
		'space-before-function-paren': [1, 'never'],
		'space-in-parens': [1, 'never'],
		'space-infix-ops': 1,
		'space-unary-ops': [
			1,
			{
				words: true,
				nonwords: false,
				overrides: { '+': true },
			},
		],
		'spaced-comment': 1,
		'rest-spread-spacing': 2,
		'no-multiple-empty-lines': [
			1,
			{
				max: 1,
				maxEOF: 0,
			},
		],
		'newline-per-chained-call': 1,
		'object-curly-newline': [
			1,
			{
				ImportDeclaration: {
					multiline: true,
					minProperties: 5,
				},
				ExportDeclaration: {
					multiline: true,
					minProperties: 5,
				},
			},
		],
		// 'object-property-newline': [1, { 'minItems': 5 }],  // Running `npx eslint src/pages/**` causing `Configuration for rule "object-property-newline" is invalid` error
		indent: [1, 'tab', { SwitchCase: 1 }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn'],
	},
};
