// @ts-check

/** go namespace @satisfies {(string | RegExp)[][]} */
export const go = [
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	['let scale: any', 'let scale: number'],
	// Don't see a reason for this definition to be public
	['export function fixed_update', '// export function fixed_update'],
	// Create Constant type
	['', 'type EasingConstant = number & { readonly __brand: "go.EASING" };'],
	// Create Constant type
	[
		'',
		'export type PlaybackConstant = number & { readonly __brand: "go.PLAYBACK" };',
	],
	// (greedy)
	[/let (EASING_.+): any/g, 'const $1: EasingConstant'],
	// (greedy)
	[/let (PLAYBACK_.+): any/g, 'const $1: PlaybackConstant'],
	[
		'function delete$(id?: any, recursive?: boolean)',
		'function delete$(id?: string | hash | url | Array<string | hash | url>, recursive?: boolean)',
	],
	// function animate
	['playback: any,', 'playback: PlaybackConstant,'],
	['easing: any', 'easing: vmath.vector3|EasingConstant'],
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
