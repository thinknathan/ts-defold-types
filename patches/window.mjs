// @ts-check

/** window namespace @satisfies {(string | RegExp)[][]} */
export const windowChanges = [
	// (greedy)
	[
		/let (DIMMING_.+): any/g,
		'const $1: number & { readonly __brand: "window.DIMMING" }',
	],
	// (greedy)
	[
		/let (WINDOW_EVENT_.+): any/g,
		'const $1: number & { readonly __brand: "window.WINDOW_EVENT" }',
	],
	[
		'function get_dim_mode(): any',
		'function get_dim_mode(): typeof window.DIMMING_UNKNOWN | typeof window.DIMMING_ON | typeof window.DIMMING_OFF',
	],
	[
		'function set_dim_mode(mode: any)',
		'function set_dim_mode(mode: typeof window.DIMMING_ON | typeof window.DIMMING_OFF)',
	],
	[
		'function set_listener(callback: any)',
		'function set_listener(callback: undefined | ((this: any, event: typeof window.WINDOW_EVENT_FOCUS_LOST | typeof window.WINDOW_EVENT_FOCUS_GAINED | typeof window.WINDOW_EVENT_RESIZED | typeof window.WINDOW_EVENT_ICONFIED | typeof window.WINDOW_EVENT_DEICONIFIED, data: { width: number | undefined, height: number | undefined	}) => void))',
	],
];
