/**
 * Automatically make opinionated changes to the output of `type-gen`.
 * Uses arrays of data pairs ['findThis', 'replaceWithThis']
 * Ultimately uses `String.replace`, which accepts either strings or regex.
 */

const fs = require('fs');
const filePath = 'index.d.ts';

/** Defold's basic types */
const defoldBasics = [
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
];

/** Changes to smooth differences between Lua and TS */
const languageQuirks = [
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
	// Change invalid JSON null type
	['let null$: any', 'let null$: null'],
];

/** image namespace */
const image = [
	['let TYPE_LUMINANCE: any', 'let TYPE_LUMINANCE: "l"'],
	['let TYPE_LUMINANCE_ALPHA: any', 'let TYPE_LUMINANCE_ALPHA: "la"'],
	['let TYPE_RGB: any', 'let TYPE_RGB: "rgb"'],
	['let TYPE_RGBA: any', 'let TYPE_RGBA: "rgba"'],
];

/** buffer namespace */
const bufferChanges = [
	// Describe `buffer` types
	// Greedy changes apply multiple times
	[/(VALUE_TYPE_.+): any/g, '$1: number'],
];

/** go namespace */
const go = [
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	['let scale: any', 'let scale: number'],
	// Describe easing types
	// Greedy changes apply multiple times
	[/(EASING_.+): any/g, '$1: number'],
	// Describe playback types
	// Greedy changes apply multiple times
	[/(PLAYBACK_.+): any/g, '$1: number'],
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
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	// function get
	[
		'options?: any',
		'options?: LuaTable | LuaSet | LuaMap | object | unknown[]',
	],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
];

/** window namespace */
const windowChanges = [
	['let DIMMING_OFF: any', 'let DIMMING_OFF: number'],
	['let DIMMING_ON: any', 'let DIMMING_ON: number'],
	['let DIMMING_UNKNOWN: any', 'let DIMMING_UNKNOWN: number'],
	['let WINDOW_EVENT_DEICONIFIED: any', 'let WINDOW_EVENT_DEICONIFIED: number'],
	[
		'let WINDOW_EVENT_FOCUS_GAINED: any',
		'let WINDOW_EVENT_FOCUS_GAINED: number',
	],
	['let WINDOW_EVENT_FOCUS_LOST: any', 'let WINDOW_EVENT_FOCUS_LOST: number'],
	// Iconfied is sometimes spelled Iconified. Probably a typo?
	['let WINDOW_EVENT_ICONFIED: any', 'let WINDOW_EVENT_ICONFIED: number'],
	['let WINDOW_EVENT_RESIZED: any', 'let WINDOW_EVENT_RESIZED: number'],
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

/** resource namespace */
const resource = [
	[
		'let COMPRESSION_TYPE_BASIS_UASTC: any',
		'let COMPRESSION_TYPE_BASIS_UASTC: number',
	],
	['let COMPRESSION_TYPE_DEFAULT: any', 'let COMPRESSION_TYPE_DEFAULT: number'],
	['let TEXTURE_FORMAT_LUMINANCE: any', 'let TEXTURE_FORMAT_LUMINANCE: number'],
	['let TEXTURE_FORMAT_R16F: any', 'let TEXTURE_FORMAT_R16F: number'],
	['let TEXTURE_FORMAT_R32F: any', 'let TEXTURE_FORMAT_R32F: number'],
	['let TEXTURE_FORMAT_RG16F: any', 'let TEXTURE_FORMAT_RG16F: number'],
	['let TEXTURE_FORMAT_RG32F: any', 'let TEXTURE_FORMAT_RG32F: number'],
	['let TEXTURE_FORMAT_RGB: any', 'let TEXTURE_FORMAT_RGB: number'],
	['let TEXTURE_FORMAT_RGB16F: any', 'let TEXTURE_FORMAT_RGB16F: number'],
	['let TEXTURE_FORMAT_RGB32F: any', 'let TEXTURE_FORMAT_RGB32F: number'],
	['let TEXTURE_FORMAT_RGBA: any', 'let TEXTURE_FORMAT_RGBA: number'],
	['let TEXTURE_FORMAT_RGBA16F: any', 'let TEXTURE_FORMAT_RGBA16F: number'],
	['let TEXTURE_FORMAT_RGBA32F: any', 'let TEXTURE_FORMAT_RGBA32F: number'],
	[
		'let TEXTURE_FORMAT_RGBA_ASTC_4x4: any',
		'const TEXTURE_FORMAT_RGBA_ASTC_4x4: number',
	],
	['let TEXTURE_FORMAT_RGBA_BC3: any', 'let TEXTURE_FORMAT_RGBA_BC3: number'],
	['let TEXTURE_FORMAT_RGBA_BC7: any', 'let TEXTURE_FORMAT_RGBA_BC7: number'],
	['let TEXTURE_FORMAT_RGBA_ETC2: any', 'let TEXTURE_FORMAT_RGBA_ETC2: number'],
	[
		'let TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: any',
		'let TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: number',
	],
	[
		'let TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: any',
		'let TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: number',
	],
	['let TEXTURE_FORMAT_RGB_BC1: any', 'let TEXTURE_FORMAT_RGB_BC1: number'],
	['let TEXTURE_FORMAT_RGB_ETC1: any', 'let TEXTURE_FORMAT_RGB_ETC1: number'],
	[
		'let TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: any',
		'let TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: number',
	],
	[
		'let TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: any',
		'let TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: number',
	],
	['let TEXTURE_FORMAT_RG_BC5: any', 'let TEXTURE_FORMAT_RG_BC5: number'],
	['let TEXTURE_FORMAT_R_BC4: any', 'let TEXTURE_FORMAT_R_BC4: number'],
	['let TEXTURE_TYPE_2D: any', 'let TEXTURE_TYPE_2D: number'],
	['let TEXTURE_TYPE_2D_ARRAY: any', 'let TEXTURE_TYPE_2D_ARRAY: number'],
	['let TEXTURE_TYPE_CUBE_MAP: any', 'let TEXTURE_TYPE_CUBE_MAP: number'],
];

/** profiler namespace */
const profiler = [
	['MODE_PAUSE: any', 'MODE_PAUSE: number'],
	['MODE_RECORD: any', 'MODE_RECORD: number'],
	['MODE_RUN: any', 'MODE_RUN: number'],
	['MODE_SHOW_PEAK_FRAME: any', 'MODE_SHOW_PEAK_FRAME: number'],
	['VIEW_MODE_FULL: any', 'VIEW_MODE_FULL: number'],
	['VIEW_MODE_MINIMIZED: any', 'VIEW_MODE_MINIMIZED: number'],
	[
		'function set_ui_mode(mode: any',
		'function set_ui_mode(mode: typeof profiler.MODE_RUN | typeof profiler.MODE_PAUSE | typeof profiler.MODE_SHOW_PEAK_FRAME | typeof profiler.MODE_RECORD',
	],
	[
		'function set_ui_view_mode(mode: any',
		'function set_ui_view_mode(mode: typeof profiler.VIEW_MODE_FULL | typeof profiler.VIEW_MODE_MINIMIZED',
	],
];

/** physics namespace */
const physics = [
	['let angular_damping: any', 'let angular_damping: number'],
	['let angular_velocity: any', 'let angular_velocity: vmath.vector3'],
	['let linear_damping: any', 'let linear_damping: number'],
	['let linear_velocity: any', 'let linear_velocity: vmath.vector3'],
	['let mass: any', 'const mass: number'],
	['JOINT_TYPE_FIXED: any', 'JOINT_TYPE_FIXED: number'],
	['JOINT_TYPE_HINGE: any', 'JOINT_TYPE_HINGE: number'],
	['JOINT_TYPE_SLIDER: any', 'JOINT_TYPE_SLIDER: number'],
	['JOINT_TYPE_SPRING: any', 'JOINT_TYPE_SPRING: number'],
	['JOINT_TYPE_WELD: any', 'JOINT_TYPE_WELD: number'],
];

/** sys namespace */
const sys = [
	['let NETWORK_CONNECTED: any', 'let NETWORK_CONNECTED: number'],
	[
		'let NETWORK_CONNECTED_CELLULAR: any',
		'let NETWORK_CONNECTED_CELLULAR: number',
	],
	['let NETWORK_DISCONNECTED: any', 'let NETWORK_DISCONNECTED: number'],
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
		'function load(filename: string): LuaMap',
	],
	[
		'function set_error_handler(error_handler: any',
		'function set_error_handler(error_handler: (...args: unknown[]) => unknown',
	],
];

/** msg namespace */
const msg = [
	['message?: any', 'message?: LuaTable | LuaSet | LuaMap | object'],
];

/** timer namespace */
const timer = [
	['let INVALID_TIMER_HANDLE: any', 'let INVALID_TIMER_HANDLE: number'],
];

/** html5 namespace */
const html5 = [
	[
		'function set_interaction_listener(callback: any',
		'function set_interaction_listener(callback: (...args: unknown[]) => unknown',
	],
];

/** tilemap namespace */
const tilemap = [
	['let tile_source: any', 'let tile_source: hash'],
	['H_FLIP: any', 'H_FLIP: number'],
	['ROTATE_180: any', 'ROTATE_180: number'],
	['ROTATE_270: any', 'ROTATE_270: number'],
	['ROTATE_90: any', 'ROTATE_90: number'],
	['V_FLIP: any', 'V_FLIP: number'],
];

/** gui namespace */
const gui = [
	['let fonts: any', 'let fonts: hash'],
	['let ADJUST_FIT: any', 'let ADJUST_FIT: number'],
	['let ADJUST_STRETCH: any', 'let ADJUST_STRETCH: number'],
	['let ADJUST_ZOOM: any', 'let ADJUST_ZOOM: number'],
	['let ANCHOR_BOTTOM: any', 'let ANCHOR_BOTTOM: number'],
	['let ANCHOR_LEFT: any', 'let ANCHOR_LEFT: number'],
	['let ANCHOR_NONE: any', 'let ANCHOR_NONE: number'],
	['let ANCHOR_RIGHT: any', 'let ANCHOR_RIGHT: number'],
	['let ANCHOR_TOP: any', 'let ANCHOR_TOP: number'],
	['let BLEND_ADD: any', 'let BLEND_ADD: number'],
	['let BLEND_ADD_ALPHA: any', 'let BLEND_ADD_ALPHA: number'],
	['let BLEND_ALPHA: any', 'let BLEND_ALPHA: number'],
	['let BLEND_MULT: any', 'let BLEND_MULT: number'],
	['let CLIPPING_MODE_NONE: any', 'let CLIPPING_MODE_NONE: number'],
	['let CLIPPING_MODE_STENCIL: any', 'let CLIPPING_MODE_STENCIL: number'],
	['let KEYBOARD_TYPE_DEFAULT: any', 'let KEYBOARD_TYPE_DEFAULT: number'],
	['let KEYBOARD_TYPE_EMAIL: any', 'let KEYBOARD_TYPE_EMAIL: number'],
	['let KEYBOARD_TYPE_NUMBER_PAD: any', 'let KEYBOARD_TYPE_NUMBER_PAD: number'],
	['let KEYBOARD_TYPE_PASSWORD: any', 'let KEYBOARD_TYPE_PASSWORD: number'],
	['let PIEBOUNDS_ELLIPSE: any', 'let PIEBOUNDS_ELLIPSE: number'],
	['let PIEBOUNDS_RECTANGLE: any', 'let PIEBOUNDS_RECTANGLE: number'],
	['let PIVOT_CENTER: any', 'let PIVOT_CENTER: number'],
	['let PIVOT_E: any', 'let PIVOT_E: number'],
	['let PIVOT_N: any', 'let PIVOT_N: number'],
	['let PIVOT_NE: any', 'let PIVOT_NE: number'],
	['let PIVOT_NW: any', 'let PIVOT_NW: number'],
	['let PIVOT_S: any', 'let PIVOT_S: number'],
	['let PIVOT_SE: any', 'let PIVOT_SE: number'],
	['let PIVOT_SW: any', 'let PIVOT_SW: number'],
	['let PIVOT_W: any', 'let PIVOT_W: number'],
	['let PROP_COLOR: any', 'let PROP_COLOR: string'],
	['let PROP_FILL_ANGLE: any', 'let PROP_FILL_ANGLE: string'],
	['let PROP_INNER_RADIUS: any', 'let PROP_INNER_RADIUS: string'],
	['let PROP_OUTLINE: any', 'let PROP_OUTLINE: string'],
	['let PROP_POSITION: any', 'let PROP_POSITION: string'],
	['let PROP_ROTATION: any', 'let PROP_ROTATION: string'],
	['let PROP_SCALE: any', 'let PROP_SCALE: string'],
	['let PROP_SHADOW: any', 'let PROP_SHADOW: string'],
	['let PROP_SIZE: any', 'let PROP_SIZE: string'],
	['let PROP_SLICE9: any', 'let PROP_SLICE9: string'],
	['let RESULT_DATA_ERROR: any', 'let RESULT_DATA_ERROR: number'],
	['let RESULT_OUT_OF_RESOURCES: any', 'let RESULT_OUT_OF_RESOURCES: number'],
	[
		'let RESULT_TEXTURE_ALREADY_EXISTS: any',
		'let RESULT_TEXTURE_ALREADY_EXISTS: number',
	],
	['let SIZE_MODE_AUTO: any', 'let SIZE_MODE_AUTO: number'],
	['let SIZE_MODE_MANUAL: any', 'let SIZE_MODE_MANUAL: number'],
	// function animate
	[
		'property: any',
		'property: typeof gui.PROP_POSITION | typeof gui.PROP_ROTATION | typeof gui.PROP_SCALE | typeof gui.PROP_COLOR | typeof gui.PROP_OUTLINE | typeof gui.PROP_SHADOW | typeof gui.PROP_SIZE | typeof gui.PROP_FILL_ANGLE | typeof gui.PROP_INNER_RADIUS | typeof gui.PROP_SLICE9',
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
	// function play_particlefx
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: unknown, node: node | undefined, emitter: unknown, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
];

/** render namespace */
const render = [
	['let BLEND_CONSTANT_ALPHA: any', 'let BLEND_CONSTANT_ALPHA: number'],
	['let BLEND_CONSTANT_COLOR: any', 'let BLEND_CONSTANT_COLOR: number'],
	['let BLEND_DST_ALPHA: any', 'let BLEND_DST_ALPHA: number'],
	['let BLEND_DST_COLOR: any', 'let BLEND_DST_COLOR: number'],
	['let BLEND_ONE: any', 'let BLEND_ONE: number'],
	[
		'let BLEND_ONE_MINUS_CONSTANT_ALPHA: any',
		'let BLEND_ONE_MINUS_CONSTANT_ALPHA: number',
	],
	[
		'let BLEND_ONE_MINUS_CONSTANT_COLOR: any',
		'let BLEND_ONE_MINUS_CONSTANT_COLOR: number',
	],
	[
		'let BLEND_ONE_MINUS_DST_ALPHA: any',
		'let BLEND_ONE_MINUS_DST_ALPHA: number',
	],
	[
		'let BLEND_ONE_MINUS_DST_COLOR: any',
		'let BLEND_ONE_MINUS_DST_COLOR: number',
	],
	[
		'let BLEND_ONE_MINUS_SRC_ALPHA: any',
		'let BLEND_ONE_MINUS_SRC_ALPHA: number',
	],
	[
		'let BLEND_ONE_MINUS_SRC_COLOR: any',
		'let BLEND_ONE_MINUS_SRC_COLOR: number',
	],
	['let BLEND_SRC_ALPHA: any', 'let BLEND_SRC_ALPHA: number'],
	['let BLEND_SRC_ALPHA_SATURATE: any', 'let BLEND_SRC_ALPHA_SATURATE: number'],
	['let BLEND_SRC_COLOR: any', 'let BLEND_SRC_COLOR: number'],
	['let BLEND_ZERO: any', 'let BLEND_ZERO: number'],
	['let BUFFER_COLOR0_BIT: any', 'let BUFFER_COLOR0_BIT: number'],
	['let BUFFER_COLOR1_BIT: any', 'let BUFFER_COLOR1_BIT: number'],
	['let BUFFER_COLOR2_BIT: any', 'let BUFFER_COLOR2_BIT: number'],
	['let BUFFER_COLOR3_BIT: any', 'let BUFFER_COLOR3_BIT: number'],
	['let BUFFER_COLOR_BIT: any', 'let BUFFER_COLOR_BIT: number'],
	['let BUFFER_DEPTH_BIT: any', 'let BUFFER_DEPTH_BIT: number'],
	['let BUFFER_STENCIL_BIT: any', 'let BUFFER_STENCIL_BIT: number'],
	['let COMPARE_FUNC_ALWAYS: any', 'let COMPARE_FUNC_ALWAYS: number'],
	['let COMPARE_FUNC_EQUAL: any', 'let COMPARE_FUNC_EQUAL: number'],
	['let COMPARE_FUNC_GEQUAL: any', 'let COMPARE_FUNC_GEQUAL: number'],
	['let COMPARE_FUNC_GREATER: any', 'let COMPARE_FUNC_GREATER: number'],
	['let COMPARE_FUNC_LEQUAL: any', 'let COMPARE_FUNC_LEQUAL: number'],
	['let COMPARE_FUNC_LESS: any', 'let COMPARE_FUNC_LESS: number'],
	['let COMPARE_FUNC_NEVER: any', 'let COMPARE_FUNC_NEVER: number'],
	['let COMPARE_FUNC_NOTEQUAL: any', 'let COMPARE_FUNC_NOTEQUAL: number'],
	['let FACE_BACK: any', 'let FACE_BACK: number'],
	['let FACE_FRONT: any', 'let FACE_FRONT: number'],
	['let FACE_FRONT_AND_BACK: any', 'let FACE_FRONT_AND_BACK: number'],
	['let FILTER_LINEAR: any', 'let FILTER_LINEAR: number'],
	['let FILTER_NEAREST: any', 'let FILTER_NEAREST: number'],
	['let FORMAT_DEPTH: any', 'let FORMAT_DEPTH: number'],
	['let FORMAT_LUMINANCE: any', 'let FORMAT_LUMINANCE: number'],
	['let FORMAT_R16F: any', 'let FORMAT_R16F: number | undefined'],
	['let FORMAT_R32F: any', 'let FORMAT_R32F: number | undefined'],
	['let FORMAT_RG16F: any', 'let FORMAT_RG16F: number | undefined'],
	['let FORMAT_RG32F: any', 'let FORMAT_RG32F: number | undefined'],
	['let FORMAT_RGB: any', 'let FORMAT_RGB: number'],
	['let FORMAT_RGB16F: any', 'let FORMAT_RGB16F: number | undefined'],
	['let FORMAT_RGB32F: any', 'let FORMAT_RGB32F: number | undefined'],
	['let FORMAT_RGBA: any', 'let FORMAT_RGBA: number'],
	['let FORMAT_RGBA16F: any', 'let FORMAT_RGBA16F: number | undefined'],
	['let FORMAT_RGBA32F: any', 'let FORMAT_RGBA32F: number | undefined'],
	['let FORMAT_STENCIL: any', 'let FORMAT_STENCIL: number'],
	['let FRUSTUM_PLANES_ALL: any', 'let FRUSTUM_PLANES_ALL: number'],
	['let FRUSTUM_PLANES_SIDES: any', 'let FRUSTUM_PLANES_SIDES: number'],
	['let RENDER_TARGET_DEFAULT: any', 'let RENDER_TARGET_DEFAULT: number'],
	['let STATE_BLEND: any', 'let STATE_BLEND: number'],
	['let STATE_CULL_FACE: any', 'let STATE_CULL_FACE: number'],
	['let STATE_DEPTH_TEST: any', 'let STATE_DEPTH_TEST: number'],
	[
		'let STATE_POLYGON_OFFSET_FILL: any',
		'let STATE_POLYGON_OFFSET_FILL: number',
	],
	['let STATE_STENCIL_TEST: any', 'let STATE_STENCIL_TEST: number'],
	['let STENCIL_OP_DECR: any', 'let STENCIL_OP_DECR: number'],
	['let STENCIL_OP_DECR_WRAP: any', 'let STENCIL_OP_DECR_WRAP: number'],
	['let STENCIL_OP_INCR: any', 'let STENCIL_OP_INCR: number'],
	['let STENCIL_OP_INCR_WRAP: any', 'let STENCIL_OP_INCR_WRAP: number'],
	['let STENCIL_OP_INVERT: any', 'let STENCIL_OP_INVERT: number'],
	['let STENCIL_OP_KEEP: any', 'let STENCIL_OP_KEEP: number'],
	['let STENCIL_OP_REPLACE: any', 'let STENCIL_OP_REPLACE: number'],
	['let STENCIL_OP_ZERO: any', 'let STENCIL_OP_ZERO: number'],
	['let WRAP_CLAMP_TO_BORDER: any', 'let WRAP_CLAMP_TO_BORDER: number'],
	['let WRAP_CLAMP_TO_EDGE: any', 'let WRAP_CLAMP_TO_EDGE: number'],
	['let WRAP_MIRRORED_REPEAT: any', 'let WRAP_MIRRORED_REPEAT: number'],
	['let WRAP_REPEAT: any', 'let WRAP_REPEAT: number'],
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
];

/** socket namespace */
const socket = [
	['_SETSIZE: any', '_SETSIZE: number'],
	['_VERSION: any', '_VERSION: string'],
	[
		'newtry(finalizer: any): any',
		'newtry(finalizer: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown',
	],
	[
		'protect(func: any): any',
		'protect(func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown',
	],
	// function select
	['recvt: any', 'recvt: unknown[] | LuaSet'],
	['sendt: any', 'sendt: unknown[] | LuaSet'],
	// Functions can also return `undefined`
	['function tcp():', 'function tcp(): undefined |'],
	['function tcp6():', 'function tcp6(): undefined |'],
	['function udp():', 'function udp(): undefined |'],
	['function udp6():', 'function udp6(): undefined |'],
];

/** crash namespace */
const crash = [
	[
		'SYSFIELD_ANDROID_BUILD_FINGERPRINT: any',
		'SYSFIELD_ANDROID_BUILD_FINGERPRINT: number',
	],
	['SYSFIELD_DEVICE_LANGUAGE: any', 'SYSFIELD_DEVICE_LANGUAGE: number'],
	['SYSFIELD_DEVICE_MODEL: any', 'SYSFIELD_DEVICE_MODEL: number'],
	['SYSFIELD_ENGINE_HASH: any', 'SYSFIELD_ENGINE_HASH: number'],
	['SYSFIELD_ENGINE_VERSION: any', 'SYSFIELD_ENGINE_VERSION: number'],
	['SYSFIELD_LANGUAGE: any', 'SYSFIELD_LANGUAGE: number'],
	['SYSFIELD_MANUFACTURER: any', 'SYSFIELD_MANUFACTURER: number'],
	['SYSFIELD_MAX: any', 'SYSFIELD_MAX: number'],
	['SYSFIELD_SYSTEM_NAME: any', 'SYSFIELD_SYSTEM_NAME: number'],
	['SYSFIELD_SYSTEM_VERSION: any', 'SYSFIELD_SYSTEM_VERSION: number'],
	['SYSFIELD_TERRITORY: any', 'SYSFIELD_TERRITORY: number'],
	['USERFIELD_MAX: any', 'USERFIELD_MAX: number'],
	['USERFIELD_SIZE: any', 'USERFIELD_SIZE: number'],
	[
		'get_backtrace(handle: number): any',
		'get_backtrace(handle: number): LuaTable | LuaSet | LuaMap | object',
	],
	[
		'get_modules(handle: number): any',
		'get_modules(handle: number): LuaTable | LuaSet | LuaMap | object',
	],
	// Functions can also return `undefined`
	[
		'get_sys_field(handle: number, index: number):',
		'get_sys_field(handle: number, index: number): undefined |',
	],
	['function load_previous():', 'function load_previous(): undefined |'],
];

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

/** sound namespace */
const sound = [
	['let sound: any', 'let sound: hash'],
	['let gain: any', 'let gain: number'],
	['let pan: any', 'let pan: number'],
	['let speed: any', 'let speed: number'],
];

/** label namespace */
const label = [
	['let color: any', 'let color: vmath.vector4'],
	['let font: any', 'let font: hash'],
	['let leading: any', 'let leading: number'],
	['let line_break: any', 'let line_break: boolean'],
	['let outline: any', 'let outline: vmath.vector4'],
	['let scale: any', 'let scale: number | vmath.vector3'],
	['let shadow: any', 'let shadow: vmath.vector4'],
	['let tracking: any', 'let tracking: number'],
	// Prop also exists in sprite namespace
	['let size: any', 'let size: vmath.vector3'],
];

/** sprite namespace */
const sprite = [
	['let frame_count: any', 'const frame_count: number'],
	['let image: any', 'let image: hash'],
	// Prop also exists in model namespace
	['let playback_rate: any', 'let playback_rate: number'],
	['let scale: any', 'let scale: vmath.vector3'],
	// Prop also exists in label namespace
	['let size: any', 'let size: vmath.vector3'],
	// Prop also exists in model namespace
	['let animation: any', 'let animation: hash'],
	// Prop also exists in model namespace
	['let cursor: any', 'let cursor: number'],
];

/** collectionFactory namespace */
const collectionFactory = [
	['let STATUS_LOADED: any', 'const STATUS_LOADED: number'],
	['let STATUS_LOADING: any', 'const STATUS_LOADING: number'],
	['let STATUS_UNLOADED: any', 'const STATUS_UNLOADED: number'],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof collectionfactory.STATUS_UNLOADED | typeof collectionfactory.STATUS_LOADING | typeof collectionfactory.STATUS_LOADED',
	],
];

/** factory namespace */
const factory = [
	['let STATUS_LOADED: any', 'const STATUS_LOADED: number'],
	['let STATUS_LOADING: any', 'const STATUS_LOADING: number'],
	['let STATUS_UNLOADED: any', 'const STATUS_UNLOADED: number'],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof factory.STATUS_UNLOADED | typeof factory.STATUS_LOADING | typeof factory.STATUS_LOADED',
	],
];

/** model namespace */
const model = [
	// Prop also exists in sprite namespace
	['let playback_rate: any', 'let playback_rate: number'],
	// Prop also exists in sprite namespace
	['let animation: any', 'let animation: hash'],
	// Prop also exists in sprite namespace
	['let cursor: any', 'let cursor: number'],
];

/** particlefx namespace */
const particleFx = [
	['let EMITTER_STATE_POSTSPAWN: any', 'const EMITTER_STATE_POSTSPAWN: number'],
	['let EMITTER_STATE_PRESPAWN: any', 'const EMITTER_STATE_PRESPAWN: number'],
	['let EMITTER_STATE_SLEEPING: any', 'const EMITTER_STATE_SLEEPING: number'],
	['let EMITTER_STATE_SPAWNING: any', 'const EMITTER_STATE_SPAWNING: number'],
	// function play
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: unknown, id: unknown, emitter: unknown, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
];

/** vmath namespace */
const vmathChanges = [
	[
		'function vector(t: any): any',
		'function vector(t: number[] | LuaSet<number>): vmath.vector3 | vmath.vector4',
	],
];

/** Late changes that don't fit anywhere else */
const finalChanges = [
	// Greedy changes apply multiple times
	// Prop exists in gui, label, model, sprite, tilemap namespaces
	[/let material: any/g, 'let material: hash'],
	// Generic functions could be improved by describing the args
	[
		/complete_function\?: any/g,
		'complete_function?: (...args: unknown[]) => void',
	],
	// Generic tables as slightly stricter type
	[/(table|tbl): any/g, '$1: LuaTable | LuaSet | LuaMap | object | unknown[]'],
	// Replace `any` keyword with `unknown`
	[/\: any/g, ': unknown'],
	[/\[any/g, '[unknown'],
	[/any,/g, 'unknown,'],
	[/any\]/g, 'unknown]'],
	// Change uppercase variables to const
	[/let (?:\b|\W)([A-Z0-9_]+)(?:\b|\W)/g, 'const $1'],
];

const patches = [
	...defoldBasics,
	...languageQuirks,
	// The following are in order of appearance in the final definitions file
	...vmathChanges,
	...socket,
	...crash,
	...go,
	...gui,
	...physics,
	...profiler,
	...render,
	...resource,
	...sys,
	...windowChanges,
	...bufferChanges,
	...html5,
	...image,
	...msg,
	...timer,
	...camera,
	...collectionFactory,
	...factory,
	...label,
	...model,
	...particleFx,
	...sound,
	...sprite,
	...tilemap,
	// The following should always be last
	...finalChanges,
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
	// Make find and replace changes
	patches.forEach((pair) => (data = data.replace(pair[0], pair[1])));
	// Save the modified contents back to the file
	fs.writeFile(filePath, data, 'utf8', (err) => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.log('File saved successfully.');
	});
	console.timeEnd('Patching definitions');
});
