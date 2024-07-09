// @ts-check

/** render namespace */
export const render = [
	// (greedy)
	[
		/let (BLEND_.+): any/g,
		'const $1: number & { readonly _BLEND_: unique symbol }',
	],
	// (greedy)
	[
		/let (BUFFER_.+): any/g,
		'const $1: number & { readonly _BUFFER_: unique symbol }',
	],
	// (greedy)
	[
		/let (COMPARE_FUNC_.+): any/g,
		'const $1: number & { readonly _COMPARE_FUNC_: unique symbol }',
	],
	// (greedy)
	[
		/let (FACE_.+): any/g,
		'const $1: number & { readonly _FACE_: unique symbol }',
	],
	// (greedy)
	[
		/let (FILTER_.+): any/g,
		'const $1: number & { readonly _FILTER_: unique symbol }',
	],
	// (greedy)
	[/(render_target): any/g, '$1: rendertarget'],
	[
		'let FORMAT_R16F: any',
		'const FORMAT_R16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_R32F: any',
		'const FORMAT_R32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RG16F: any',
		'const FORMAT_RG16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RG32F: any',
		'const FORMAT_RG32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGB16F: any',
		'const FORMAT_RGB16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGB32F: any',
		'const FORMAT_RGB32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGBA16F: any',
		'const FORMAT_RGBA16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGBA32F: any',
		'const FORMAT_RGBA32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	// (greedy)
	[
		/let (FORMAT_.+): any/g,
		'const $1: number & { readonly _FORMAT_: unique symbol }',
	],
	// (greedy)
	[
		/let (FRUSTUM_PLANES_.+): any/g,
		'const $1: number & { readonly _FRUSTUM_PLANES_: unique symbol }',
	],
	[
		'let RENDER_TARGET_DEFAULT: any',
		'const RENDER_TARGET_DEFAULT: number & { readonly _RENDER_TARGET_DEFAULT: unique symbol }',
	],
	// (greedy)
	[
		/let (STATE_.+): any/g,
		'const $1: number & { readonly _STATE_: unique symbol }',
	],
	// (greedy)
	[
		/let (STENCIL_.+): any/g,
		'const $1: number & { readonly _STENCIL_: unique symbol }',
	],
	// (greedy)
	[
		/let (WRAP_.+): any/g,
		'const $1: number & { readonly _WRAP_: unique symbol }',
	],
	[
		'function disable_state(state: any',
		'function disable_state(state: typeof render.STATE_DEPTH_TEST | typeof render.STATE_STENCIL_TEST | typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_POLYGON_OFFSET_FILL',
	],
	[
		'function enable_state(state: any',
		'function enable_state(state: typeof render.STATE_DEPTH_TEST | typeof render.STATE_STENCIL_TEST | typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_POLYGON_OFFSET_FILL',
	],
	[
		'function predicate(tags: any): any',
		'function predicate(tags: Array<string|hash> | LuaSet<string|hash>): predicate',
	],
	[
		'function set_cull_face(face_type: any',
		'function set_cull_face(face_type: typeof render.FACE_FRONT | typeof render.FACE_BACK | typeof render.FACE_FRONT_AND_BACK',
	],
	[
		'function set_depth_func(func: any',
		'function set_depth_func(func: typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_NOTEQUAL | typeof render.COMPARE_FUNC_ALWAYS',
	],
	// function enable_texture
	[
		'buffer_type?: any',
		'buffer_type?: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT',
	],
	// function get_render_target_height
	[
		'buffer_type: any',
		'buffer_type: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT',
	],
	// function get_render_target_width
	[
		'buffer_type: any',
		'buffer_type: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT',
	],
	// function set_stencil_func
	[
		'func: any',
		'func: typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_NOTEQUAL | typeof render.COMPARE_FUNC_ALWAYS',
	],
	['function constant_buffer(): any', 'function constant_buffer(): buffer'],
	[
		'function clear(buffers: any)',
		'function clear(buffers: { [key: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT]: number | vmath.vector4 })',
	],
	[
		'function draw(predicate: any, options?: any)',
		'function draw(predicate: predicate, options?: { frustum?: vmath.matrix4, frustum_planes?: typeof render.FRUSTUM_PLANES_SIDES | typeof render.FRUSTUM_PLANES_ALL, constants?: buffer })',
	],
	[
		'function draw_debug3d(options?: any)',
		'function draw_debug3d(options?: { frustum?: vmath.matrix4, frustum_planes?: typeof render.FRUSTUM_PLANES_SIDES | typeof render.FRUSTUM_PLANES_ALL })',
	],
	[
		'function render_target(name: string, parameters: any): any',
		'function render_target(name: string, parameters: { [key: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT ]: {	format: typeof render.FORMAT_LUMINANCE | typeof render.FORMAT_RGB | typeof render.FORMAT_RGBA | typeof render.FORMAT_DEPTH | typeof render.FORMAT_STENCIL | typeof render.FORMAT_RGBA32F | typeof render.FORMAT_RGBA16F; width: number; height: number; min_filter?: typeof render.FILTER_LINEAR | typeof render.FILTER_NEAREST; mag_filter?: typeof render.FILTER_LINEAR | typeof render.FILTER_NEAREST; u_wrap?: typeof render.WRAP_CLAMP_TO_BORDER | typeof render.WRAP_CLAMP_TO_EDGE | typeof render.WRAP_MIRRORED_REPEAT | typeof render.WRAP_REPEAT; v_wrap?: typeof render.WRAP_CLAMP_TO_BORDER | typeof render.WRAP_CLAMP_TO_EDGE | typeof render.WRAP_MIRRORED_REPEAT | typeof render.WRAP_REPEAT; flags?: unknown } }): rendertarget',
	],
	[
		'function set_stencil_op(sfail: any, dpfail: any, dppass: any)',
		'function set_stencil_op(sfail: typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_ZERO | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INVERT, dpfail: typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_ZERO | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INVERT, dppass: typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_ZERO | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INVERT)',
	],
	[
		'function set_render_target(render_target: rendertarget, options?: any)',
		'function set_render_target(render_target: rendertarget, options?: Array<typeof render.BUFFER_COLOR_BIT | typeof  render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT>)',
	],
	[
		'function set_blend_func(source_factor: any, destination_factor: any)',
		'function set_blend_func(source_factor: typeof render.BLEND_ZERO | typeof render.BLEND_ONE | typeof render.BLEND_SRC_COLOR | typeof render.BLEND_ONE_MINUS_SRC_COLOR | typeof render.BLEND_DST_COLOR | typeof render.BLEND_ONE_MINUS_DST_COLOR | typeof render.BLEND_SRC_ALPHA | typeof render.BLEND_ONE_MINUS_SRC_ALPHA | typeof render.BLEND_DST_ALPHA | typeof render.BLEND_ONE_MINUS_DST_ALPHA | typeof render.BLEND_CONSTANT_COLOR | typeof render.BLEND_ONE_MINUS_CONSTANT_COLOR | typeof render.BLEND_CONSTANT_ALPHA | typeof render.BLEND_ONE_MINUS_CONSTANT_ALPHA | typeof render.BLEND_SRC_ALPHA_SATURATE	, destination_factor: typeof render.BLEND_ZERO | typeof render.BLEND_ONE | typeof render.BLEND_SRC_COLOR | typeof render.BLEND_ONE_MINUS_SRC_COLOR | typeof render.BLEND_DST_COLOR | typeof render.BLEND_ONE_MINUS_DST_COLOR | typeof render.BLEND_SRC_ALPHA | typeof render.BLEND_ONE_MINUS_SRC_ALPHA | typeof render.BLEND_DST_ALPHA | typeof render.BLEND_ONE_MINUS_DST_ALPHA | typeof render.BLEND_CONSTANT_COLOR | typeof render.BLEND_ONE_MINUS_CONSTANT_COLOR | typeof render.BLEND_CONSTANT_ALPHA | typeof render.BLEND_ONE_MINUS_CONSTANT_ALPHA | typeof render.BLEND_SRC_ALPHA_SATURATE	)',
	],
	// Describe clear color message
	[
		'export type clear_color = "clear_color"',
		'export type clear_color = "clear_color"; export type clear_color_message = { color: vmath.vector4 }',
	],
	[
		'export type draw_debug_text = "draw_debug_text"',
		'export type draw_debug_text = "draw_debug_text"; export type draw_debug_text_message = { position: vmath.vector3, text: string, color: vmath.vector4 }',
	],
	[
		'export type draw_line = "draw_line"',
		'export type draw_line = "draw_line";export type draw_line_message = { start_point: vmath.vector3, end_point: vmath.vector3, color: vmath.vector4 }',
	],
	[
		'export type resize = "resize"',
		'export type resize = "resize"; export type resize_message = { height: number, width: number }',
	],
	[
		'export type window_resized = "window_resized"',
		'export type window_resized = "window_resized"; export type window_resized_message = { height: number, width: number }',
	],
	[
		'function set_camera(camera: any, options?: any)',
		'function set_camera(camera: any, options?: { use_frustum: boolean })',
	],
];
