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
	// Remove invalid null type
	['export let null: any', '// export let null: null'],
	// Remove invalid optional param in middle of param order
	[
		'function set_texture(path: hash | string, table?: any, buffer: buffer): void',
		'function set_texture(path: hash | string, table: LuaTable | object | undefined, buffer: buffer): void',
	],
	// Return types
	[
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	[
		'function load(filename: string): any',
		'function load(filename: string): object | LuaTable',
	],
	// Describe internals
	['let sound: any', 'let sound: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let material: any', 'let material: hash'],
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
	['let size: any', 'let size: vmath.vector3'],
	['let tracking: any', 'let tracking: number'],
	['let animation: any', 'let animation: hash'],
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	['let scale: any', 'let scale: number | vmath.vector3'],
	['let cursor: any', 'let cursor: number'],
	['let frame_count: any', 'let frame_count: Readonly<number>'],
	['let image: any', 'let image: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	['let mass: any', 'let mass: Readonly<number>'],
	// Describe `buffer` types
	[/(VALUE_TYPE_.+): any/g, '$1: number'],
	// Describe easing types
	[/(EASING_.+): any/g, '$1: number'],
	// Describe playback types
	[/(PLAYBACK_.+): any/g, '$1: number'],
	// Describe tables as a stricter type
	[/(table|tbl): any/g, '$1: LuaTable | object'],
	// Describe some functions
	[
		'complete_function?: any',
		'complete_function?: (...args: unknown[]) => void',
	],
	// Replace `any` keywords with `unknown` keywords
	[/\: any/g, ': unknown'],
	[/\[any/g, '[unknown'],
	[/any,/g, 'unknown,'],
	[/any\]/g, 'unknown]'],
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
