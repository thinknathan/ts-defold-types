// @ts-check

/** msg namespace */
export const msg = [
	[
		'export function post(receiver: string | url | hash, message_id: string | hash, message?: any): void',
		'export function post(receiver: hash | url | string, message_id: hash | string, message?: generic_message): void; export type generic_message = LuaMap<AnyNotNil, AnyNotNil> | { [key: string | number | symbol]: AnyNotNil }',
	],
];
