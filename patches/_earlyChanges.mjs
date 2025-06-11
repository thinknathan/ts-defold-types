// @ts-check

/** Initial generic changes @satisfies {(string | RegExp)[][]} */
export const earlyChanges = [
	[
		'/// <reference types="@typescript-to-lua/language-extensions" />',
		`/// <reference types="@typescript-to-lua/language-extensions" />
		/// <reference types="./deprecated.d.ts" />
		/// <reference types="./socket.d.ts" />`,
	],
];
