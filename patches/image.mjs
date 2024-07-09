// @ts-check

/** image namespace */
export const image = [
	['let TYPE_LUMINANCE: any', 'const TYPE_LUMINANCE: "l"'],
	['let TYPE_LUMINANCE_ALPHA: any', 'const TYPE_LUMINANCE_ALPHA: "la"'],
	['let TYPE_RGB: any', 'const TYPE_RGB: "rgb"'],
	['let TYPE_RGBA: any', 'const TYPE_RGBA: "rgba"'],
	[
		'function load_buffer(buffer: string, options?: any): LuaMultiReturn<[any, any]>',
		'function load_buffer(buffer: string, options?: { premultiply_alpha?: boolean, flip_vertically?: boolean }): undefined | { width: number, height: number, type: typeof TYPE_RGB | typeof TYPE_RGBA | typeof TYPE_LUMINANCE | typeof TYPE_LUMINANCE_ALPHA, buffer: buffer }',
	],
	[
		'function load(buffer: string, options?: any): LuaMultiReturn<[any, any]>',
		'function load(buffer: string, options?: { premultiply_alpha?: boolean, flip_vertically?: boolean }): undefined | { width: number, height: number, type: typeof image.TYPE_RGB | typeof image.TYPE_RGBA | typeof image.TYPE_LUMINANCE | typeof image.TYPE_LUMINANCE_ALPHA, buffer: string }',
	],
];
