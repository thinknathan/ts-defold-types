// @ts-check

/** Initial generic changes @satisfies {(string | RegExp)[][]} */
export const earlyChanges = [
	[
		'/// <reference types="lua-types/special/jit-only" />',
		`/// <reference types="lua-types/special/jit-only" />
		/// <reference types="./deprecated.d.ts" />`,
	],
];
