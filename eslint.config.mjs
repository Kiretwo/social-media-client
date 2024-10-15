import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default [
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.browser, // Add browser globals like `document`, `fetch`, etc.
			},
		},
	},
	pluginJs.configs.recommended,
	{
		files: ["**/*.test.js"], // Applies only to Jest test files
		plugins: {
			jest: pluginJest,
		},
		languageOptions: {
			globals: {
				...globals.jest, // Add Jest globals like `describe`, `it`, etc.
			},
		},
		rules: {
			...pluginJest.configs.recommended.rules,
		},
	},
];
