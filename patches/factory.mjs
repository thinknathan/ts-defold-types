// @ts-check

/** factory namespace @satisfies {(string | RegExp)[][]} */
export const factory = [
	// Create Constant type
	[
		'',
		'type StatusConstant = number & { readonly __brand: "factory.STATUS" };',
	],
	// (greedy)
	[/let (STATUS_.+): any/g, 'const $1: StatusConstant'],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): StatusConstant',
	],
	// function load
	[
		'complete_function?: any',
		'complete_function?: (this: any, url: url, result: boolean) => void',
	],
	[
		'function set_prototype(url?: string | hash | url, prototype?: any)',
		'function set_prototype(url?: string | hash | url, prototype?: string)',
	],
];
