// @ts-check

/** sys namespace */
export const sys = [
	// (greedy)
	[
		/let (NETWORK_.+): any/g,
		'const $1: number & { readonly _NETWORK_: unique symbol }',
	],
	// greedy
	[
		/let (REQUEST_.+): any/g,
		'const $1: number & { readonly _REQUEST_: unique symbol }',
	],
	[
		'function load_buffer_async(path: string, status_callback: any)',
		'function load_buffer_async(path: string, status_callback: (this: any, request_id: unknown, result: { status: typeof REQUEST_STATUS_FINISHED | typeof REQUEST_STATUS_ERROR_IO_ERROR | typeof REQUEST_STATUS_ERROR_NOT_FOUND, buffer: buffer | undefined }) => void)',
	],
	[
		'function exists(path: string): any',
		'function exists(path: string): boolean',
	],
	[
		'function get_config_int(key: string, default_value?: any): any',
		'function get_config_int(key: string, default_value?: number): number',
	],
	[
		'function get_connectivity(): any',
		'function get_connectivity(): typeof sys.NETWORK_DISCONNECTED | typeof sys.NETWORK_CONNECTED_CELLULAR | typeof sys.NETWORK_CONNECTED',
	],
	[
		'function get_engine_info(): any',
		'function get_engine_info(): { version: string, version_sha1: string, is_debug: boolean }',
	],
	[
		'function load(filename: string): any',
		'function load(filename: string): LuaMap<AnyNotNil, unknown>',
	],
	[
		'function set_error_handler(error_handler: any',
		'function set_error_handler(error_handler: (source: string, message: string, traceback: string) => void',
	],
	[
		'function get_application_info(app_string: string): any',
		'function get_application_info(app_string: string): { installed: boolean }',
	],
	[
		'function open_url(url: string, attributes?: any)',
		'function open_url(url: string, attributes?: { target?: "_self" | "_blank" | "_parent" | "_top" | string })',
	],
	// Remove overloaded function
	['export function load_resource(filename: string): any', ''],
	[
		'function load_resource(filename: string): string',
		'function load_resource(filename: string): LuaMultiReturn<[string| undefined, string | undefined]>',
	],
	[
		'function get_sys_info(options?: any): any',
		'function get_sys_info(options?: { ignore_secure: boolean }): { device_model?: string, manufacturer?: string, system_name: string, system_version: string, api_version: string, language: string, device_language: string, territory: string, gmt_offset: number, device_ident?: string, user_agent: string }',
	],
	[
		'function get_ifaddrs(): any',
		'function get_ifaddrs(): { name: string, address: string | undefined, mac: string | undefined, up: boolean, running: boolean }[]',
	],
	// Describe messages
	[
		'export type exit = "exit"',
		'export type exit = "exit"; export type exit_message = { code: number }',
	],
	[
		'export type reboot = "reboot"',
		'export type reboot = "reboot"; export type reboot_message = { arg1?: string, arg2?: string, arg3?: string, arg4?: string, arg5?: string, arg6?: string }',
	],
	[
		'export type set_update_frequency = "set_update_frequency"',
		'export type set_update_frequency = "set_update_frequency"; export type set_update_frequency_message = { frequency: number }',
	],
	[
		'export type set_vsync = "set_vsync"',
		'export type set_vsync = "set_vsync"; export type set_vsync_message = { swap_interval: number }',
	],
	[
		'export type start_record = "start_record"',
		'export type start_record = "start_record"; export type start_record_message = { file_name: string, frame_period?: number, fps?: number }',
	],
	[
		'function reboot(arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6: string): void',
		'function reboot(arg1?: string, arg2?: string, arg3?: string, arg4?: string, arg5?: string, arg6?: string): void',
	],
];
