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
		declare type hash = Readonly<LuaUserdata>;`,
	],
	// Describe `node`
	['declare type node = {\n}', 'declare type node = Readonly<LuaUserdata>;'],
	// Describe `buffer`
	[
		'declare type buffer = {\n}',
		`/**
		* A block of memory that can store binary data.
		*/
		declare type buffer = Readonly<LuaUserdata>;`,
	],
	// Fix path to reference types
	[
		'/// <reference types="typescript-to-lua/language-extensions" />',
		'/// <reference types="@typescript-to-lua/language-extensions" />',
	],
	// Remove invalid null type
	['export let null: any', ''],
	// Remove invalid optional param in middle of param order
	[
		'export function set_texture(path: hash | string, table?: any, buffer: buffer): void',
		'export function set_texture(path: hash | string, table: any, buffer: buffer): void',
	],
	// Describe `euler`
	['export let euler: any', 'export let euler: vmath.vector3'],
	// Describe `buffer` types
	[/(VALUE_TYPE_.+): any/g, '$1: number'],
	// Describe easing types
	[/(EASING_.+): any/g, '$1: number'],
	// Describe playback types
	[/(PLAYBACK_.+): any/g, '$1: number'],
	// Describe tables as a stricter type
	[/(table|tbl): any/g, '$1: LuaTable | object'],
	// Replace remaining `any` keywords with `unknown` keywords
	// This doesn't replace types in square or angle brackets, eg. LuaMultiReturn<[any]>
	[/\: any/g, ': unknown'],
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
