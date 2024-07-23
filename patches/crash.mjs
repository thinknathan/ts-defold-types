// @ts-check

/** crash namespace @satisfies {(string | RegExp)[][]} */
export const crash = [
	// (greedy)
	[
		/let (SYSFIELD_.+): any/g,
		'const $1: number & { readonly __brand: "crash.SYSFIELD" }',
	],
	// (greedy)
	[
		/let (USERFIELD_.+): any/g,
		'const $1: number & { readonly __brand: "crash.USERFIELD" }',
	],
	[
		'get_sys_field(handle: number, index: number): LuaMultiReturn<[string, any]>',
		'get_sys_field(handle: number, index: number): undefined | string',
	],
	[
		'function load_previous(): LuaMultiReturn<[number, any]>',
		'function load_previous(): undefined | number',
	],
	[
		'function get_modules(handle: number): any',
		'function get_modules(handle: number): { name: unknown; address: unknown }[]',
	],
];
