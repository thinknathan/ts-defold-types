// @ts-check

/** go namespace @satisfies {(string | RegExp)[][]} */
export const go = [
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	['let scale: any', 'let scale: number'],
	// Don't see a reason for this definition to be public
	['export function fixed_update', '// export function fixed_update'],
	// (greedy)
	[
		/let (EASING_.+): any/g,
		'const $1: number & { readonly __brand: "go.EASING" }',
	],
	// (greedy)
	[
		/let (PLAYBACK_.+): any/g,
		'const $1: number & { readonly __brand: "go.PLAYBACK" }',
	],
	[
		'function delete$(id?: any, recursive?: boolean)',
		'function delete$(id?: string | hash | url | Array<string | hash | url>, recursive?: boolean)',
	],
	// function animate
	[
		'playback: any,',
		'playback: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG,',
	],
	[
		'easing: any',
		'easing: vmath.vector3|typeof go.EASING_INBACK|typeof go.EASING_INBOUNCE|typeof go.EASING_INCIRC|typeof go.EASING_INCUBIC|typeof go.EASING_INELASTIC|typeof go.EASING_INEXPO|typeof go.EASING_INOUTBACK|typeof go.EASING_INOUTBOUNCE|typeof go.EASING_INOUTCIRC|typeof go.EASING_INOUTCUBIC|typeof go.EASING_INOUTELASTIC|typeof go.EASING_INOUTEXPO|typeof go.EASING_INOUTQUAD|typeof go.EASING_INOUTQUART|typeof go.EASING_INOUTQUINT|typeof go.EASING_INOUTSINE|typeof go.EASING_INQUAD|typeof go.EASING_INQUART|typeof go.EASING_INQUINT|typeof go.EASING_INSINE|typeof go.EASING_LINEAR|typeof go.EASING_OUTBACK|typeof go.EASING_OUTBOUNCE|typeof go.EASING_OUTCIRC|typeof go.EASING_OUTCUBIC|typeof go.EASING_OUTELASTIC|typeof go.EASING_OUTEXPO|typeof go.EASING_OUTINBACK|typeof go.EASING_OUTINBOUNCE|typeof go.EASING_OUTINCIRC|typeof go.EASING_OUTINCUBIC|typeof go.EASING_OUTINELASTIC|typeof go.EASING_OUTINEXPO|typeof go.EASING_OUTINQUAD|typeof go.EASING_OUTINQUART|typeof go.EASING_OUTINQUINT|typeof go.EASING_OUTINSINE|typeof go.EASING_OUTQUAD|typeof go.EASING_OUTQUART|typeof go.EASING_OUTQUINT|typeof go.EASING_OUTSINE',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: any, url: url, property: hash) => void',
	],
	[
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
	[
		'function get_parent(id?: string | hash | url): LuaMultiReturn<[hash, any]>',
		'function get_parent(id?: string | hash | url): hash | undefined',
	],
	// Describe input message
	[
		'export type acquire_input_focus = "acquire_input_focus"',
		'export type acquire_input_focus = "acquire_input_focus"; export type touch_input = { id: number, pressed: boolean, released: boolean, tap_count: number, x: number, y: number, dx: number, dy: number, acc_x?: number, acc_y?: number, acc_z?: number };export type input_message = { value?: number, pressed?: boolean, released?: boolean, repeated?: boolean, x?: number, y?: number, screen_x?: number, screen_y?: number, dx?: number, dy?: number, screen_dx?: number, screen_dy?: number, gamepad?: number, touch?: touch_input[] }',
	],
	// Describe set parent message
	[
		'export type set_parent = "set_parent"',
		'export type set_parent = "set_parent"; export type set_parent_message = { parent_id: hash, keep_world_transform?: number }',
	],
];
