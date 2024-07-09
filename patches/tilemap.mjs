// @ts-check

/** tilemap namespace */
export const tilemap = [
	['let material: any', 'let material: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	[
		'let H_FLIP: any',
		'const H_FLIP: number & { readonly __FLIP_: unique symbol }',
	],
	// (greedy)
	[
		/let (ROTATE_.+): any/g,
		'const $1: number & { readonly _ROTATE_: unique symbol }',
	],
	[
		'let V_FLIP: any',
		'const V_FLIP: number & { readonly __FLIP_: unique symbol }',
	],
];
