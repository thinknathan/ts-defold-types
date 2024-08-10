// @ts-check

/** window namespace @satisfies {(string | RegExp)[][]} */
export const windowChanges = [
	// Create Constant type
	[
		'',
		'export type DimmingConstant = number & { readonly __brand: "window.DIMMING" };',
	],
	// Create Constant type
	[
		'',
		'export type WindowEventConstant = number & { readonly __brand: "window.WINDOW_EVENT" };',
	],
	// (greedy)
	[/let (DIMMING_.+): any/g, 'const $1: DimmingConstant'],
	// (greedy)
	[/let (WINDOW_EVENT_.+): any/g, 'const $1: WindowEventConstant'],
	['function get_dim_mode(): any', 'function get_dim_mode(): DimmingConstant'],
	[
		'function set_dim_mode(mode: any)',
		'function set_dim_mode(mode: DimmingConstant)',
	],
	[
		'function set_listener(callback: any)',
		'function set_listener(callback: undefined | ((this: any, event: WindowEventConstant, data: { width: number | undefined, height: number | undefined	}) => void))',
	],
];
