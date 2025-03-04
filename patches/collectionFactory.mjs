// @ts-check

/** collectionFactory namespace @satisfies {(string | RegExp)[][]} */
export const collectionFactory = [
	// Create Constant type
	[
		'',
		'type StatusConstant = number & { readonly __brand: "collectionFactory.STATUS" };',
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
		'function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number | vmath.vector3): any',
		'function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number | vmath.vector3): LuaMap<hash, hash>',
	],
];
