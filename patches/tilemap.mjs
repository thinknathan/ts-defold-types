// @ts-check

/** tilemap namespace @satisfies {(string | RegExp)[][]} */
export const tilemap = [
	['let material: any', 'let material: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	// Create Constant type
	[
		'',
		'export type FlipConstant = number & { readonly __brand: "tilemap.ROTATE" };',
	],
	// Create Constant type
	[
		'',
		'export type RotateConstant = number & { readonly __brand: "tilemap.FLIP" };',
	],
	['let H_FLIP: any', 'const H_FLIP: FlipConstant'],
	// (greedy)
	[/let (ROTATE_.+): any/g, 'const $1: RotateConstant'],
	['let V_FLIP: any', 'const V_FLIP: FlipConstant'],
];
