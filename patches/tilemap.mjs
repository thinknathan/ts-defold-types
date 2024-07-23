// @ts-check

/** tilemap namespace @satisfies {(string | RegExp)[][]} */
export const tilemap = [
	['let material: any', 'let material: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	[
		'let H_FLIP: any',
		'const H_FLIP: number & { readonly __brand: "tilemap.H_FLIP" }',
	],
	// (greedy)
	[
		/let (ROTATE_.+): any/g,
		'const $1: number & { readonly __brand: "tilemap.ROTATE" }',
	],
	[
		'let V_FLIP: any',
		'const V_FLIP: number & { readonly __brand: "tilemap.V_FLIP" }',
	],
];
