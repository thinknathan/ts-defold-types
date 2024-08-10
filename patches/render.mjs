// @ts-check

/** render namespace @satisfies {(string | RegExp)[][]} */
export const render = [
	// Create Constant type
	[
		'',
		'type RenderTargetConstant = number & { readonly __brand: "render.RENDER_TARGET" };',
	],
	// Create Constant type
	['', 'type BlendConstant = number & { readonly __brand: "render.BLEND" };'],
	// Create Constant type
	['', 'type BufferConstant = number & { readonly __brand: "render.BUFFER" };'],
	// Create Constant type
	[
		'',
		'type CompareFuncConstant = number & { readonly __brand: "render.COMPARE_FUNC" };',
	],
	// Create Constant type
	['', 'type FaceConstant = number & { readonly __brand: "render.FACE" };'],
	// Create Constant type
	['', 'type FilterConstant = number & { readonly __brand: "render.FILTER" };'],
	// Create Constant type
	['', 'type FormatConstant = number & { readonly __brand: "render.FORMAT" };'],
	// Create Constant type
	[
		'',
		'type FrustumPlanesConstant = number & { readonly __brand: "render.FRUSTUM_PLANES" };',
	],
	// Create Constant type
	['', 'type StateConstant = number & { readonly __brand: "render.STATE" };'],
	// Create Constant type
	[
		'',
		'type StencilConstant = number & { readonly __brand: "render.STENCIL" };',
	],
	// Create Constant type
	['', 'type WrapConstant = number & { readonly __brand: "render.WRAP" };'],
	// (greedy)
	[/let (BLEND_.+): any/g, 'const $1: BlendConstant'],
	// (greedy)
	[/let (BUFFER_.+): any/g, 'const $1: BufferConstant'],
	// (greedy)
	[/let (COMPARE_FUNC_.+): any/g, 'const $1: CompareFuncConstant'],
	// (greedy)
	[/let (FACE_.+): any/g, 'const $1: FaceConstant'],
	// (greedy)
	[/let (FILTER_.+): any/g, 'const $1: FilterConstant'],
	// (greedy)
	[/(render_target): any/g, '$1: rendertarget'],
	['let FORMAT_R16F: any', 'const FORMAT_R16F: FormatConstant | undefined'],
	['let FORMAT_R32F: any', 'const FORMAT_R32F: FormatConstant | undefined'],
	['let FORMAT_RG16F: any', 'const FORMAT_RG16F: FormatConstant | undefined'],
	['let FORMAT_RG32F: any', 'const FORMAT_RG32F: FormatConstant | undefined'],
	['let FORMAT_RGB16F: any', 'const FORMAT_RGB16F: FormatConstant | undefined'],
	['let FORMAT_RGB32F: any', 'const FORMAT_RGB32F: FormatConstant | undefined'],
	[
		'let FORMAT_RGBA16F: any',
		'const FORMAT_RGBA16F: FormatConstant | undefined',
	],
	[
		'let FORMAT_RGBA32F: any',
		'const FORMAT_RGBA32F: FormatConstant | undefined',
	],
	// (greedy)
	[/let (FORMAT_.+): any/g, 'const $1: FormatConstant'],
	// (greedy)
	[/let (FRUSTUM_PLANES_.+): any/g, 'const $1: FrustumPlanesConstant'],
	[
		'let RENDER_TARGET_DEFAULT: any',
		'const RENDER_TARGET_DEFAULT: RenderTargetConstant',
	],
	// (greedy)
	[/let (STATE_.+): any/g, 'const $1: StateConstant'],
	// (greedy)
	[/let (STENCIL_.+): any/g, 'const $1: StencilConstant'],
	// (greedy)
	[/let (WRAP_.+): any/g, 'const $1: WrapConstant'],
	[
		'function disable_state(state: any',
		'function disable_state(state: StateConstant',
	],
	[
		'function enable_state(state: any',
		'function enable_state(state: StateConstant',
	],
	[
		'function predicate(tags: any): any',
		'function predicate(tags: Array<string|hash> | LuaSet<string|hash>): predicate',
	],
	[
		'function set_cull_face(face_type: any',
		'function set_cull_face(face_type: FaceConstant',
	],
	[
		'function set_depth_func(func: any',
		'function set_depth_func(func: CompareFuncConstant',
	],
	// function enable_texture
	['buffer_type?: any', 'buffer_type?: BufferConstant'],
	// function get_render_target_height
	['buffer_type: any', 'buffer_type: BufferConstant'],
	// function get_render_target_width
	['buffer_type: any', 'buffer_type: BufferConstant'],
	// function set_stencil_func
	['func: any', 'func: CompareFuncConstant'],
	['function constant_buffer(): any', 'function constant_buffer(): buffer'],
	[
		'function clear(buffers: any)',
		'function clear(buffers: { [key: BufferConstant]: number | vmath.vector4 })',
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
		'function render_target(name: string, parameters: { [key: BufferConstant ]: {	format: FormatConstant; width: number; height: number; min_filter?: FilterConstant; mag_filter?: FilterConstant; u_wrap?: WrapConstant; v_wrap?: WrapConstant; flags?: unknown } }): rendertarget',
	],
	[
		'function set_stencil_op(sfail: any, dpfail: any, dppass: any)',
		'function set_stencil_op(sfail: StencilConstant, dpfail: StencilConstant, dppass: StencilConstant)',
	],
	[
		'function set_render_target(render_target: rendertarget, options?: any)',
		'function set_render_target(render_target: rendertarget, options?: Array<BufferConstant>)',
	],
	[
		'function set_blend_func(source_factor: any, destination_factor: any)',
		'function set_blend_func(source_factor: BlendConstant, destination_factor: BlendConstant)',
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
