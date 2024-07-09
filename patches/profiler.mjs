// @ts-check

/** profiler namespace */
export const profiler = [
	// (greedy)
	[
		/let (MODE_.+): any/g,
		'const $1: number & { readonly _MODE_: unique symbol }',
	],
	// (greedy)
	[
		/let (VIEW_MODE_.+): any/g,
		'const $1: number & { readonly _VIEW_MODE_: unique symbol }',
	],
	[
		'function set_ui_mode(mode: any',
		'function set_ui_mode(mode: typeof profiler.MODE_RUN | typeof profiler.MODE_PAUSE | typeof profiler.MODE_SHOW_PEAK_FRAME | typeof profiler.MODE_RECORD',
	],
	[
		'function set_ui_view_mode(mode: any',
		'function set_ui_view_mode(mode: typeof profiler.VIEW_MODE_FULL | typeof profiler.VIEW_MODE_MINIMIZED',
	],
	[
		'function view_recorded_frame(frame_index: any)',
		'function view_recorded_frame(frame_index: { distance?: number, frame?: number })',
	],
];
