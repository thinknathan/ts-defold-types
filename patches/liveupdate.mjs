// @ts-check

/** liveupdate namespace @satisfies {(string | RegExp)[][]} */
export const liveupdate = [
	// Create Constant type
	[
		'',
		'type LiveUpdateConstant = any;',
		// number & { readonly __brand: "liveupdate.CONSTANT" };
	],
	// (greedy)
	[/let (LIVEUPDATE_.+): any/g, 'const $1: LiveUpdateConstant'],
];
