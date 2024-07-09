// @ts-check

/** vmath namespace @satisfies {(string | RegExp)[][]} */
export const vmathChanges = [
	[
		'function vector(t: any): any',
		'function vector(t: number[]): number & { [key: number]: number }',
	],
];
