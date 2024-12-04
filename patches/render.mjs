// @ts-check

/** render namespace @satisfies {(string | RegExp)[][]} */
export const render = [
	// Create Constant type
	[
		'',
		'type RenderTargetConstant = number & { readonly __brand: "render.RENDER_TARGET" };',
	],
	// Create Constant type
	[
		'',
		'type FrustumPlanesConstant = number & { readonly __brand: "render.FRUSTUM_PLANES" };',
	],
	// (greedy)
	[/(render_target): any/g, '$1: rendertarget'],
	// (greedy)
	[/let (FRUSTUM_PLANES_.+): any/g, 'const $1: FrustumPlanesConstant'],
	[
		'let RENDER_TARGET_DEFAULT: any',
		'const RENDER_TARGET_DEFAULT: RenderTargetConstant',
	],
	[
		'function disable_state(state: any',
		'function disable_state(state: graphics.StateConstant',
	],
	[
		'function enable_state(state: any',
		'function enable_state(state: graphics.StateConstant',
	],
	[
		'function predicate(tags: any): any',
		'function predicate(tags: Array<string|hash> | LuaSet<string|hash>): predicate',
	],
	[
		'function set_cull_face(face_type: any',
		'function set_cull_face(face_type: graphics.FaceConstant',
	],
	[
		'function set_depth_func(func: any',
		'function set_depth_func(func: graphics.CompareFuncConstant',
	],
	// function enable_texture
	['buffer_type?: any', 'buffer_type?: graphics.BufferConstant'],
	// function get_render_target_height
	['buffer_type: any', 'buffer_type: graphics.BufferConstant'],
	// function get_render_target_width
	['buffer_type: any', 'buffer_type: graphics.BufferConstant'],
	// function set_stencil_func
	['func: any', 'func: graphics.CompareFuncConstant'],
	['function constant_buffer(): any', 'function constant_buffer(): buffer'],
	[
		'function clear(buffers: any)',
		'function clear(buffers: { [key: graphics.BufferConstant]: number | vmath.vector4 })',
	],
	[
		'function draw(predicate: any, options?: any)',
		'function draw(predicate: predicate, options?: { frustum?: vmath.matrix4, frustum_planes?: FrustumPlanesConstant, constants?: buffer })',
	],
	[
		'function draw_debug3d(options?: any)',
		'function draw_debug3d(options?: { frustum?: vmath.matrix4, frustum_planes?: FrustumPlanesConstant })',
	],
	[
		'function render_target(name: string, parameters: any): any',
		'function render_target(name: string, parameters: { [key: graphics.BufferConstant ]: {	format: graphics.FormatConstant; width: number; height: number; min_filter?: graphics.FilterConstant; mag_filter?: graphics.FilterConstant; u_wrap?: graphics.WrapConstant; v_wrap?: graphics.WrapConstant; flags?: unknown } }): rendertarget',
	],
	[
		'function set_stencil_op(sfail: any, dpfail: any, dppass: any)',
		'function set_stencil_op(sfail: graphics.StencilConstant, dpfail: graphics.StencilConstant, dppass: graphics.StencilConstant)',
	],
	[
		'function set_render_target(render_target: rendertarget, options?: any)',
		'function set_render_target(render_target: rendertarget, options?: graphics.BufferConstant[])',
	],
	[
		'function set_blend_func(source_factor: any, destination_factor: any)',
		'function set_blend_func(source_factor: graphics.BlendConstant, destination_factor: graphics.BlendConstant)',
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
	// Probably a temporary fix to add new types here.
	// Needs to be adjusted when CONTEXT_EVENT_CONTEXT_LOST is properly added
	// to the docs.
	[
		'function set_listener(callback: any): void',
		`function set_listener(callback: undefined | ((this: any, event_type: ContextEventConstant) => void)): void;
		type ContextEventConstant = number & { readonly __brand: "render.CONTEXT_EVENT" };
		export const CONTEXT_EVENT_CONTEXT_LOST: ContextEventConstant;
		export const CONTEXT_EVENT_CONTEXT_RESTORED: ContextEventConstant;`,
	],
];
