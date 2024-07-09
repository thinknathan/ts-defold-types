// @ts-check

/** json namespace */
export const jsonChanges = [
	['let null$: any', 'let null$: null'],
	[
		'function decode(json: string, options?: any)',
		'function decode(json: string, options?: { decode_null_as_userdata: boolean })',
	],
	[
		'function encode(tbl: any, options?: any)',
		'function encode(tbl: any, options?: { encode_empty_table_as_object: boolean })',
	],
];
