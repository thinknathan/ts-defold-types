/**
 * Automatically make opinionated changes to the output of `type-gen`.
 * Uses arrays of data pairs ['findThis', 'replaceWithThis']
 * Ultimately uses `String.replace`, which accepts either strings or regex.
 */

const fs = require('fs');
const filePath = 'index.d.ts';

const genericTable = 'LuaTable | LuaSet | LuaMap | object | AnyNotNil[]';

/** Initial generic changes */
const earlyChanges = [
	// Describe `url`
	[
		'declare type url = {\n}',
		`/**
	* A reference to game resources, such as game objects, components, and assets.
	*/
	declare type url = {
		socket: hash;
		path: hash;
		fragment: hash | undefined;
	};`,
	],
	// Describe `hash`
	[
		'declare type hash = {\n}',
		`/**
	* A unique identifier used to reference resources, messages, properties, and other entities within the game.
	*/
	declare type hash = Readonly<LuaUserdata &
	{
		readonly __hash__: unique symbol;
	}>;`,
	],
	// Describe `node`
	[
		'declare type node = {\n}',
		`declare type node = Readonly<LuaUserdata &
	{
		readonly __node__: unique symbol;
	}>;`,
	],
	// Describe `buffer`
	[
		'declare type buffer = {\n}',
		`/**
	* A block of memory that can store binary data.
	*/
	declare type buffer = Readonly<LuaUserdata &
	{
		readonly __buffer__: unique symbol;
	}>;`,
	],
	// Pretty print
	['function pprint(v: any)', 'function pprint(...args: unknown[])'],
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
];

/** socket namespace */
const socket = [
	['let _SETSIZE: any', 'const _SETSIZE: number'],
	['let _VERSION: any', 'const _VERSION: string'],
	[
		'newtry(finalizer: any): any',
		'newtry(finalizer: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown',
	],
	[
		'protect(func: any): any',
		'protect(func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown',
	],
];

/** crash namespace */
const crash = [
	// (greedy)
	[
		/let (SYSFIELD_.+): any/g,
		'const $1: number & { readonly _SYSFIELD_: unique symbol }',
	],
	// (greedy)
	[
		/let (USERFIELD_.+): any/g,
		'const $1: number & { readonly _USERFIELD_: unique symbol }',
	],
	[
		'get_sys_field(handle: number, index: number): LuaMultiReturn<[string, any]>',
		'get_sys_field(handle: number, index: number): undefined | string',
	],
	[
		'function load_previous(): LuaMultiReturn<[number, any]>',
		'function load_previous(): undefined | number',
	],
];

/** go namespace */
const go = [
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	['let scale: any', 'let scale: number'],
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
		'complete_function?: (this: unknown, url: unknown, property: unknown) => void',
	],
	[
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	// function get
	['options?: any', `options?: ${genericTable}`],
	// function set
	['options?: any', `options?: ${genericTable}`],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
	// TO-DO: confirm this type
	[
		'function get_parent(id?: string | hash | url): LuaMultiReturn<[hash, any]>',
		'function get_parent(id?: string | hash | url): hash | undefined',
	],
];

/** gui namespace */
const gui = [
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
		'property: typeof gui.PROP_POSITION | typeof gui.PROP_ROTATION | typeof gui.PROP_SCALE | typeof gui.PROP_COLOR | typeof gui.PROP_OUTLINE | typeof gui.PROP_SHADOW | typeof gui.PROP_SIZE | typeof gui.PROP_FILL_ANGLE | typeof gui.PROP_INNER_RADIUS | typeof gui.PROP_SLICE9',
	],
	[
		'easing: any',
		'easing: vmath.vector3|typeof gui.EASING_INBACK|typeof gui.EASING_INBOUNCE|typeof gui.EASING_INCIRC|typeof gui.EASING_INCUBIC|typeof gui.EASING_INELASTIC|typeof gui.EASING_INEXPO|typeof gui.EASING_INOUTBACK|typeof gui.EASING_INOUTBOUNCE|typeof gui.EASING_INOUTCIRC|typeof gui.EASING_INOUTCUBIC|typeof gui.EASING_INOUTELASTIC|typeof gui.EASING_INOUTEXPO|typeof gui.EASING_INOUTQUAD|typeof gui.EASING_INOUTQUART|typeof gui.EASING_INOUTQUINT|typeof gui.EASING_INOUTSINE|typeof gui.EASING_INQUAD|typeof gui.EASING_INQUART|typeof gui.EASING_INQUINT|typeof gui.EASING_INSINE|typeof gui.EASING_LINEAR|typeof gui.EASING_OUTBACK|typeof gui.EASING_OUTBOUNCE|typeof gui.EASING_OUTCIRC|typeof gui.EASING_OUTCUBIC|typeof gui.EASING_OUTELASTIC|typeof gui.EASING_OUTEXPO|typeof gui.EASING_OUTINBACK|typeof gui.EASING_OUTINBOUNCE|typeof gui.EASING_OUTINCIRC|typeof gui.EASING_OUTINCUBIC|typeof gui.EASING_OUTINELASTIC|typeof gui.EASING_OUTINEXPO|typeof gui.EASING_OUTINQUAD|typeof gui.EASING_OUTINQUART|typeof gui.EASING_OUTINQUINT|typeof gui.EASING_OUTINSINE|typeof gui.EASING_OUTQUAD|typeof gui.EASING_OUTQUART|typeof gui.EASING_OUTQUINT|typeof gui.EASING_OUTSINE',
	],
	[
		'complete_function?: any',
		'complete_function?: (...args: unknown[]) => void',
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
		'function get_blend_mode(node: node): typeof gui.BLEND_ALPHA | typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_MULT ',
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
		'function set_blend_mode(node: node, blend_mode: typeof gui.BLEND_ALPHA | typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_MULT)',
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
		'emitter_state_function?: (this: unknown, node: node | undefined, emitter: unknown, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
	// function play_flipbook
	[
		'play_properties?: any',
		'play_properties?: { offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, node: unknown) => void',
	],
	// function new_texture
	['type: any,', 'type: "rgb" | "rgba" | "l",'],
	// function set_texture_data
	['type: any,', 'type: "rgb" | "rgba" | "l",'],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
	// TO-DO: confirm this type
	[
		'function get_parent(node: node): LuaMultiReturn<[node, any]>',
		'function get_parent(node: node): node | undefined',
	],
];

/** physics namespace */
const physics = [
	['let angular_damping: any', 'let angular_damping: number'],
	['let angular_velocity: any', 'let angular_velocity: vmath.vector3'],
	['let linear_damping: any', 'let linear_damping: number'],
	['let linear_velocity: any', 'let linear_velocity: vmath.vector3'],
	['let mass: any', 'const mass: number'],
	// (greedy)
	[
		/let (JOINT_TYPE.+): any/g,
		'const $1: number & { readonly _JOINT_TYPE_: unique symbol }',
	],
];

/** profiler namespace */
const profiler = [
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
];

/** render namespace */
const render = [
	// (greedy)
	[
		/let (BLEND_.+): any/g,
		'const $1: number & { readonly _BLEND_: unique symbol }',
	],
	// (greedy)
	[
		/let (BUFFER_.+): any/g,
		'const $1: number & { readonly _BUFFER_: unique symbol }',
	],
	// (greedy)
	[
		/let (COMPARE_FUNC_.+): any/g,
		'const $1: number & { readonly _COMPARE_FUNC_: unique symbol }',
	],
	// (greedy)
	[
		/let (FACE_.+): any/g,
		'const $1: number & { readonly _FACE_: unique symbol }',
	],
	// (greedy)
	[
		/let (FILTER_.+): any/g,
		'const $1: number & { readonly _FILTER_: unique symbol }',
	],
	[
		'let FORMAT_R16F: any',
		'const FORMAT_R16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_R32F: any',
		'const FORMAT_R32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RG16F: any',
		'const FORMAT_RG16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RG32F: any',
		'const FORMAT_RG32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGB16F: any',
		'const FORMAT_RGB16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGB32F: any',
		'const FORMAT_RGB32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGBA16F: any',
		'const FORMAT_RGBA16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGBA32F: any',
		'const FORMAT_RGBA32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	// (greedy)
	[
		/let (FORMAT_.+): any/g,
		'const $1: number & { readonly _FORMAT_: unique symbol }',
	],
	// (greedy)
	[
		/let (FRUSTUM_PLANES_.+): any/g,
		'const $1: number & { readonly _FRUSTUM_PLANES_: unique symbol }',
	],
	[
		'let RENDER_TARGET_DEFAULT: any',
		'const RENDER_TARGET_DEFAULT: number & { readonly _RENDER_TARGET_DEFAULT: unique symbol }',
	],
	// (greedy)
	[
		/let (STATE_.+): any/g,
		'const $1: number & { readonly _STATE_: unique symbol }',
	],
	// (greedy)
	[
		/let (STENCIL_.+): any/g,
		'const $1: number & { readonly _STENCIL_: unique symbol }',
	],
	// (greedy)
	[
		/let (WRAP_.+): any/g,
		'const $1: number & { readonly _WRAP_: unique symbol }',
	],
	[
		'function disable_state(state: any',
		'function disable_state(state: typeof render.STATE_DEPTH_TEST | typeof render.STATE_STENCIL_TEST | typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_POLYGON_OFFSET_FILL',
	],
	[
		'function enable_state(state: any',
		'function enable_state(state: typeof render.STATE_DEPTH_TEST | typeof render.STATE_STENCIL_TEST | typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_POLYGON_OFFSET_FILL',
	],
	[
		'function predicate(tags: any',
		'function predicate(tags: Array<string|hash> | LuaSet<string|hash>',
	],
	[
		'function set_cull_face(face_type: any',
		'function set_cull_face(face_type: typeof render.FACE_FRONT | typeof render.FACE_BACK | typeof render.FACE_FRONT_AND_BACK',
	],
	[
		'function set_depth_func(func: any',
		'function set_depth_func(func: typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_NOTEQUAL | typeof render.COMPARE_FUNC_ALWAYS',
	],
	// function enable_texture
	[
		'buffer_type?: any',
		'buffer_type?: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT',
	],
	// function get_render_target_height
	[
		'buffer_type: any',
		'buffer_type: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT',
	],
	// function get_render_target_width
	[
		'buffer_type: any',
		'buffer_type: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT',
	],
	// function set_stencil_func
	[
		'func: any',
		'func: typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_NOTEQUAL | typeof render.COMPARE_FUNC_ALWAYS',
	],
];

/** resource namespace */
const resource = [
	// (greedy)
	[
		/let (COMPRESSION_.+): any/g,
		'const $1: number & { readonly _COMPRESSION_: unique symbol }',
	],
	// (greedy)
	[
		/let (TEXTURE_.+): any/g,
		'const $1: number & { readonly _TEXTURE_: unique symbol }',
	],
];

/** sys namespace */
const sys = [
	// (greedy)
	[
		/let (NETWORK_.+): any/g,
		'const $1: number & { readonly _NETWORK_: unique symbol }',
	],
	[
		'function exists(path: string): any',
		'function exists(path: string): boolean',
	],
	[
		'function get_config_int(key: string, default_value?: any): any',
		'function get_config_int(key: string, default_value?: number): number',
	],
	[
		'function get_connectivity(): any',
		'function get_connectivity(): typeof sys.NETWORK_DISCONNECTED | typeof sys.NETWORK_CONNECTED_CELLULAR | typeof sys.NETWORK_CONNECTED',
	],
	[
		'function get_engine_info(): any',
		'function get_engine_info(): { version: string, version_sha1: string, is_debug: boolean }',
	],
	[
		'function load(filename: string): any',
		'function load(filename: string): LuaMap<AnyNotNil, unknown>',
	],
	[
		'function set_error_handler(error_handler: any',
		'function set_error_handler(error_handler: (source: string, message: unknown, traceback: unknown) => void',
	],
];

/** window namespace */
const windowChanges = [
	// (greedy)
	[
		/let (DIMMING_.+): any/g,
		'const $1: number & { readonly _DIMMING_: unique symbol }',
	],
	// (greedy)
	[
		/let (WINDOW_EVENT_.+): any/g,
		'const $1: number & { readonly _WINDOW_EVENT_: unique symbol }',
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
		'function set_listener(callback: (this: unknown, event: typeof window.WINDOW_EVENT_FOCUS_LOST | typeof window.WINDOW_EVENT_FOCUS_GAINED | typeof window.WINDOW_EVENT_RESIZED | typeof window.WINDOW_EVENT_ICONFIED | typeof window.WINDOW_EVENT_DEICONIFIED, data: { width: number | undefined, height: number | undefined	}) => void)',
	],
];

/** buffer namespace */
const bufferChanges = [
	// (greedy)
	[
		/let (VALUE_TYPE_.+): any/g,
		'const $1: number & { readonly _VALUE_TYPE_: unique symbol }',
	],
];

/** html5 namespace */
const html5 = [
	[
		'function set_interaction_listener(callback: any',
		'function set_interaction_listener(callback: undefined | ((this: unknown) => void)',
	],
];

/** http namespace */
const http = [
	// function request
	[
		'callback: any,',
		'callback: (this: unknown, id: unknown, response: { status: unknown, response?: unknown, headers: unknown, path?: unknown, error?: unknown }) => void,',
	],
];

/** image namespace */
const image = [
	['let TYPE_LUMINANCE: any', 'const TYPE_LUMINANCE: "l"'],
	['let TYPE_LUMINANCE_ALPHA: any', 'const TYPE_LUMINANCE_ALPHA: "la"'],
	['let TYPE_RGB: any', 'const TYPE_RGB: "rgb"'],
	['let TYPE_RGBA: any', 'const TYPE_RGBA: "rgba"'],
	// TO-DO: confirm the return type
	[
		'function load(buffer: string, premult?: boolean): LuaMultiReturn<[any, any]>',
		'function load(buffer: string, premult?: boolean): undefined | { width: number, height: number, type: typeof image.TYPE_RGB | typeof image.TYPE_RGBA | typeof image.TYPE_LUMINANCE | typeof image.TYPE_LUMINANCE_ALPHA , buffer: unknown }',
	],
];

/** json namespace */
const jsonChanges = [
	// Change invalid JSON null type
	['let null$: any', 'let null$: null'],
];

/** msg namespace */
const msg = [
	// function post
	[
		'message?: any',
		'message?: LuaMap<AnyNotNil, AnyNotNil> | { [key: string | number | symbol]: AnyNotNil }',
	],
];

/** timer namespace */
const timer = [
	[
		'let INVALID_TIMER_HANDLE: any',
		'const INVALID_TIMER_HANDLE: number & { readonly _INVALID_TIMER_: unique symbol }',
	],
	// function delay
	[
		'callback: any',
		'callback: (this: unknown, handle: unknown, time_elapsed: number) => void',
	],
];

/** vmath namespace */
const vmathChanges = [
	[
		'function vector(t: any): any',
		'function vector(t: number[]): vmath.vector3 | vmath.vector4',
	],
];

/** zlib namespace */
const zlib = [['', '']];

/** camera namespace */
const camera = [
	['let aspect_ratio: any', 'let aspect_ratio: number'],
	['let far_z: any', 'let far_z: number'],
	['let fov: any', 'let fov: number'],
	['let near_z: any', 'let near_z: number'],
	['let orthographic_zoom: any', 'let orthographic_zoom: number'],
	['let projection: any', 'const projection: Readonly<vmath.matrix4>'],
	['let view: any', 'const view: Readonly<vmath.matrix4>'],
];

/** collectionFactory namespace */
const collectionFactory = [
	// (greedy)
	[
		/let (STATUS_.+): any/g,
		'const $1: number & { readonly _STATUS_: unique symbol }',
	],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof collectionfactory.STATUS_UNLOADED | typeof collectionfactory.STATUS_LOADING | typeof collectionfactory.STATUS_LOADED',
	],
	// function load
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, url: unknown, result: boolean) => void',
	],
];

/** collectionproxy namespace */
const collectionProxy = [['', '']];

/** factory namespace */
const factory = [
	// (greedy)
	[
		/let (STATUS_.+): any/g,
		'const $1: number & { readonly _STATUS_: unique symbol }',
	],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof factory.STATUS_UNLOADED | typeof factory.STATUS_LOADING | typeof factory.STATUS_LOADED',
	],
	// function load
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, url: unknown, result: boolean) => void',
	],
];

/** label namespace */
const label = [
	['let material: any', 'let material: hash'],
	['let color: any', 'let color: vmath.vector4'],
	['let font: any', 'let font: hash'],
	['let leading: any', 'let leading: number'],
	['let line_break: any', 'let line_break: boolean'],
	['let outline: any', 'let outline: vmath.vector4'],
	['let scale: any', 'let scale: number | vmath.vector3'],
	['let shadow: any', 'let shadow: vmath.vector4'],
	['let tracking: any', 'let tracking: number'],
	['let size: any', 'let size: vmath.vector3'],
];

/** model namespace */
const model = [
	['let material: any', 'let material: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let animation: any', 'let animation: hash'],
	['let cursor: any', 'let cursor: number'],
	// function play_anim
	[
		'play_properties?: any',
		'play_properties?: { blend_duration?: number, offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, message_id: unknown, message: { animation_id: unknown, playback: unknown }, sender: unknown) => void',
	],
];

/** particlefx namespace */
const particleFx = [
	// (greedy)
	[
		/let (EMITTER_STATE_.+): any/g,
		'const $1: number & { readonly _EMITTER_STATE_: unique symbol }',
	],
	// function play
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: unknown, id: unknown, emitter: unknown, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
];

/** sound namespace */
const sound = [
	['let sound: any', 'let sound: hash'],
	['let gain: any', 'let gain: number'],
	['let pan: any', 'let pan: number'],
	['let speed: any', 'let speed: number'],
	// function play
	[
		'play_properties?: any',
		'play_properties?: { delay?: number, gain?: number, pan?: number, speed?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, message_id: unknown, message: { play_id: unknown }, sender: unknown) => void',
	],
];

/** sprite namespace */
const sprite = [
	['let material: any', 'let material: hash'],
	['let frame_count: any', 'const frame_count: number'],
	['let image: any', 'let image: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let scale: any', 'let scale: vmath.vector3'],
	['let size: any', 'let size: vmath.vector3'],
	['let animation: any', 'let animation: hash'],
	['let cursor: any', 'let cursor: number'],
	// function play_flipbook
	[
		'play_properties?: any',
		'play_properties?: { offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, message_id: unknown, message: { current_tile: unknown, id: unknown }, sender: unknown) => void',
	],
];

/** tilemap namespace */
const tilemap = [
	['let material: any', 'let material: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	[
		'let H_FLIP: any',
		'const H_FLIP: number & { readonly __FLIP_: unique symbol }',
	],
	// (greedy)
	[
		/let (ROTATE_.+): any/g,
		'const $1: number & { readonly _ROTATE_: unique symbol }',
	],
	[
		'let V_FLIP: any',
		'const V_FLIP: number & { readonly __FLIP_: unique symbol }',
	],
];

/** Late changes that don't fit anywhere else */
const finalChanges = [
	// Generic tables as slightly stricter type (greedy)
	[/(table|tbl): any/g, `$1: ${genericTable}`],
	// Replace `any` keyword with `unknown` (greedy)
	[/\: any/g, ': unknown'],
	[/\[any/g, '[unknown'],
	[/any,/g, 'unknown,'],
	[/any\]/g, 'unknown]'],
	// Change uppercase variables to const (greedy)
	[/let (?:\b|\W)([A-Z0-9_]+)(?:\b|\W)/g, 'const $1'],
];

const patches = [
	// The following are in order of appearance in the final definitions file
	{
		regex: /(declare namespace socket {)([\s\S]*?)(declare namespace crash {)/s,
		replacements: socket,
	},
	{
		regex: /(declare namespace crash {)([\s\S]*?)(declare namespace go {)/s,
		replacements: crash,
	},
	{
		regex: /(declare namespace go {)([\s\S]*?)(declare namespace gui {)/s,
		replacements: go,
	},
	{
		regex: /(declare namespace gui {)([\s\S]*?)(declare namespace physics {)/s,
		replacements: gui,
	},
	{
		regex:
			/(declare namespace physics {)([\s\S]*?)(declare namespace profiler {)/s,
		replacements: physics,
	},
	{
		regex:
			/(declare namespace profiler {)([\s\S]*?)(declare namespace render {)/s,
		replacements: profiler,
	},
	{
		regex:
			/(declare namespace render {)([\s\S]*?)(declare namespace resource {)/s,
		replacements: render,
	},
	{
		regex: /(declare namespace resource {)([\s\S]*?)(declare namespace sys {)/s,
		replacements: resource,
	},
	{
		regex: /(declare namespace sys {)([\s\S]*?)(declare namespace window {)/s,
		replacements: sys,
	},
	{
		regex:
			/(declare namespace window {)([\s\S]*?)(declare namespace buffer {)/s,
		replacements: windowChanges,
	},
	{
		regex: /(declare namespace buffer {)([\s\S]*?)(declare namespace html5 {)/s,
		replacements: bufferChanges,
	},
	{
		regex: /(declare namespace html5 {)([\s\S]*?)(declare namespace http {)/s,
		replacements: html5,
	},
	{
		regex: /(declare namespace http {)([\s\S]*?)(declare namespace image {)/s,
		replacements: http,
	},
	{
		regex: /(declare namespace image {)([\s\S]*?)(declare namespace json {)/s,
		replacements: image,
	},
	{
		regex: /(declare namespace json {)([\s\S]*?)(declare namespace msg {)/s,
		replacements: jsonChanges,
	},
	{
		regex: /(declare namespace msg {)([\s\S]*?)(declare namespace timer {)/s,
		replacements: msg,
	},
	{
		regex: /(declare namespace timer {)([\s\S]*?)(declare namespace vmath {)/s,
		replacements: timer,
	},
	{
		regex: /(declare namespace vmath {)([\s\S]*?)(declare namespace zlib {)/s,
		replacements: vmathChanges,
	},
	{
		regex: /(declare namespace zlib {)([\s\S]*?)(declare namespace camera {)/s,
		replacements: zlib,
	},
	{
		regex:
			/(declare namespace camera {)([\s\S]*?)(declare namespace collectionfactory {)/s,
		replacements: camera,
	},
	{
		regex:
			/(declare namespace collectionfactory {)([\s\S]*?)(declare namespace collectionproxy {)/s,
		replacements: collectionFactory,
	},
	{
		regex:
			/(declare namespace collectionproxy {)([\s\S]*?)(declare namespace factory {)/s,
		replacements: collectionProxy,
	},
	{
		regex:
			/(declare namespace factory {)([\s\S]*?)(declare namespace label {)/s,
		replacements: factory,
	},
	{
		regex: /(declare namespace label {)([\s\S]*?)(declare namespace model {)/s,
		replacements: label,
	},
	{
		regex:
			/(declare namespace model {)([\s\S]*?)(declare namespace particlefx {)/s,
		replacements: model,
	},
	{
		regex:
			/(declare namespace particlefx {)([\s\S]*?)(declare namespace sound {)/s,
		replacements: particleFx,
	},
	{
		regex: /(declare namespace sound {)([\s\S]*?)(declare namespace sprite {)/s,
		replacements: sound,
	},
	{
		regex:
			/(declare namespace sprite {)([\s\S]*?)(declare namespace tilemap {)/s,
		replacements: sprite,
	},
	{
		regex: /(declare namespace tilemap {)([\s\S]*?)(})/s,
		replacements: tilemap,
	},
];

/**
 * Load the contents of the file
 */
fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}
	console.time('Patching definitions');

	// Make early find and replace changes
	earlyChanges.forEach((pair) => (data = data.replace(pair[0], pair[1])));

	// Loop through namespace changes
	for (const patch of patches) {
		const { regex, replacements } = patch;

		data = data.replace(regex, (match, namespace, group, namespace2) => {
			// Apply replacements using string.replace dynamically
			replacements.forEach(([search, replace]) => {
				group = group.replace(search, replace);
			});
			return `${namespace}${group}${namespace2}`;
		});
	}

	// Make final find an replace changes
	finalChanges.forEach((pair) => (data = data.replace(pair[0], pair[1])));
	console.timeEnd('Patching definitions');

	// Save the modified contents back to the file
	console.time('Saving file');
	fs.writeFile(filePath, data, 'utf8', (err) => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.timeEnd('Saving file');
	});
});
