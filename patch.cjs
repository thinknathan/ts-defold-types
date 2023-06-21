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
		'export function set_texture(path: hash | string, table?: any, buffer: buffer): void',
		'export function set_texture(path: hash | string, table: LuaTable | object | undefined, buffer: buffer): void',
	],
	// Describe internals
	['export let sound: any', 'export let sound: hash'],
	['export let playback_rate: any', 'export let playback_rate: number'],
	['export let material: any', 'export let material: hash'],
	['export let textures: any', 'export let textures: hash'],
	['export let fonts: any', 'export let fonts: hash'],
	['export let far_z: any', 'export let far_z: number'],
	['export let fov: any', 'export let fov: number'],
	['export let near_z: any', 'export let near_z: number'],
	['export let orthographic_zoom: any', 'export let orthographic_zoom: number'],
	['export let color: any', 'export let color: vmath.vector4'],
	['export let font: any', 'export let font: hash'],
	['export let leading: any', 'export let leading: number'],
	['export let line_break: any', 'export let line_break: boolean'],
	['export let outline: any', 'export let outline: vmath.vector4'],
	['export let shadow: any', 'export let shadow: vmath.vector4'],
	['export let size: any', 'export let size: vmath.vector3'],
	['export let tracking: any', 'export let tracking: number'],
	['export let animation: any', 'export let animation: hash'],
	['export let euler: any', 'export let euler: vmath.vector3'],
	['export let position: any', 'export let position: vmath.vector3'],
	['export let rotation: any', 'export let rotation: vmath.quaternion'],
	['export let scale: any', 'export let scale: number | vmath.vector3'],
	['export let cursor: any', 'export let cursor: number'],
	['export let frame_count: any', 'export let frame_count: Readonly<number>'],
	['export let image: any', 'export let image: hash'],
	['export let tile_source: any', 'export let tile_source: hash'],
	['export let mass: any', 'export let mass: Readonly<number>'],
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
