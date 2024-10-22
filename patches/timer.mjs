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
	[
		'function delay(delay: number, repeating: boolean, callback: any): any',
		'function delay(delay: number, repeating: boolean, callback: (this: any, handle: HandleConstant, time_elapsed: number) => void): HandleConstant',
	],
	[
		'function get_info(handle: any): LuaMultiReturn<[any, any]>',
		'function get_info(handle: HandleConstant): undefined | { time_remaining: number, delay: number, repeating: boolean }',
	],
	['function cancel(handle: any)', 'function cancel(handle: HandleConstant)'],
	['function trigger(handle: any)', 'function trigger(handle: HandleConstant)'],
];
