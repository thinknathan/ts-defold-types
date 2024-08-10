// @ts-check

/** crash namespace @satisfies {(string | RegExp)[][]} */
export const crash = [
	// Create Constant type
	[
		'',
		'type SysFieldConstant = number & { readonly __brand: "crash.SYSFIELD" };',
	],
	// Create Constant type
	[
		'',
		'type UserFieldConstant = number & { readonly __brand: "crash.USERFIELD" };',
	],
	// (greedy)
	[/let (SYSFIELD_.+): any/g, 'const $1: SysFieldConstant'],
	// (greedy)
	[/let (USERFIELD_.+): any/g, 'const $1: UserFieldConstant'],
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
