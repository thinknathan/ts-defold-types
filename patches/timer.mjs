// @ts-check

/** timer namespace */
export const timer = [
	[
		'let INVALID_TIMER_HANDLE: any',
		'const INVALID_TIMER_HANDLE: number & { readonly _INVALID_TIMER_: unique symbol }',
	],
	// function delay
	[
		'function delay(delay: number, repeat: boolean, callback: any): hash',
		'function delay(delay: number, repeat: boolean, callback: (this: any, handle: number, time_elapsed: number) => void): hash | typeof timer.INVALID_TIMER_HANDLE',
	],
	[
		'function get_info(handle: hash): LuaMultiReturn<[any, any]>',
		'function get_info(handle: hash): undefined | { time_remaining: number, delay: number, repeating: boolean }',
	],
];
