// @ts-check

/** Late changes that don't fit anywhere else @satisfies {(string | RegExp)[][]} */
export const finalChanges = [
	// Replace `any` keyword with `unknown` in return values (greedy)
	[/\): any/g, '): AnyNotNil | undefined'],
	[/=> any/g, '=> AnyNotNil | undefined'],
	// Replace generic tables (greedy)
	[/tbl: any/g, 'tbl: AnyNotNil'],
	[/table: any/g, 'table: AnyNotNil'],
	// Replace @return with @returns (greedy)
	[/@return /g, '@returns '],
	// Change uppercase variables to const (greedy)
	[/let (?:\b|\W)([A-Z0-9_]+)(?:\b|\W)/g, 'const $1'],
];
