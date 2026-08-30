import { generateEslintConfig } from '@companion-module/tools/eslint/config.mjs'

const baseConfig = await generateEslintConfig({})

export default [
	...baseConfig,
	{
		// This module is "type": "module", so .js files are ESM
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'module',
		},
	},
]
