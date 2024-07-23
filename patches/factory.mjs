// @ts-check

/** factory namespace @satisfies {(string | RegExp)[][]} */
export const factory = [
	// (greedy)
	[
		/let (STATUS_.+): any/g,
		'const $1: number & { readonly __brand: "factory.STATUS" }',
	],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof factory.STATUS_UNLOADED | typeof factory.STATUS_LOADING | typeof factory.STATUS_LOADED',
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
