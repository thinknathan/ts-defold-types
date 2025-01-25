// @ts-check

/** liveupdate namespace @satisfies {(string | RegExp)[][]} */
export const liveupdate = [
	// Create Constant type
	[
		'',
		'type LiveUpdateConstant = number & { readonly __brand: "liveupdate.CONSTANT" };',
	],
	[
		'function add_mount(name: string, uri: string, priority: any, callback: any): number',
		'function add_mount(name: string, uri: string, priority: number, callback?: (this: any) => void): LiveUpdateConstant',
	],
	[
		'function get_mounts(): any',
		`function get_mounts(): { name: string,
    uri: string,
    priority: number}[]`,
	],
	[
		'function is_using_liveupdate_data(): any',
		'function is_using_liveupdate_data(): boolean',
	],
	[
		'function remove_mount(name: string): number',
		'function remove_mount(name: string): LiveUpdateConstant',
	],
	[
		'function store_archive(path: string, callback: any, options?: any)',
		`function store_archive(
		path: string,
		callback: (this: any, status: LiveUpdateConstant) => void,
		options?: {verify: boolean},
	)`,
	],
	[
		'function store_manifest(manifest_buffer: string, callback: any)',
		'function store_manifest(manifest_buffer: string, callback: (this: any, status: LiveUpdateConstant) => void)',
	],
	[
		'function store_resource(manifest_reference: number, data: string, hexdigest: string, callback: any)',
		`function store_resource(
		manifest_reference: number,
		data: string,
		hexdigest: string,
		callback: (this: any, hexdigest: string, status: boolean) => void,
	)`,
	],
	// (greedy)
	[/let (LIVEUPDATE_.+): any/g, 'const $1: LiveUpdateConstant'],
];
