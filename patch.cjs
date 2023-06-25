/**
 * Automatically make opinionated changes to the output of type-gen
 */

const fs = require('fs');

const filePath = 'index.d.ts';

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
		declare type hash = Readonly<LuaUserdata> &
		Readonly<{
			readonly __hash__: unique symbol;
		}>;`,
	],
	// Describe `node`
	[
		'declare type node = {\n}',
		`declare type node = Readonly<LuaUserdata> &
		Readonly<{
			readonly __node__: unique symbol;
		}>;`,
	],
	// Describe `buffer`
	[
		'declare type buffer = {\n}',
		`/**
		* A block of memory that can store binary data.
		*/
		declare type buffer = Readonly<LuaUserdata> &
		Readonly<{
			readonly __buffer__: unique symbol;
		}>;`,
	],
	// Fix path to reference types
	[
		'/// <reference types="typescript-to-lua/language-extensions" />',
		'/// <reference types="@typescript-to-lua/language-extensions" />',
	],
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
	// Change invalid null type
	['export let null: any', 'let $null: null; export { $null as null }'],
	// Remove invalid optional param in middle of param order
	[
		'function set_texture(path: hash | string, table?: any, buffer: buffer): void',
		'function set_texture(path: hash | string, table: LuaTable | LuaSet | LuaMap | object | undefined, buffer: buffer): void',
	],
	// Return types
	[
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	[
		'function load(filename: string): any',
		'function load(filename: string): LuaMap',
	],
	// Describe internals
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
	['let frame_count: any', 'let frame_count: Readonly<number>'],
	['let image: any', 'let image: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	['let mass: any', 'let mass: Readonly<number>'],
	['let TEXTURE_TYPE_2D: any', 'let TEXTURE_TYPE_2D: 0'],
	['let TEXTURE_TYPE_CUBE_MAP: any', 'let TEXTURE_TYPE_CUBE_MAP: 2'],
	['let TEXTURE_TYPE_2D_ARRAY: any', 'let TEXTURE_TYPE_2D_ARRAY: 1'],
	['let TEXTURE_FORMAT_LUMINANCE: any', 'let TEXTURE_FORMAT_LUMINANCE: 0'],
	['let TEXTURE_FORMAT_RGB: any', 'let TEXTURE_FORMAT_RGB: 2'],
	['let TEXTURE_FORMAT_RGBA: any', 'let TEXTURE_FORMAT_RGBA: 3'],
	['let TEXTURE_FORMAT_RGBA_BC3: any', 'let TEXTURE_FORMAT_RGBA_BC3: 18'],
	['let TEXTURE_FORMAT_RGB32F: any', 'let TEXTURE_FORMAT_RGB32F: 23'],
	['let TEXTURE_FORMAT_RGBA16F: any', 'let TEXTURE_FORMAT_RGBA16F: 24'],
	['let TEXTURE_FORMAT_RGBA32F: any', 'let TEXTURE_FORMAT_RGBA32F: 25'],
	['let TEXTURE_FORMAT_R16F: any', 'let TEXTURE_FORMAT_R16F: 26'],
	['let TEXTURE_FORMAT_R32F: any', 'let TEXTURE_FORMAT_R32F: 28'],
	['let TEXTURE_FORMAT_RG32F: any', 'let TEXTURE_FORMAT_RG32F: 29'],
	['let COMPRESSION_TYPE_DEFAULT: any', 'let COMPRESSION_TYPE_DEFAULT: 0'],
	[
		'let COMPRESSION_TYPE_BASIS_UASTC: any',
		'let COMPRESSION_TYPE_BASIS_UASTC: 3',
	],
	[
		'let TEXTURE_FORMAT_RGBA_ASTC_4x4: any',
		'let TEXTURE_FORMAT_RGBA_ASTC_4x4: number',
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
	['let TEXTURE_FORMAT_RG16F: any', 'let TEXTURE_FORMAT_RG16F: 27'],
	['let TEXTURE_FORMAT_RGB_BC1: any', 'let TEXTURE_FORMAT_RGB_BC1: 17'],
	['let TEXTURE_FORMAT_RGB16F: any', 'let TEXTURE_FORMAT_RGB16F: 22'],
	// This might be fragile!
	// Searches for `let scale: any` three times
	// assuming they're in a consistent order
	// and there are only three total.
	['let scale: any', 'let scale: number'],
	['let scale: any', 'let scale: number | vmath.vector3'],
	['let scale: any', 'let scale: vmath.vector3'],
	// Window consts
	['let DIMMING_UNKNOWN: any', 'let DIMMING_UNKNOWN: 0'],
	['let DIMMING_ON: any', 'let DIMMING_ON: 1'],
	['let DIMMING_OFF: any', 'let DIMMING_OFF: 2'],
	['let WINDOW_EVENT_FOCUS_LOST: any', 'let WINDOW_EVENT_FOCUS_LOST: 0'],
	['let WINDOW_EVENT_FOCUS_GAINED: any', 'let WINDOW_EVENT_FOCUS_GAINED: 1'],
	['let WINDOW_EVENT_RESIZED: any', 'let WINDOW_EVENT_RESIZED: 2'],
	// Iconfied is sometimes spelled Iconified. Probably a typo?
	['let WINDOW_EVENT_ICONFIED: any', 'let WINDOW_EVENT_ICONFIED: 3'],
	['let WINDOW_EVENT_DEICONIFIED: any', 'let WINDOW_EVENT_DEICONIFIED: 4'],
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
	[/table\?: any/g, 'table?: LuaTable | LuaSet | LuaMap | object'],
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
	// ['let LIVEUPDATE_SIGNATURE_MISMATCH: any','let LIVEUPDATE_SIGNATURE_MISMATCH: -6'],
	// ['let LIVEUPDATE_SCHEME_MISMATCH: any','let LIVEUPDATE_SCHEME_MISMATCH: -7'],
	// ['let LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH: any','let LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH: -8'],
	// ['let LIVEUPDATE_FORMAT_ERROR: any','let LIVEUPDATE_FORMAT_ERROR: -9'],
	// ['let LIVEUPDATE_ENGINE_VERSION_MISMATCH: any','let LIVEUPDATE_ENGINE_VERSION_MISMATCH: -5'],
	// ['let LIVEUPDATE_VERSION_MISMATCH: any','let LIVEUPDATE_VERSION_MISMATCH: -4'],
	// ['let LIVEUPDATE_INVALID_RESOURCE: any','let LIVEUPDATE_INVALID_RESOURCE: -3'],
	// ['let LIVEUPDATE_OK: any','let LIVEUPDATE_OK: 0'],
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
