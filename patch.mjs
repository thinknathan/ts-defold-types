// @ts-check

/**
 * Automatically make opinionated changes to the output of `type-gen`.
 * Uses arrays of data pairs ['findThis', 'replaceWithThis']
 * Ultimately uses `String.replace`, which accepts either strings or regex.
 */

import * as fs from 'fs';
import { earlyChanges } from './patches/_earlyChanges.mjs';
import { socket } from './patches/socket.mjs';
import { b2d } from './patches/b2d.mjs';
import { b2dBody } from './patches/b2d.body.mjs';
import { go } from './patches/go.mjs';
import { gui } from './patches/gui.mjs';
import { physics } from './patches/physics.mjs';
import { profiler } from './patches/profiler.mjs';
import { render } from './patches/render.mjs';
import { crash } from './patches/crash.mjs';
import { resource } from './patches/resource.mjs';
import { sys } from './patches/sys.mjs';
import { windowChanges } from './patches/window.mjs';
import { bufferChanges } from './patches/buffer.mjs';
import { html5 } from './patches/html5.mjs';
import { http } from './patches/http.mjs';
import { image } from './patches/image.mjs';
import { jsonChanges } from './patches/json.mjs';
import { msg } from './patches/msg.mjs';
import { timer } from './patches/timer.mjs';
import { vmathChanges } from './patches/vmath.mjs';
import { zlib } from './patches/zlib.mjs';
import { camera } from './patches/camera.mjs';
import { collectionFactory } from './patches/collectionFactory.mjs';
import { collectionProxy } from './patches/collectionProxy.mjs';
import { factory } from './patches/factory.mjs';
import { label } from './patches/label.mjs';
import { liveupdate } from './patches/liveupdate.mjs';
import { model } from './patches/model.mjs';
import { particleFx } from './patches/particleFx.mjs';
import { sound } from './patches/sound.mjs';
import { sprite } from './patches/sprite.mjs';
import { types } from './patches/types.mjs';
import { graphics } from './patches/graphics.mjs';
import { tilemap } from './patches/tilemap.mjs';
import { finalChanges } from './patches/_finalChanges.mjs';
import { getApiDocLinks } from './patches/_getApiDocLinks.mjs';

const patches = [
	// The following are in order of appearance in the final definitions file
	{
		regex: /(declare namespace socket {)([\s\S]*?)(declare namespace)/s,
		replacements: socket,
	},
	{
		regex: /(declare namespace b2d {)([\s\S]*?)(declare namespace)/s,
		replacements: b2d,
	},
	{
		regex: /(declare namespace b2d.body {)([\s\S]*?)(declare namespace)/s,
		replacements: b2dBody,
	},
	{
		regex: /(declare namespace crash {)([\s\S]*?)(declare namespace)/s,
		replacements: crash,
	},
	{
		regex: /(declare namespace go {)([\s\S]*?)(declare namespace)/s,
		replacements: go,
	},
	{
		regex: /(declare namespace gui {)([\s\S]*?)(declare namespace)/s,
		replacements: gui,
	},
	{
		regex: /(declare namespace physics {)([\s\S]*?)(declare namespace)/s,
		replacements: physics,
	},
	{
		regex: /(declare namespace profiler {)([\s\S]*?)(declare namespace)/s,
		replacements: profiler,
	},
	{
		regex: /(declare namespace render {)([\s\S]*?)(declare namespace)/s,
		replacements: render,
	},
	{
		regex: /(declare namespace resource {)([\s\S]*?)(declare namespace)/s,
		replacements: resource,
	},
	{
		regex: /(declare namespace sys {)([\s\S]*?)(declare namespace)/s,
		replacements: sys,
	},
	{
		regex: /(declare namespace window {)([\s\S]*?)(declare namespace)/s,
		replacements: windowChanges,
	},
	{
		regex: /(declare namespace buffer {)([\s\S]*?)(declare namespace)/s,
		replacements: bufferChanges,
	},
	{
		regex: /(declare namespace html5 {)([\s\S]*?)(declare namespace)/s,
		replacements: html5,
	},
	{
		regex: /(declare namespace http {)([\s\S]*?)(declare namespace)/s,
		replacements: http,
	},
	{
		regex: /(declare namespace image {)([\s\S]*?)(declare namespace)/s,
		replacements: image,
	},
	{
		regex: /(declare namespace json {)([\s\S]*?)(declare namespace)/s,
		replacements: jsonChanges,
	},
	{
		regex: /(declare namespace msg {)([\s\S]*?)(declare namespace)/s,
		replacements: msg,
	},
	{
		regex: /(declare namespace timer {)([\s\S]*?)(declare namespace)/s,
		replacements: timer,
	},
	{
		// greedy because there are two instances of namespace vmath
		regex: /(declare namespace vmath {)([\s\S]*?)(declare namespace)/gs,
		replacements: vmathChanges,
	},
	{
		regex: /(declare namespace zlib {)([\s\S]*?)(declare namespace)/s,
		replacements: zlib,
	},
	{
		regex: /(declare namespace camera {)([\s\S]*?)(declare namespace)/s,
		replacements: camera,
	},
	{
		regex:
			/(declare namespace collectionfactory {)([\s\S]*?)(declare namespace)/s,
		replacements: collectionFactory,
	},
	{
		regex:
			/(declare namespace collectionproxy {)([\s\S]*?)(declare namespace)/s,
		replacements: collectionProxy,
	},
	{
		regex: /(declare namespace factory {)([\s\S]*?)(declare namespace)/s,
		replacements: factory,
	},
	{
		regex: /(declare namespace label {)([\s\S]*?)(declare namespace)/s,
		replacements: label,
	},
	{
		regex: /(declare namespace liveupdate {)([\s\S]*?)(declare namespace)/s,
		replacements: liveupdate,
	},
	{
		regex: /(declare namespace model {)([\s\S]*?)(declare namespace)/s,
		replacements: model,
	},
	{
		regex: /(declare namespace particlefx {)([\s\S]*?)(declare namespace)/s,
		replacements: particleFx,
	},
	{
		regex: /(declare namespace sound {)([\s\S]*?)(declare namespace)/s,
		replacements: sound,
	},
	{
		regex: /(declare namespace sprite {)([\s\S]*?)(declare namespace)/s,
		replacements: sprite,
	},
	{
		regex: /(declare namespace types {)([\s\S]*?)(declare namespace)/s,
		replacements: types,
	},
	{
		regex: /(declare namespace graphics {)([\s\S]*?)(declare namespace)/s,
		replacements: graphics,
	},
	{
		regex: /(declare namespace tilemap {)([\s\S]*?)(})/s,
		replacements: tilemap,
	},
];

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
		typeof pair[1] === 'string'
			? (data = data.replace(pair[0], pair[1]))
			: console.error('Expected pair[1] to be string');
	});

	// Loop through namespace changes
	for (const patch of patches) {
		const { regex, replacements } = patch;

		data = data.replace(regex, (_match, namespace, group, namespace2) => {
			// Apply replacements using string.replace dynamically
			replacements.forEach(([search, replace]) => {
				group = group.replace(search, replace);
			});
			return `${namespace}${group}${namespace2}`;
		});
	}

	// Make final find and replace changes
	finalChanges.forEach((pair) => {
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
