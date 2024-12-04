// @ts-check

/** gui namespace @satisfies {(string | RegExp)[][]} */
export const gui = [
	['let material: any', 'let material: hash'],
	['let fonts: any', 'let fonts: hash'],
	// Create Constant type
	['', 'type EasingConstant = number & { readonly __brand: "gui.EASING" };'],
	// Create Constant type
	[
		'',
		'type PlaybackConstant = number & { readonly __brand: "gui.PLAYBACK" };',
	],
	// Create Constant type
	['', 'type AdjustConstant = number & { readonly __brand: "gui.ADJUST" };'],
	// Create Constant type
	['', 'type AnchorConstant = number & { readonly __brand: "gui.ANCHOR" };'],
	// Create Constant type
	['', 'type BlendConstant = number & { readonly __brand: "gui.BLEND" };'],
	// Create Constant type
	[
		'',
		'type ClippingModeConstant = number & { readonly __brand: "gui.CLIPPING_MODE" };',
	],
	// Create Constant type
	[
		'',
		'type KeyboardTypeConstant = number & { readonly __brand: "gui.KEYBOARD_TYPE" };',
	],
	// Create Constant type
	[
		'',
		'type PieBoundsConstant = number & { readonly __brand: "gui.PIEBOUNDS" };',
	],
	// Create Constant type
	['', 'type PivotConstant = number & { readonly __brand: "gui.PIVOT" };'],
	// Create Constant type
	['', 'type PropConstant = string & { readonly __brand: "gui.PROP" };'],
	// Create Constant type
	['', 'type ResultConstant = number & { readonly __brand: "gui.RESULT" };'],
	// Create Constant type
	[
		'',
		'type SizeModeConstant = number & { readonly __brand: "gui.SIZE_MODE" };',
	],
	// Create Constant type
	['', 'type TypeConstant = number & { readonly __brand: "gui.TYPE" };'],
	// (greedy)
	[/let (EASING_.+): any/g, 'const $1: EasingConstant'],
	// (greedy)
	[/let (PLAYBACK_.+): any/g, 'const $1: PlaybackConstant'],
	// (greedy)
	[/let (ADJUST_.+): any/g, 'const $1: AdjustConstant'],
	// (greedy)
	[/let (ANCHOR_.+): any/g, 'const $1: AnchorConstant'],
	// (greedy)
	[/let (BLEND_.+): any/g, 'const $1: BlendConstant'],
	// (greedy)
	[/let (CLIPPING_MODE_.+): any/g, 'const $1: ClippingModeConstant'],
	// (greedy)
	[/let (KEYBOARD_TYPE_.+): any/g, 'const $1: KeyboardTypeConstant'],
	// (greedy)
	[/let (PIEBOUNDS_.+): any/g, 'const $1: PieBoundsConstant'],
	// (greedy)
	[/let (PIVOT_.+): any/g, 'const $1: PivotConstant'],
	// (greedy)
	[/let (PROP_.+): any/g, 'const $1: PropConstant'],
	// (greedy)
	[/let (RESULT_.+): any/g, 'const $1: ResultConstant'],
	// (greedy)
	[/let (SIZE_MODE_.+): any/g, 'const $1: SizeModeConstant'],
	// (greedy)
	[/let (TYPE_.+): any/g, 'const $1: TypeConstant'],
	// function animate
	['property: any', 'property: string | PropConstant'],
	[
		'easing: any',
		'easing: number|vmath.vector3|vmath.vector4|vmath.quaternion|EasingConstant',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: any, node: node) => void',
	],
	['playback?: any', 'playback?: PlaybackConstant'],
	[
		'function get_adjust_mode(node: node): any',
		'function get_adjust_mode(node: node): AdjustConstant',
	],
	[
		'function get_blend_mode(node: node): any',
		'function get_blend_mode(node: node): BlendConstant',
	],
	[
		'function get_clipping_mode(node: node): any',
		'function get_clipping_mode(node: node): ClippingModeConstant',
	],
	[
		'function get_outer_bounds(node: node): any',
		'function get_outer_bounds(node: node): PieBoundsConstant',
	],
	[
		'function get_pivot(node: node): any',
		'function get_pivot(node: node): PivotConstant',
	],
	[
		'function get_size_mode(node: node): any',
		'function get_size_mode(node: node): SizeModeConstant',
	],
	[
		'function get_xanchor(node: node): any',
		'function get_xanchor(node: node): AnchorConstant',
	],
	[
		'function get_yanchor(node: node): any',
		'function get_yanchor(node: node): AnchorConstant',
	],
	[
		'function set_xanchor(node: node, anchor: any)',
		'function set_xanchor(node: node, anchor: AnchorConstant)',
	],
	[
		'function set_yanchor(node: node, anchor: any)',
		'function set_yanchor(node: node, anchor: AnchorConstant)',
	],
	[
		'function show_keyboard(type: any',
		'function show_keyboard(type: KeyboardTypeConstant',
	],
	[
		'function move_below(node: node, reference: any)',
		'function move_below(node: node, reference: node)',
	],
	[
		'function move_above(node: node, reference: any)',
		'function move_above(node: node, reference: node)',
	],
	['let materials: any', 'let materials: hash'],
	['let textures: any', 'let textures: hash'],
	[
		'function set_adjust_mode(node: node, adjust_mode: any)',
		'function set_adjust_mode(node: node, adjust_mode: AdjustConstant)',
	],
	[
		'function set_blend_mode(node: node, blend_mode: any)',
		'function set_blend_mode(node: node, blend_mode: BlendConstant)',
	],
	[
		'function set_clipping_mode(node: node, clipping_mode: any)',
		'function set_clipping_mode(node: node, clipping_mode: ClippingModeConstant)',
	],
	[
		'function set_outer_bounds(node: node, bounds_mode: any)',
		'function set_outer_bounds(node: node, bounds_mode: PieBoundsConstant)',
	],
	[
		'function set_pivot(node: node, pivot: any)',
		'function set_pivot(node: node, pivot: PivotConstant)',
	],
	[
		'function set_size_mode(node: node, size_mode: any)',
		'function set_size_mode(node: node, size_mode: SizeModeConstant)',
	],
	// function play_particlefx
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: any, node: node | undefined, emitter: hash, state: particlefx.EmitterStateConstant) => void',
	],
	// function play_flipbook
	[
		'play_properties?: any',
		'play_properties?: { offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: any, node: node) => void',
	],
	[
		'function new_texture(texture_id: string | hash, width: number, height: number, type: any, buffer: string, flip: boolean): LuaMultiReturn<[boolean, number]>',
		'function new_texture(texture_id: string | hash, width: number, height: number, type: "rgb" | "rgba" | "l", buffer: string, flip: boolean): LuaMultiReturn<[boolean, undefined | ResultConstant]>',
	],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
	[
		'function get_parent(node: node): LuaMultiReturn<[node, any]>',
		'function get_parent(node: node): node | undefined',
	],
	[
		'function stop_particlefx(node: node, options?: any)',
		'function stop_particlefx(node: node, options?: { clear: boolean })',
	],
	// function set_texture_data
	['type: any', 'type: "rgb" | "rgba" | "l"'],
	// Describe layout changed message
	[
		'export type layout_changed = "layout_changed"',
		'export type layout_changed = "layout_changed"; export type layout_changed_message = { id: hash, previous_id: hash }',
	],
	[
		'function get_type(node: node): LuaMultiReturn<[any, any, any]>',
		'function get_type(node: node): TypeConstant',
	],
];
