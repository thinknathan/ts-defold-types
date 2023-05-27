/**
 * Automatically make opinionated changes to the output of type-gen
 */

const fs = require('fs');

const filePath = 'index.d.ts';

const patches = [
	// Add proper definitions for `url`
	[
		'declare type url = {\n}',
		`/**
			* A URL made from a socket, path, and optionally a fragment.
			*/
			declare type url = {
				socket: hash;
				path: hash;
				fragment?: hash;
			}`,
	],
	// Fix path to reference types
	[
		`/// <reference types="typescript-to-lua/language-extensions" />`,
		`/// <reference types="@typescript-to-lua/language-extensions" />`,
	],
	// Remove invalid null type
	[`export let null: any`, ''],
	// Remove invalid optional param in middle of param order
	[
		`export function set_texture(path: hash | string, table?: any, buffer: buffer): void`,
		`export function set_texture(path: hash | string, table: any, buffer: buffer): void`,
	],
	// Replace all `any` keywords with unknown `keywords`
	[/\: any/g, `: unknown`],
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
