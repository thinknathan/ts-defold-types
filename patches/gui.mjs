/** gui namespace */
export const gui = [
	['let material: any', 'let material: hash'],
	['let fonts: any', 'let fonts: hash'],
	// (greedy)
	[
		/let (EASING_.+): any/g,
		'const $1: number & { readonly _EASING_: unique symbol }',
	],
	// (greedy)
	[
		/let (PLAYBACK_.+): any/g,
		'const $1: number & { readonly _PLAYBACK_: unique symbol }',
	],
	// (greedy)
	[
		/let (ADJUST_.+): any/g,
		'const $1: number & { readonly _ADJUST_: unique symbol }',
	],
	// (greedy)
	[
		/let (ANCHOR_.+): any/g,
		'const $1: number & { readonly _ANCHOR_: unique symbol }',
	],
	// (greedy)
	[
		/let (BLEND_.+): any/g,
		'const $1: number & { readonly _BLEND_: unique symbol }',
	],
	// (greedy)
	[
		/let (CLIPPING_MODE_.+): any/g,
		'const $1: number & { readonly _CLIPPING_MODE_: unique symbol }',
	],
	// (greedy)
	[
		/let (KEYBOARD_TYPE_.+): any/g,
		'const $1: number & { readonly _KEYBOARD_TYPE_: unique symbol }',
	],
	// (greedy)
	[
		/let (PIEBOUNDS_.+): any/g,
		'const $1: number & { readonly _PIEBOUNDS_: unique symbol }',
	],
	// (greedy)
	[
		/let (PIVOT_.+): any/g,
		'const $1: number & { readonly _PIVOT_: unique symbol }',
	],
	// (greedy)
	[
		/let (PROP_.+): any/g,
		'const $1: string & { readonly _PROP_: unique symbol }',
	],
	// (greedy)
	[
		/let (RESULT_.+): any/g,
		'const $1: number & { readonly _RESULT_: unique symbol }',
	],
	// (greedy)
	[
		/let (SIZE_MODE_.+): any/g,
		'const $1: number & { readonly _SIZE_MODE_: unique symbol }',
	],
	// function animate
	[
		'property: any',
		'property: string | typeof gui.PROP_POSITION | typeof gui.PROP_ROTATION | typeof gui.PROP_SCALE | typeof gui.PROP_COLOR | typeof gui.PROP_OUTLINE | typeof gui.PROP_SHADOW | typeof gui.PROP_SIZE | typeof gui.PROP_FILL_ANGLE | typeof gui.PROP_INNER_RADIUS | typeof gui.PROP_SLICE9',
	],
	[
		'easing: any',
		'easing: number|vmath.vector3|vmath.vector4|vmath.quaternion|typeof gui.EASING_INBACK|typeof gui.EASING_INBOUNCE|typeof gui.EASING_INCIRC|typeof gui.EASING_INCUBIC|typeof gui.EASING_INELASTIC|typeof gui.EASING_INEXPO|typeof gui.EASING_INOUTBACK|typeof gui.EASING_INOUTBOUNCE|typeof gui.EASING_INOUTCIRC|typeof gui.EASING_INOUTCUBIC|typeof gui.EASING_INOUTELASTIC|typeof gui.EASING_INOUTEXPO|typeof gui.EASING_INOUTQUAD|typeof gui.EASING_INOUTQUART|typeof gui.EASING_INOUTQUINT|typeof gui.EASING_INOUTSINE|typeof gui.EASING_INQUAD|typeof gui.EASING_INQUART|typeof gui.EASING_INQUINT|typeof gui.EASING_INSINE|typeof gui.EASING_LINEAR|typeof gui.EASING_OUTBACK|typeof gui.EASING_OUTBOUNCE|typeof gui.EASING_OUTCIRC|typeof gui.EASING_OUTCUBIC|typeof gui.EASING_OUTELASTIC|typeof gui.EASING_OUTEXPO|typeof gui.EASING_OUTINBACK|typeof gui.EASING_OUTINBOUNCE|typeof gui.EASING_OUTINCIRC|typeof gui.EASING_OUTINCUBIC|typeof gui.EASING_OUTINELASTIC|typeof gui.EASING_OUTINEXPO|typeof gui.EASING_OUTINQUAD|typeof gui.EASING_OUTINQUART|typeof gui.EASING_OUTINQUINT|typeof gui.EASING_OUTINSINE|typeof gui.EASING_OUTQUAD|typeof gui.EASING_OUTQUART|typeof gui.EASING_OUTQUINT|typeof gui.EASING_OUTSINE',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: any, node: node) => void',
	],
	[
		'playback?: any',
		'playback?: typeof gui.PLAYBACK_ONCE_FORWARD | typeof gui.PLAYBACK_ONCE_BACKWARD | typeof gui.PLAYBACK_ONCE_PINGPONG | typeof gui.PLAYBACK_LOOP_FORWARD | typeof gui.PLAYBACK_LOOP_BACKWARD | typeof gui.PLAYBACK_LOOP_PINGPONG',
	],
	[
		'function get_adjust_mode(node: node): any',
		'function get_adjust_mode(node: node): typeof gui.ADJUST_FIT | typeof gui.ADJUST_ZOOM | typeof gui.ADJUST_STRETCH',
	],
	[
		'function get_blend_mode(node: node): any',
		'function get_blend_mode(node: node): typeof gui.BLEND_ALPHA | typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_MULT | typeof gui.BLEND_SCREEN ',
	],
	[
		'function get_clipping_mode(node: node): any',
		'function get_clipping_mode(node: node): typeof gui.CLIPPING_MODE_NONE | typeof gui.CLIPPING_MODE_STENCIL',
	],
	[
		'function get_outer_bounds(node: node): any',
		'function get_outer_bounds(node: node): typeof gui.PIEBOUNDS_RECTANGLE | typeof gui.PIEBOUNDS_ELLIPSE',
	],
	[
		'function get_pivot(node: node): any',
		'function get_pivot(node: node): typeof gui.PIVOT_CENTER | typeof gui.PIVOT_N | typeof gui.PIVOT_NE | typeof gui.PIVOT_E | typeof gui.PIVOT_SE | typeof gui.PIVOT_S | typeof gui.PIVOT_SW | typeof gui.PIVOT_W | typeof gui.PIVOT_NW',
	],
	[
		'function get_size_mode(node: node): any',
		'function get_size_mode(node: node): typeof gui.SIZE_MODE_MANUAL | typeof gui.SIZE_MODE_AUTO',
	],
	[
		'function get_xanchor(node: node): any',
		'function get_xanchor(node: node): typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT',
	],
	[
		'function get_yanchor(node: node): any',
		'function get_yanchor(node: node): typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT',
	],
	[
		'function set_xanchor(node: node, anchor: any)',
		'function set_xanchor(node: node, anchor: typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT)',
	],
	[
		'function set_yanchor(node: node, anchor: any)',
		'function set_yanchor(node: node, anchor: typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT)',
	],
	[
		'function show_keyboard(type: any',
		'function show_keyboard(type: typeof gui.KEYBOARD_TYPE_DEFAULT | typeof gui.KEYBOARD_TYPE_EMAIL | typeof gui.KEYBOARD_TYPE_NUMBER_PAD | typeof gui.KEYBOARD_TYPE_PASSWORD',
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
		'function set_adjust_mode(node: node, adjust_mode: typeof gui.ADJUST_FIT | typeof gui.ADJUST_ZOOM | typeof gui.ADJUST_STRETCH)',
	],
	[
		'function set_blend_mode(node: node, blend_mode: any)',
		'function set_blend_mode(node: node, blend_mode: typeof gui.BLEND_ALPHA | typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_MULT | typeof gui.BLEND_SCREEN)',
	],
	[
		'function set_clipping_mode(node: node, clipping_mode: any)',
		'function set_clipping_mode(node: node, clipping_mode: typeof gui.CLIPPING_MODE_NONE | typeof gui.CLIPPING_MODE_STENCIL)',
	],
	[
		'function set_outer_bounds(node: node, bounds_mode: any)',
		'function set_outer_bounds(node: node, bounds_mode: typeof gui.PIEBOUNDS_RECTANGLE | typeof gui.PIEBOUNDS_ELLIPSE)',
	],
	[
		'function set_pivot(node: node, pivot: any)',
		'function set_pivot(node: node, pivot: typeof gui.PIVOT_CENTER | typeof gui.PIVOT_N | typeof gui.PIVOT_NE | typeof gui.PIVOT_E | typeof gui.PIVOT_SE | typeof gui.PIVOT_S | typeof gui.PIVOT_SW | typeof gui.PIVOT_W | typeof gui.PIVOT_NW)',
	],
	[
		'function set_size_mode(node: node, size_mode: any)',
		'function set_size_mode(node: node, size_mode: typeof gui.SIZE_MODE_MANUAL | typeof gui.SIZE_MODE_AUTO)',
	],
	// function play_particlefx
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: any, node: node | undefined, emitter: hash, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
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
		'function new_texture(texture_id: string | hash, width: number, height: number, type: "rgb" | "rgba" | "l", buffer: string, flip: boolean): LuaMultiReturn<[boolean, undefined | typeof gui.RESULT_TEXTURE_ALREADY_EXISTS | typeof gui.RESULT_DATA_ERROR | typeof gui.RESULT_OUT_OF_RESOURCES]>',
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
];
