// @ts-check

/** particlefx namespace @satisfies {(string | RegExp)[][]} */
export const particleFx = [
	// Create Constant type
	[
		'',
		'export type EmitterStateConstant = number & { readonly __brand: "particlefx.EMITTER_STATE" };',
	],
	// (greedy)
	[/let (EMITTER_STATE_.+): any/g, 'const $1: EmitterStateConstant'],
	// function play
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: any, id: hash, emitter: hash, state: EmitterStateConstant) => void',
	],
	[
		'function stop(url: string | hash | url, options?: any)',
		'function stop(url: string | hash | url, options?: { clear: boolean })',
	],
];
