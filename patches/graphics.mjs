// @ts-check

/** graphics namespace @satisfies {(string | RegExp)[][]} */
export const graphics = [
	// Create Constant type
	[
		'',
		`export type BufferTypeConstant = number & { readonly __brand: "graphics.BUFFER_TYPE" };
		export const BUFFER_TYPE_COLOR0: BufferTypeConstant;
		export const BUFFER_TYPE_COLOR1: BufferTypeConstant | undefined;
		export const BUFFER_TYPE_COLOR2: BufferTypeConstant | undefined;
		export const BUFFER_TYPE_COLOR3: BufferTypeConstant | undefined;
		export const BUFFER_TYPE_DEPTH: BufferTypeConstant;
		export const BUFFER_TYPE_STENCIL: BufferTypeConstant;
		export const BUFFER_TYPE_COLOR0_BIT: BufferTypeConstant;
		export const BUFFER_TYPE_COLOR1_BIT: BufferTypeConstant | undefined;
		export const BUFFER_TYPE_COLOR2_BIT: BufferTypeConstant | undefined;
		export const BUFFER_TYPE_COLOR3_BIT: BufferTypeConstant | undefined;
		`,
	],
	// Create Constant type
	[
		'',
		'export type BlendConstant = number & { readonly __brand: "graphics.BLEND" };',
	],
	// Create Constant type
	[
		'',
		'export type BufferConstant = number & { readonly __brand: "graphics.BUFFER" };',
	],
	// Create Constant type
	[
		'',
		'export type CompareFuncConstant = number & { readonly __brand: "graphics.COMPARE_FUNC" };',
	],
	// Create Constant type
	[
		'',
		'export type FaceConstant = number & { readonly __brand: "graphics.FACE" };',
	],
	// Create Constant type
	[
		'',
		'export type FilterConstant = number & { readonly __brand: "graphics.FILTER" };',
	],
	// Create Constant type
	[
		'',
		'export type FormatConstant = number & { readonly __brand: "graphics.FORMAT" };',
	],
	// Create Constant type
	[
		'',
		'export type StateConstant = number & { readonly __brand: "graphics.STATE" };',
	],
	// Create Constant type
	[
		'',
		'export type StencilConstant = number & { readonly __brand: "graphics.STENCIL" };',
	],
	// Create Constant type
	[
		'',
		'export type WrapConstant = number & { readonly __brand: "graphics.WRAP" };',
	],
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
	[/let (STATE_.+): any/g, 'const $1: StateConstant'],
	// (greedy)
	[/let (STENCIL_.+): any/g, 'const $1: StencilConstant'],
	// (greedy)
	[/let (WRAP_.+): any/g, 'const $1: WrapConstant'],
	// Create Constant type
	[
		'',
		'export type CompressionConstant = number & { readonly __brand: "graphics.COMPRESSION" };',
	],
	// Create Constant type
	[
		'',
		'export type TextureConstant = number & { readonly __brand: "graphics.TEXTURE" };',
	],
	// (greedy)
	[/let (COMPRESSION_.+): any/g, 'const $1: CompressionConstant'],
	// (greedy)
	[/let (TEXTURE_.+): any/g, 'const $1: TextureConstant'],
];
