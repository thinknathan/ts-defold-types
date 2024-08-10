// @ts-check

/** profiler namespace @satisfies {(string | RegExp)[][]} */
export const profiler = [
	// Create Constant type
	[
		'',
		'export type ModeConstant = number & { readonly __brand: "profiler.MODE" };',
	],
	// Create Constant type
	[
		'',
		'export type ViewModeConstant = number & { readonly __brand: "profiler.VIEW_MODE" };',
	],
	// (greedy)
	[/let (MODE_.+): any/g, 'const $1: ModeConstant'],
	// (greedy)
	[/let (VIEW_MODE_.+): any/g, 'const $1: ViewModeConstant'],
	['function set_ui_mode(mode: any', 'function set_ui_mode(mode: ModeConstant'],
	[
		'function set_ui_view_mode(mode: any',
		'function set_ui_view_mode(mode: ViewModeConstant',
	],
	[
		'function view_recorded_frame(frame_index: any)',
		'function view_recorded_frame(frame_index: { distance?: number, frame?: number })',
	],
];
