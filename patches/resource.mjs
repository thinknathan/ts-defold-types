// @ts-check

/** resource namespace @satisfies {(string | RegExp)[][]} */
export const resource = [
	// (greedy)
	[
		/let (COMPRESSION_.+): any/g,
		'const $1: number & { readonly _COMPRESSION_: unique symbol }',
	],
	// (greedy)
	[
		/let (TEXTURE_.+): any/g,
		'const $1: number & { readonly _TEXTURE_: unique symbol }',
	],
	[
		'function get_render_target_info(path: any): any',
		`function get_render_target_info(path: string): { handle: unknown, attachments: { handle: unknown, width: number, height: number, depth: number, mipmaps: number, type: typeof TEXTURE_TYPE_2D | typeof TEXTURE_TYPE_CUBE_MAP | typeof TEXTURE_TYPE_2D_ARRAY, buffer_type: typeof BUFFER_TYPE_COLOR0 | typeof BUFFER_TYPE_COLOR1 | typeof BUFFER_TYPE_COLOR2 | typeof BUFFER_TYPE_COLOR3 | typeof BUFFER_TYPE_DEPTH | typeof BUFFER_TYPE_STENCIL }[] };
		export const BUFFER_TYPE_COLOR0: number & { readonly _BUFFER_: unique symbol };
		export const BUFFER_TYPE_COLOR1: number & { readonly _BUFFER_: unique symbol };
		export const BUFFER_TYPE_COLOR2: number & { readonly _BUFFER_: unique symbol };
		export const BUFFER_TYPE_COLOR3: number & { readonly _BUFFER_: unique symbol };
		export const BUFFER_TYPE_DEPTH: number & { readonly _BUFFER_: unique symbol };
		export const BUFFER_TYPE_STENCIL: number & { readonly _BUFFER_: unique symbol };`,
	],
	[
		'function create_atlas(path: string, table: any)',
		'function create_atlas(path: string, table: {	texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: { id: string, vertices: number[], uvs: number[], indices: number[] }[] } )',
	],
	[
		'function get_atlas(path: hash | string): any',
		'function get_atlas(path: hash | string): {	texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] }',
	],
	[
		'function get_text_metrics(url: hash, text: string, options?: any): any',
		'function get_text_metrics(url: hash, text: string, options?: { width?: number, leading?: number, tracking?: number, line_break?: boolean }): { width: number, height: number, max_ascent: number, max_descent: number }',
	],
	[
		'function get_texture_info(path: any): any',
		'function get_texture_info(path: hash | string): { handle: hash, width: number, height: number, depth: number, mipmaps: number, type: typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_CUBE_MAP | typeof resource.TEXTURE_TYPE_2D_ARRAY }',
	],
	[
		'function create_buffer(path: string, table?: any)',
		'function create_buffer(path: string, table: { buffer: buffer, transfer_ownership?: boolean })',
	],
	[
		'function create_texture(path: string, table: any, buffer?: buffer): hash',
		'function create_texture(path: string, table: { type: typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_CUBE_MAP, width: number, height: number, format: typeof resource.TEXTURE_FORMAT_LUMINANCE | typeof resource.TEXTURE_FORMAT_RGB | typeof resource.TEXTURE_FORMAT_RGBA | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_ETC1 | typeof resource.TEXTURE_FORMAT_RGBA_ETC2 | typeof resource.TEXTURE_FORMAT_RGBA_ASTC_4x4 | typeof resource.TEXTURE_FORMAT_RGB_BC1 | typeof resource.TEXTURE_FORMAT_RGBA_BC3 | typeof resource.TEXTURE_FORMAT_R_BC4 | typeof resource.TEXTURE_FORMAT_RG_BC5 | typeof resource.TEXTURE_FORMAT_RGBA_BC7 | typeof resource.TEXTURE_FORMAT_RGB16F | typeof resource.TEXTURE_FORMAT_RGB32F | typeof resource.TEXTURE_FORMAT_RGBA16F | typeof resource.TEXTURE_FORMAT_RGBA32F | typeof resource.TEXTURE_FORMAT_R16F | typeof resource.TEXTURE_FORMAT_RG16F | typeof resource.TEXTURE_FORMAT_R32F | typeof resource.TEXTURE_FORMAT_RG32F, max_mipmaps?: number, compression_type?: typeof resource.COMPRESSION_TYPE_DEFAULT | typeof resource.COMPRESSION_TYPE_BASIS_UASTC }, buffer?: buffer): hash',
	],
	[
		'function set_atlas(path: hash | string, table: any)',
		'function set_atlas(path: hash | string, table: { texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] })',
	],
	[
		'function set_buffer(path: hash | string, buffer: buffer, table?: any)',
		'function set_buffer(path: hash | string, buffer: buffer, table?: { transfer_ownership: boolean })',
	],
	[
		'function set_texture(path: hash | string, table: any, buffer: buffer)',
		'function set_texture(path: hash | string, table: { type: typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_CUBE_MAP, width: number, height: number, format: typeof resource.TEXTURE_FORMAT_LUMINANCE | typeof resource.TEXTURE_FORMAT_RGB | typeof resource.TEXTURE_FORMAT_RGBA | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_ETC1 | typeof resource.TEXTURE_FORMAT_RGBA_ETC2 | typeof resource.TEXTURE_FORMAT_RGBA_ASTC_4x4 | typeof resource.TEXTURE_FORMAT_RGB_BC1 | typeof resource.TEXTURE_FORMAT_RGBA_BC3 | typeof resource.TEXTURE_FORMAT_R_BC4 | typeof resource.TEXTURE_FORMAT_RG_BC5 | typeof resource.TEXTURE_FORMAT_RGBA_BC7 | typeof resource.TEXTURE_FORMAT_RGB16F | typeof resource.TEXTURE_FORMAT_RGB32F | typeof resource.TEXTURE_FORMAT_RGBA16F | typeof resource.TEXTURE_FORMAT_RGBA32F | typeof resource.TEXTURE_FORMAT_R16F | typeof resource.TEXTURE_FORMAT_RG16F | typeof resource.TEXTURE_FORMAT_R32F | typeof resource.TEXTURE_FORMAT_RG32F, x?: number, y?: number, mipmap?: number, compression_type?: typeof resource.COMPRESSION_TYPE_DEFAULT | typeof resource.COMPRESSION_TYPE_BASIS_UASTC }, buffer: buffer)',
	],
];
