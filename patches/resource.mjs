// @ts-check

/** resource namespace @satisfies {(string | RegExp)[][]} */
export const resource = [
	// TO-DO: What is the actual return value here? The docs were changed in v1.9.9
	[
		'export function create_texture_async(path: string, table: any, buffer?: buffer): any',
		'export function create_texture_async(path: string, table: AnyNotNil, buffer?: buffer): AnyNotNil',
	],
	[
		'function get_render_target_info(path: any): any',
		`function get_render_target_info(path: string): { handle: unknown, attachments: { handle: unknown, width: number, height: number, depth: number, mipmaps: number, type: graphics.TextureConstant, buffer_type: graphics.BufferTypeConstant }[] };`,
	],
	[
		'function create_atlas(path: string, table: any)',
		'function create_atlas(path: string, table: {	texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: go.PlaybackConstant, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: { id: string, vertices: number[], uvs: number[], indices: number[] }[] } )',
	],
	[
		'function get_atlas(path: hash | string): any',
		'function get_atlas(path: hash | string): {	texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: go.PlaybackConstant, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] }',
	],
	[
		'function get_text_metrics(url: hash, text: string, options?: any): any',
		'function get_text_metrics(url: hash, text: string, options?: { width?: number, leading?: number, tracking?: number, line_break?: boolean }): { width: number, height: number, max_ascent: number, max_descent: number }',
	],
	[
		'function get_texture_info(path: any): any',
		'function get_texture_info(path: hash | string): { handle: hash, width: number, height: number, depth: number, mipmaps: number, type: graphics.TextureConstant }',
	],
	[
		'function create_buffer(path: string, table?: any)',
		'function create_buffer(path: string, table: { buffer: buffer, transfer_ownership?: boolean })',
	],
	[
		'function create_texture(path: string, table: any, buffer?: buffer): hash',
		'function create_texture(path: string, table: { type: graphics.TextureConstant, width: number, height: number, format: graphics.TextureConstant, max_mipmaps?: number, compression_type?: graphics.CompressionConstant }, buffer?: buffer): hash',
	],
	[
		'function set_atlas(path: hash | string, table: any)',
		'function set_atlas(path: hash | string, table: { texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: go.PlaybackConstant, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] })',
	],
	[
		'function set_buffer(path: hash | string, buffer: buffer, table?: any)',
		'function set_buffer(path: hash | string, buffer: buffer, table?: { transfer_ownership: boolean })',
	],
	[
		'function set_texture(path: hash | string, table: any, buffer: buffer)',
		'function set_texture(path: hash | string, table: { type: graphics.TextureConstant, width: number, height: number, format: graphics.TextureConstant, x?: number, y?: number, mipmap?: number, compression_type?: graphics.CompressionConstant }, buffer: buffer)',
	],
	[
		'function create_sound_data(path: string, options?: any)',
		`function create_sound_data(path: string, options?: {
		data?: any,
		filesize?: number,
		partial?: boolean
	})`,
	],
];
