// @ts-check

/**
 * Automatically make opinionated changes to the output of `type-gen`.
 * Uses arrays of data pairs ['findThis', 'replaceWithThis']
 * Ultimately uses `String.replace`, which accepts either strings or regex.
 */

import * as fs from 'fs';
import { earlyChanges } from './patches/_earlyChanges.mjs';
import { finalChanges } from './patches/_finalChanges.mjs';
import { getApiDocLinks } from './patches/_getApiDocLinks.mjs';

const filePath = 'index.d.ts';

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
	earlyChanges.forEach((pair) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		typeof pair[1] === 'string'
			? (data = data.replace(pair[0], pair[1]))
			: console.error('Expected pair[1] to be string');
	});

	// Make final find and replace changes
	finalChanges.forEach((pair) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		typeof pair[1] === 'string'
			? (data = data.replace(pair[0], pair[1]))
			: console.error('Expected pair[1] to be string');
	});
	console.timeEnd('Patching definitions');

	// Insert API links
	data = getApiDocLinks(data);

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
