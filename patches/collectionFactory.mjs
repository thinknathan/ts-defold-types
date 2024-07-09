// @ts-check

/** collectionFactory namespace */
export const collectionFactory = [
	// (greedy)
	[
		/let (STATUS_.+): any/g,
		'const $1: number & { readonly _STATUS_: unique symbol }',
	],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof collectionfactory.STATUS_UNLOADED | typeof collectionfactory.STATUS_LOADING | typeof collectionfactory.STATUS_LOADED',
	],
	// function load
	[
		'complete_function?: any',
		'complete_function?: (this: any, url: url, result: boolean) => void',
	],
	[
		'function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number): any',
		'function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number): LuaMap<hash, hash>',
	],
];
