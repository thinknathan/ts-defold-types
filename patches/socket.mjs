// @ts-check

/** socket namespace @satisfies {(string | RegExp)[][]} */
export const socket = [
	['let _SETSIZE: any', 'const _SETSIZE: number'],
	['let _VERSION: any', 'const _VERSION: string'],
	[
		'newtry(finalizer: any): any',
		'newtry(finalizer: (...args: any[]) => unknown): (...args: any[]) => unknown',
	],
	[
		'protect(func: any): any',
		'protect(func: (...args: any[]) => unknown): (...args: any[]) => unknown',
	],
	// Remove duplicate function definition
	[
		'export function skip(d: number, ret1?: any, ret2?: any, retN?: any): any',
		'',
	],
	[
		'function skip(d: number, ret1?: any, ret2?: any, retN?: any): any',
		'function skip(d: number, ret1?: unknown, ret2?: unknown, retN?: unknown): LuaMultiReturn<[AnyNotNil | undefined, AnyNotNil | undefined, AnyNotNil | undefined]>',
	],
	[
		'function connect(address: string, port: number, locaddr?: string, locport?: number, family?: string): LuaMultiReturn<[any, any, string, any]>',
		'function connect(address: string, port: number, locaddr?: string, locport?: number, family?: "inet" | "inet6"): LuaMultiReturn<[socketclient | undefined, string | undefined]>',
	],
	[
		'function select(recvt: any, sendt: any, timeout?: number): LuaMultiReturn<[any, any, string, any]>',
		'function select(recvt: any[], sendt: any[], timeout?: number): LuaMultiReturn<[unknown[], unknown[], string | undefined]>',
	],
	[
		'function tcp(): LuaMultiReturn<[any, any, string, any]>',
		'function tcp(): LuaMultiReturn<[socketmaster | undefined, string | undefined]>',
	],
	[
		'function tcp6(): LuaMultiReturn<[any, any, string, any]>',
		'function tcp6(): LuaMultiReturn<[socketmaster | undefined, string | undefined]>',
	],
	[
		'function udp(): LuaMultiReturn<[any, any, string, any]>',
		'function udp(): LuaMultiReturn<[socketunconnected | undefined, string | undefined]>',
	],
	[
		'function udp6(): LuaMultiReturn<[any, any, string, any]>',
		'function udp6(): LuaMultiReturn<[socketunconnected | undefined, string | undefined]>',
	],
];
