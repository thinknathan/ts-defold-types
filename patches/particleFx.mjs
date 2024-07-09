// @ts-check

/** particlefx namespace @satisfies {(string | RegExp)[][]} */
export const particleFx = [
	// (greedy)
	[
		/let (EMITTER_STATE_.+): any/g,
		'const $1: number & { readonly _EMITTER_STATE_: unique symbol }',
	],
	// function play
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: any, id: hash, emitter: hash, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
	[
		'function stop(url: string | hash | url, options?: any)',
		'function stop(url: string | hash | url, options?: { clear: boolean })',
	],
];
