declare namespace graphics {
	// TO-DO: Move from deprecated to `graphics` module when it gets added to the API
	export type CompressionConstant = number & {
		__brand: 'graphics.COMPRESSION';
	};
	export type TextureConstant = number & { __brand: 'graphics.TEXTURE' };
	export type BlendConstant = number & { __brand: 'graphics.BLEND' };
	export type BufferConstant = number & { __brand: 'graphics.BUFFER' };
	export type CompareFuncConstant = number & {
		__brand: 'graphics.COMPARE_FUNC';
	};
	export type FaceConstant = number & { __brand: 'graphics.FACE' };
	export type FilterConstant = number & { __brand: 'graphics.FILTER' };
	export type FormatConstant = number & { __brand: 'graphics.FORMAT' };
	export type StateConstant = number & { __brand: 'graphics.STATE' };
	export type StencilConstant = number & { __brand: 'graphics.STENCIL' };
	export type WrapConstant = number & { __brand: 'graphics.WRAP' };
}

declare namespace render {
	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_CONSTANT_ALPHA: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_CONSTANT_COLOR: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_DST_ALPHA: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_DST_COLOR: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_CONSTANT_ALPHA: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_CONSTANT_COLOR: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_DST_ALPHA: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_DST_COLOR: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_SRC_ALPHA: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_SRC_COLOR: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_SRC_ALPHA: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_SRC_ALPHA_SATURATE: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_SRC_COLOR: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ZERO: graphics.BlendConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR0_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR1_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR2_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR3_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_DEPTH_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_STENCIL_BIT: graphics.BufferConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_ALWAYS: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_EQUAL: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_GEQUAL: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_GREATER: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_LEQUAL: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_LESS: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_NEVER: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_NOTEQUAL: graphics.CompareFuncConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FACE_BACK: graphics.FaceConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FACE_FRONT: graphics.FaceConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FACE_FRONT_AND_BACK: graphics.FaceConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FILTER_LINEAR: graphics.FilterConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FILTER_NEAREST: graphics.FilterConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_DEPTH: graphics.FormatConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_LUMINANCE: graphics.FormatConstant;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_R16F: graphics.FormatConstant | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_R32F: graphics.FormatConstant | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RG16F: graphics.FormatConstant | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RG32F: graphics.FormatConstant | undefined;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGB: graphics.FormatConstant;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGB16F: graphics.FormatConstant | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGB32F: graphics.FormatConstant | undefined;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGBA: graphics.FormatConstant;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGBA16F: graphics.FormatConstant | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGBA32F: graphics.FormatConstant | undefined;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_STENCIL: graphics.FormatConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_BLEND: graphics.StateConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_CULL_FACE: graphics.StateConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_DEPTH_TEST: graphics.StateConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_POLYGON_OFFSET_FILL: graphics.StateConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_STENCIL_TEST: graphics.StateConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_DECR: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_DECR_WRAP: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_INCR: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_INCR_WRAP: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_INVERT: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_KEEP: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_REPLACE: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_ZERO: graphics.StencilConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_CLAMP_TO_BORDER: graphics.WrapConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_CLAMP_TO_EDGE: graphics.WrapConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_MIRRORED_REPEAT: graphics.WrapConstant;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_REPEAT: graphics.WrapConstant;
}

declare namespace resource {
	/**
	 * BASIS_UASTC compression type
	 * @deprecated since v1.9.2
	 */
	export const COMPRESSION_TYPE_BASIS_UASTC: graphics.CompressionConstant;

	/**
	 * COMPRESSION_TYPE_DEFAULT compression type
	 * @deprecated since v1.9.2
	 */
	export const COMPRESSION_TYPE_DEFAULT: graphics.CompressionConstant;

	/**
	 * luminance type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_LUMINANCE: graphics.TextureConstant;

	/**
	 * R16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_R16F: graphics.TextureConstant;

	/**
	 * R32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_R32F: graphics.TextureConstant;

	/**
	 * RG16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RG16F: graphics.TextureConstant;

	/**
	 * RG32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RG32F: graphics.TextureConstant;

	/**
	 * RGB type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB: graphics.TextureConstant;

	/**
	 * RGB16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB16F: graphics.TextureConstant;

	/**
	 * RGB32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB32F: graphics.TextureConstant;

	/**
	 * RGBA type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA: graphics.TextureConstant;

	/**
	 * RGBA16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA16F: graphics.TextureConstant;

	/**
	 * RGBA32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA32F: graphics.TextureConstant;

	/**
	 * RGBA_ASTC_4x4 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_ASTC_4x4: graphics.TextureConstant;

	/**
	 * RGBA_BC3 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_BC3: graphics.TextureConstant;

	/**
	 * RGBA_BC7 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_BC7: graphics.TextureConstant;

	/**
	 * RGBA_ETC2 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_ETC2: graphics.TextureConstant;

	/**
	 * RGBA_PVRTC_2BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: graphics.TextureConstant;

	/**
	 * RGBA_PVRTC_4BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: graphics.TextureConstant;

	/**
	 * RGB_BC1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_BC1: graphics.TextureConstant;

	/**
	 * RGB_ETC1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_ETC1: graphics.TextureConstant;

	/**
	 * RGB_PVRTC_2BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: graphics.TextureConstant;

	/**
	 * RGB_PVRTC_4BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: graphics.TextureConstant;

	/**
	 * RG_BC5 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RG_BC5: graphics.TextureConstant;

	/**
	 * R_BC4 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_R_BC4: graphics.TextureConstant;

	/**
	 * 2D texture type
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_TYPE_2D: graphics.TextureConstant;

	/**
	 * 2D Array texture type
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_TYPE_2D_ARRAY: graphics.TextureConstant;

	/**
	 * Cube map texture type
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_TYPE_CUBE_MAP: graphics.TextureConstant;

	/**
	 * Usage hint for creating textures that uses temporary memory
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_USAGE_FLAG_MEMORYLESS: graphics.TextureConstant;

	/**
	 * Usage hint for creating textures that can be sampled in a shader
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_USAGE_FLAG_SAMPLE: graphics.TextureConstant;

	/**
	 * Usage hint for creating textures that can be used for writing in a shader
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_USAGE_FLAG_STORAGE: graphics.TextureConstant;
}

declare namespace camera {
	/**
	 * makes camera active
	 * @param url  url of camera component
	 * @deprecated since v1.8.1
	 */
	export function acquire_focus(url: hash | url | string): void;

	/**
	 * deactivate camera
	 * @param url  url of camera component
	 * @deprecated since v1.8.1
	 */
	export function release_focus(url: hash | url | string): void;

	/**
	 * Post this message to a camera-component to activate it.
	 * Several cameras can be active at the same time, but only the camera that was last activated will be used for rendering.
	 * When the camera is deactivated (see `release_camera_focus`), the previously activated camera will again be used for rendering automatically.
	 * The reason it is called "camera focus" is the similarity to how acquiring input focus works (see `acquire_input_focus`).
	 * @deprecated since v1.8.1
	 */
	export type acquire_camera_focus = 'acquire_camera_focus';

	/**
	 * Post this message to a camera-component to deactivate it. The camera is then removed from the active cameras.
	 * See `acquire_camera_focus` for more information how the active cameras are used in rendering.
	 * @deprecated since v1.8.1
	 */
	export type release_camera_focus = 'release_camera_focus';
}

declare namespace gui {
	/**
	* Get the text metrics from a text node.
	* @deprecated since v1.2.189
	* @param node  text node to measure text from
	* @return metrics  a table with the following fields:
	- width
	- height
	- max_ascent
	- max_descent
	*/
	export function get_text_metrics_from_node(node: node): {
		width: number;
		height: number;
		max_ascent: number;
		max_descent: number;
	};
}
