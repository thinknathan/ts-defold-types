// @ts-check

/** buffer namespace @satisfies {(string | RegExp)[][]} */
export const bufferChanges = [
	// (greedy)
	[
		/let (VALUE_TYPE_.+): any/g,
		'const $1: number & { readonly __brand: "buffer.VALUE_TYPE" }',
	],
	[
		'function create(element_count: number, declaration: any)',
		'function create(element_count: number, declaration: { hash: hash | string, type: typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_FLOAT32, count: number })',
	],
	[
		'function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[any, any, any, any]>',
		'function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[undefined | unknown[], undefined | typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_FLOAT32]>',
	],
	[
		'function set_metadata(buf: buffer, metadata_name: hash | string, values: any, value_type: any)',
		'function set_metadata(buf: buffer, metadata_name: hash | string, values: number[], value_type: typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_FLOAT32)',
	],
];
