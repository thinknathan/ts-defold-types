// @ts-check

/** buffer namespace @satisfies {(string | RegExp)[][]} */
export const bufferChanges = [
	// Create Constant type
	[
		'',
		'type ValueConstant = number & { readonly __brand: "buffer.VALUE_TYPE" };',
	],
	// (greedy)
	[/let (VALUE_TYPE_.+): any/g, 'const $1: ValueConstant'],
	[
		'function create(element_count: number, declaration: any)',
		'function create(element_count: number, declaration: { hash: hash | string, type: ValueConstant, count: number })',
	],
	[
		'function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[any, any, any, any]>',
		'function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[undefined | unknown[], undefined | ValueConstant]>',
	],
	[
		'function set_metadata(buf: buffer, metadata_name: hash | string, values: any, value_type: any)',
		'function set_metadata(buf: buffer, metadata_name: hash | string, values: number[], value_type: ValueConstant)',
	],
];
