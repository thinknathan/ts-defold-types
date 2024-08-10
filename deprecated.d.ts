declare namespace resource {
	/**
	 * BASIS_UASTC compression type
	 */
	export const COMPRESSION_TYPE_BASIS_UASTC: number & {
		readonly __brand: 'resource.COMPRESSION';
	};

	/**
	 * COMPRESSION_TYPE_DEFAULT compression type
	 */
	export const COMPRESSION_TYPE_DEFAULT: number & {
		readonly __brand: 'resource.COMPRESSION';
	};

	/**
	 * luminance type texture format
	 */
	export const TEXTURE_FORMAT_LUMINANCE: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * R16F type texture format
	 */
	export const TEXTURE_FORMAT_R16F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * R32F type texture format
	 */
	export const TEXTURE_FORMAT_R32F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RG16F type texture format
	 */
	export const TEXTURE_FORMAT_RG16F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RG32F type texture format
	 */
	export const TEXTURE_FORMAT_RG32F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB type texture format
	 */
	export const TEXTURE_FORMAT_RGB: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB16F type texture format
	 */
	export const TEXTURE_FORMAT_RGB16F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB32F type texture format
	 */
	export const TEXTURE_FORMAT_RGB32F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA type texture format
	 */
	export const TEXTURE_FORMAT_RGBA: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA16F type texture format
	 */
	export const TEXTURE_FORMAT_RGBA16F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA32F type texture format
	 */
	export const TEXTURE_FORMAT_RGBA32F: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA_ASTC_4x4 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_ASTC_4x4: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA_BC3 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_BC3: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA_BC7 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_BC7: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA_ETC2 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_ETC2: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA_PVRTC_2BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGBA_PVRTC_4BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB_BC1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_BC1: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB_ETC1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_ETC1: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB_PVRTC_2BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RGB_PVRTC_4BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * RG_BC5 type texture format
	 */
	export const TEXTURE_FORMAT_RG_BC5: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * R_BC4 type texture format
	 */
	export const TEXTURE_FORMAT_R_BC4: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * 2D texture type
	 */
	export const TEXTURE_TYPE_2D: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * 2D Array texture type
	 */
	export const TEXTURE_TYPE_2D_ARRAY: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * Cube map texture type
	 */
	export const TEXTURE_TYPE_CUBE_MAP: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * Usage hint for creating textures that uses temporary memory
	 */
	export const TEXTURE_USAGE_FLAG_MEMORYLESS: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * Usage hint for creating textures that can be sampled in a shader
	 */
	export const TEXTURE_USAGE_FLAG_SAMPLE: number & {
		readonly __brand: 'resource.TEXTURE';
	};

	/**
	 * Usage hint for creating textures that can be used for writing in a shader
	 */
	export const TEXTURE_USAGE_FLAG_STORAGE: number & {
		readonly __brand: 'resource.TEXTURE';
	};
}

declare namespace render {
	/**
	 *
	 */
	export const STATE_BLEND: number & { readonly __brand: 'render.STATE' };

	/**
	 *
	 */
	export const STATE_CULL_FACE: number & { readonly __brand: 'render.STATE' };

	/**
	 *
	 */
	export const STATE_DEPTH_TEST: number & { readonly __brand: 'render.STATE' };

	/**
	 *
	 */
	export const STATE_POLYGON_OFFSET_FILL: number & {
		readonly __brand: 'render.STATE';
	};

	/**
	 *
	 */
	export const STATE_STENCIL_TEST: number & {
		readonly __brand: 'render.STATE';
	};

	/**
	 *
	 */
	export const STENCIL_OP_DECR: number & { readonly __brand: 'render.STENCIL' };

	/**
	 *
	 */
	export const STENCIL_OP_DECR_WRAP: number & {
		readonly __brand: 'render.STENCIL';
	};

	/**
	 *
	 */
	export const STENCIL_OP_INCR: number & { readonly __brand: 'render.STENCIL' };

	/**
	 *
	 */
	export const STENCIL_OP_INCR_WRAP: number & {
		readonly __brand: 'render.STENCIL';
	};

	/**
	 *
	 */
	export const STENCIL_OP_INVERT: number & {
		readonly __brand: 'render.STENCIL';
	};

	/**
	 *
	 */
	export const STENCIL_OP_KEEP: number & { readonly __brand: 'render.STENCIL' };

	/**
	 *
	 */
	export const STENCIL_OP_REPLACE: number & {
		readonly __brand: 'render.STENCIL';
	};

	/**
	 *
	 */
	export const STENCIL_OP_ZERO: number & { readonly __brand: 'render.STENCIL' };

	/**
	 *
	 */
	export const WRAP_CLAMP_TO_BORDER: number & {
		readonly __brand: 'render.WRAP';
	};

	/**
	 *
	 */
	export const WRAP_CLAMP_TO_EDGE: number & { readonly __brand: 'render.WRAP' };

	/**
	 *
	 */
	export const WRAP_MIRRORED_REPEAT: number & {
		readonly __brand: 'render.WRAP';
	};

	/**
	 *
	 */
	export const WRAP_REPEAT: number & { readonly __brand: 'render.WRAP' };

	/**
	 *
	 */
	export const BLEND_CONSTANT_ALPHA: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_CONSTANT_COLOR: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_DST_ALPHA: number & { readonly __brand: 'render.BLEND' };

	/**
	 *
	 */
	export const BLEND_DST_COLOR: number & { readonly __brand: 'render.BLEND' };

	/**
	 *
	 */
	export const BLEND_ONE: number & { readonly __brand: 'render.BLEND' };

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_CONSTANT_ALPHA: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_CONSTANT_COLOR: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_DST_ALPHA: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_DST_COLOR: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_SRC_ALPHA: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_SRC_COLOR: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_SRC_ALPHA: number & { readonly __brand: 'render.BLEND' };

	/**
	 *
	 */
	export const BLEND_SRC_ALPHA_SATURATE: number & {
		readonly __brand: 'render.BLEND';
	};

	/**
	 *
	 */
	export const BLEND_SRC_COLOR: number & { readonly __brand: 'render.BLEND' };

	/**
	 *
	 */
	export const BLEND_ZERO: number & { readonly __brand: 'render.BLEND' };

	/**
	 *
	 */
	export const BUFFER_COLOR0_BIT: number & {
		readonly __brand: 'render.BUFFER';
	};

	/**
	 *
	 */
	export const BUFFER_COLOR1_BIT: number & {
		readonly __brand: 'render.BUFFER';
	};

	/**
	 *
	 */
	export const BUFFER_COLOR2_BIT: number & {
		readonly __brand: 'render.BUFFER';
	};

	/**
	 *
	 */
	export const BUFFER_COLOR3_BIT: number & {
		readonly __brand: 'render.BUFFER';
	};

	/**
	 *
	 */
	export const BUFFER_COLOR_BIT: number & { readonly __brand: 'render.BUFFER' };

	/**
	 *
	 */
	export const BUFFER_DEPTH_BIT: number & { readonly __brand: 'render.BUFFER' };

	/**
	 *
	 */
	export const BUFFER_STENCIL_BIT: number & {
		readonly __brand: 'render.BUFFER';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_ALWAYS: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_EQUAL: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_GEQUAL: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_GREATER: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_LEQUAL: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_LESS: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_NEVER: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_NOTEQUAL: number & {
		readonly __brand: 'render.COMPARE_FUNC';
	};

	/**
	 *
	 */
	export const FACE_BACK: number & { readonly __brand: 'render.FACE' };

	/**
	 *
	 */
	export const FACE_FRONT: number & { readonly __brand: 'render.FACE' };

	/**
	 *
	 */
	export const FACE_FRONT_AND_BACK: number & {
		readonly __brand: 'render.FACE';
	};

	/**
	 *
	 */
	export const FILTER_LINEAR: number & { readonly __brand: 'render.FILTER' };

	/**
	 *
	 */
	export const FILTER_NEAREST: number & { readonly __brand: 'render.FILTER' };

	/**
	 *
	 */
	export const FORMAT_DEPTH: number & { readonly __brand: 'render.FORMAT' };

	/**
	 *
	 */
	export const FORMAT_LUMINANCE: number & { readonly __brand: 'render.FORMAT' };

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_R16F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_R32F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RG16F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RG32F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 *
	 */
	export const FORMAT_RGB: number & { readonly __brand: 'render.FORMAT' };

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGB16F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGB32F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 *
	 */
	export const FORMAT_RGBA: number & { readonly __brand: 'render.FORMAT' };

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGBA16F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGBA32F:
		| (number & { readonly __brand: 'render.FORMAT' })
		| undefined;

	/**
	 *
	 */
	export const FORMAT_STENCIL: number & { readonly __brand: 'render.FORMAT' };
}
