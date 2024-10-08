// @ts-check

/** collectionproxy namespace @satisfies {(string | RegExp)[][]} */
export const collectionProxy = [
	// Create Constant type
	[
		'',
		'type ResultConstant = number & { readonly __brand: "collectionproxy.RESULT" };',
	],
	// (greedy)
	[/let (RESULT_.+): any/g, 'const $1: ResultConstant'],
	[
		'function missing_resources(collectionproxy: url): any',
		'function missing_resources(collectionproxy: url): string[]',
	],
	[
		'function get_resources(collectionproxy: url): any',
		'function get_resources(collectionproxy: url): string[]',
	],
	[
		'function set_collection(url?: string | hash | url, prototype?: any): LuaMultiReturn<[boolean, number]>',
		'function set_collection(url?: string | hash | url, prototype?: string | undefined): LuaMultiReturn<[boolean, undefined | ResultConstant]>',
	],
	// Describe message
	[
		'export type set_time_step = "set_time_step"',
		'export type set_time_step = "set_time_step"; export type set_time_step_message = { factor: number, mode: 1 | 0 }',
	],
];
