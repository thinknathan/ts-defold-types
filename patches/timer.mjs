// @ts-check

/** timer namespace @satisfies {(string | RegExp)[][]} */
export const timer = [
	// Create Constant type
	[
		'',
		'export type HandleConstant = number & { readonly __brand: "timer.HANDLE" };',
	],
	[
		'let INVALID_TIMER_HANDLE: any',
		'const INVALID_TIMER_HANDLE: HandleConstant',
	],
	// function delay
	[
		'function delay(delay: number, repeat: boolean, callback: any): hash',
		'function delay(delay: number, repeat: boolean, callback: (this: any, handle: number, time_elapsed: number) => void): hash | HandleConstant',
	],
	[
		'function get_info(handle: hash): LuaMultiReturn<[any, any]>',
		'function get_info(handle: hash): undefined | { time_remaining: number, delay: number, repeating: boolean }',
	],
];
