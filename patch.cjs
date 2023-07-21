/**
 * Automatically make opinionated changes to the output of type-gen
 */

const fs = require('fs');

const filePath = 'index.d.ts';

// Matched pairs of text to replace and replacements
const patches = [
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
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
	// Change invalid null type
	['let null$: any', 'let null$: null'],
	// Return types
	['MODE_PAUSE: any', 'MODE_PAUSE: number'],
	['MODE_RECORD: any', 'MODE_RECORD: number'],
	['MODE_RUN: any', 'MODE_RUN: number'],
	['MODE_SHOW_PEAK_FRAME: any', 'MODE_SHOW_PEAK_FRAME: number'],
	['VIEW_MODE_FULL: any', 'VIEW_MODE_FULL: number'],
	['VIEW_MODE_MINIMIZED: any', 'VIEW_MODE_MINIMIZED: number'],
	['JOINT_TYPE_FIXED: any', 'JOINT_TYPE_FIXED: number'],
	['JOINT_TYPE_HINGE: any', 'JOINT_TYPE_HINGE: number'],
	['JOINT_TYPE_SLIDER: any', 'JOINT_TYPE_SLIDER: number'],
	['JOINT_TYPE_SPRING: any', 'JOINT_TYPE_SPRING: number'],
	['JOINT_TYPE_WELD: any', 'JOINT_TYPE_WELD: number'],
	[
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	[
		'function load(filename: string): any',
		'function load(filename: string): LuaMap',
	],
	// Describe internals
	['H_FLIP: any', 'H_FLIP: number'],
	['ROTATE_180: any', 'ROTATE_180: number'],
	['ROTATE_270: any', 'ROTATE_270: number'],
	['ROTATE_90: any', 'ROTATE_90: number'],
	['V_FLIP: any', 'V_FLIP: number'],
	[
		'function move_below(node: node, node1: any)',
		'function move_below(node: node, node1: node)',
	],
	[
		'function move_above(node: node, node1: any)',
		'function move_above(node: node, node1: node)',
	],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
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
	['_VERSION: any', '_VERSION: string'],
	['_SETSIZE: any', '_SETSIZE: number'],
	['SYSFIELD_ENGINE_VERSION: any', 'SYSFIELD_ENGINE_VERSION: number'],
	['SYSFIELD_ENGINE_HASH: any', 'SYSFIELD_ENGINE_HASH: number'],
	['SYSFIELD_DEVICE_MODEL: any', 'SYSFIELD_DEVICE_MODEL: number'],
	['SYSFIELD_MANUFACTURER: any', 'SYSFIELD_MANUFACTURER: number'],
	['SYSFIELD_SYSTEM_NAME: any', 'SYSFIELD_SYSTEM_NAME: number'],
	['SYSFIELD_SYSTEM_VERSION: any', 'SYSFIELD_SYSTEM_VERSION: number'],
	['SYSFIELD_LANGUAGE: any', 'SYSFIELD_LANGUAGE: number'],
	['SYSFIELD_DEVICE_LANGUAGE: any', 'SYSFIELD_DEVICE_LANGUAGE: number'],
	['SYSFIELD_TERRITORY: any', 'SYSFIELD_TERRITORY: number'],
	[
		'SYSFIELD_ANDROID_BUILD_FINGERPRINT: any',
		'SYSFIELD_ANDROID_BUILD_FINGERPRINT: number',
	],
	['SYSFIELD_MAX: any', 'SYSFIELD_MAX: number'],
	['USERFIELD_MAX: any', 'USERFIELD_MAX: number'],
	['USERFIELD_SIZE: any', 'USERFIELD_SIZE: number'],
	['function pprint(v: any)', 'function pprint(v: unknown[])'],
	['let aspect_ratio: any', 'let aspect_ratio: number'],
	['let projection: any', 'const projection: Readonly<vmath.matrix4>'],
	['let view: any', 'const view: Readonly<vmath.matrix4>'],
	['let sound: any', 'let sound: hash'],
	[/let playback_rate: any/g, 'let playback_rate: number'],
	[/let material: any/g, 'let material: hash'],
	['let textures: any', 'let textures: hash'],
	['let fonts: any', 'let fonts: hash'],
	['let far_z: any', 'let far_z: number'],
	['let fov: any', 'let fov: number'],
	['let near_z: any', 'let near_z: number'],
	['let orthographic_zoom: any', 'let orthographic_zoom: number'],
	['let color: any', 'let color: vmath.vector4'],
	['let font: any', 'let font: hash'],
	['let leading: any', 'let leading: number'],
	['let line_break: any', 'let line_break: boolean'],
	['let outline: any', 'let outline: vmath.vector4'],
	['let shadow: any', 'let shadow: vmath.vector4'],
	[/let size: any/g, 'let size: vmath.vector3'],
	['let tracking: any', 'let tracking: number'],
	[/let animation: any/g, 'let animation: hash'],
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	[/let cursor: any/g, 'let cursor: number'],
	['let frame_count: any', 'const frame_count: number'],
	['let image: any', 'let image: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	['let mass: any', 'const mass: number'],
	['let TEXTURE_TYPE_2D: any', 'let TEXTURE_TYPE_2D: number'],
	['let TEXTURE_TYPE_CUBE_MAP: any', 'let TEXTURE_TYPE_CUBE_MAP: number'],
	['let TEXTURE_TYPE_2D_ARRAY: any', 'let TEXTURE_TYPE_2D_ARRAY: number'],
	['let TEXTURE_FORMAT_LUMINANCE: any', 'let TEXTURE_FORMAT_LUMINANCE: number'],
	['let TEXTURE_FORMAT_RGB: any', 'let TEXTURE_FORMAT_RGB: number'],
	['let TEXTURE_FORMAT_RGBA: any', 'let TEXTURE_FORMAT_RGBA: number'],
	['let TEXTURE_FORMAT_RGBA_BC3: any', 'let TEXTURE_FORMAT_RGBA_BC3: number'],
	['let TEXTURE_FORMAT_RGB32F: any', 'let TEXTURE_FORMAT_RGB32F: number'],
	['let TEXTURE_FORMAT_RGBA16F: any', 'let TEXTURE_FORMAT_RGBA16F: number'],
	['let TEXTURE_FORMAT_RGBA32F: any', 'let TEXTURE_FORMAT_RGBA32F: number'],
	['let TEXTURE_FORMAT_R16F: any', 'let TEXTURE_FORMAT_R16F: number'],
	['let TEXTURE_FORMAT_R32F: any', 'let TEXTURE_FORMAT_R32F: number'],
	['let TEXTURE_FORMAT_RG32F: any', 'let TEXTURE_FORMAT_RG32F: number'],
	['let COMPRESSION_TYPE_DEFAULT: any', 'let COMPRESSION_TYPE_DEFAULT: number'],
	[
		'let COMPRESSION_TYPE_BASIS_UASTC: any',
		'let COMPRESSION_TYPE_BASIS_UASTC: number',
	],
	[
		'let TEXTURE_FORMAT_RGBA_ASTC_4x4: any',
		'const TEXTURE_FORMAT_RGBA_ASTC_4x4: number',
	],
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
	['let TEXTURE_FORMAT_RG16F: any', 'let TEXTURE_FORMAT_RG16F: number'],
	['let TEXTURE_FORMAT_RGB_BC1: any', 'let TEXTURE_FORMAT_RGB_BC1: number'],
	['let TEXTURE_FORMAT_RGB16F: any', 'let TEXTURE_FORMAT_RGB16F: number'],
	// This might be fragile!
	// Searches for `let scale: any` three times
	// assuming they're in a consistent order
	// and there are only three total.
	['let scale: any', 'let scale: number'],
	['let scale: any', 'let scale: number | vmath.vector3'],
	['let scale: any', 'let scale: vmath.vector3'],
	// Window consts
	['let DIMMING_UNKNOWN: any', 'let DIMMING_UNKNOWN: number'],
	['let DIMMING_ON: any', 'let DIMMING_ON: number'],
	['let DIMMING_OFF: any', 'let DIMMING_OFF: number'],
	['let WINDOW_EVENT_FOCUS_LOST: any', 'let WINDOW_EVENT_FOCUS_LOST: number'],
	[
		'let WINDOW_EVENT_FOCUS_GAINED: any',
		'let WINDOW_EVENT_FOCUS_GAINED: number',
	],
	['let WINDOW_EVENT_RESIZED: any', 'let WINDOW_EVENT_RESIZED: number'],
	// Iconfied is sometimes spelled Iconified. Probably a typo?
	['let WINDOW_EVENT_ICONFIED: any', 'let WINDOW_EVENT_ICONFIED: number'],
	['let WINDOW_EVENT_DEICONIFIED: any', 'let WINDOW_EVENT_DEICONIFIED: number'],
	[
		'function get_dim_mode(): any',
		'function get_dim_mode(): typeof window.DIMMING_UNKNOWN | typeof window.DIMMING_ON | typeof window.DIMMING_OFF',
	],
	[
		'function set_dim_mode(mode: any)',
		'function set_dim_mode(mode: typeof window.DIMMING_ON | typeof window.DIMMING_OFF)',
	],
	// Image
	['let TYPE_LUMINANCE: any', 'let TYPE_LUMINANCE: "l"'],
	['let TYPE_RGB: any', 'let TYPE_RGB: "rgb"'],
	['let TYPE_RGBA: any', 'let TYPE_RGBA: "rgba"'],
	[
		'function load(buffer: string, premult?: boolean): any',
		'function load(buffer: string, premult?: boolean): undefined | { width: number, height: number, type: typeof image.TYPE_RGB | typeof image.TYPE_RGBA | typeof image.TYPE_LUMINANCE, buffer: buffer }',
	],
	// Callbacks
	[
		'function set_listener(callback: any)',
		'function set_listener(callback: (this: unknown, event: typeof window.WINDOW_EVENT_FOCUS_LOST | typeof window.WINDOW_EVENT_FOCUS_GAINED | typeof window.WINDOW_EVENT_RESIZED | typeof window.WINDOW_EVENT_ICONFIED | typeof window.WINDOW_EVENT_DEICONIFIED, data: { width: number | undefined, height: number | undefined	}) => void)',
	],
	// Describe `buffer` types
	[/(VALUE_TYPE_.+): any/g, '$1: number'],
	// Describe easing types
	[/(EASING_.+): any/g, '$1: number'],
	// Describe playback types
	[/(PLAYBACK_.+): any/g, '$1: number'],
	// Describe tables as a stricter type
	[/(table|tbl): any/g, '$1: LuaTable | LuaSet | LuaMap | object'],
	// Describe some functions
	// Could be improved by describing the args
	[
		/complete_function\?: any/g,
		'complete_function?: (...args: unknown[]) => void',
	],
	[
		/emitter_state_function\?: any/g,
		'emitter_state_function?: (...args: unknown[]) => void',
	],
	// Replace `any` keywords with `unknown` keywords
	[/\: any/g, ': unknown'],
	[/\[any/g, '[unknown'],
	[/any,/g, 'unknown,'],
	[/any\]/g, 'unknown]'],
	// Change uppercase variables to const
	[/let (?:\b|\W)([A-Z0-9_]+)(?:\b|\W)/g, 'const $1'],
];

// Load the contents of the file
fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

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
});
