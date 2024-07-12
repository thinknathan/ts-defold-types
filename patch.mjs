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
import { model } from './patches/model.mjs';
import { particleFx } from './patches/particleFx.mjs';
import { sound } from './patches/sound.mjs';
import { sprite } from './patches/sprite.mjs';
import { tilemap } from './patches/tilemap.mjs';
import { finalChanges } from './patches/_finalChanges.mjs';
import { getApiDocLinks } from './patches/_getApiDocLinks.mjs';

const patches = [
	// The following are in order of appearance in the final definitions file
	{
		regex: /(declare namespace socket {)([\s\S]*?)(declare namespace b2d {)/s,
		replacements: socket,
	},
	{
		regex: /(declare namespace b2d {)([\s\S]*?)(declare namespace b2d.body {)/s,
		replacements: b2d,
	},
	{
		regex:
			/(declare namespace b2d.body {)([\s\S]*?)(declare namespace crash {)/s,
		replacements: b2dBody,
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
