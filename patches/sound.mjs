/** sound namespace */
export const sound = [
	['let sound: any', 'let sound: hash'],
	['let gain: any', 'let gain: number'],
	['let pan: any', 'let pan: number'],
	['let speed: any', 'let speed: number'],
	// function play
	[
		'play_properties?: any',
		'play_properties?: { delay?: number, gain?: number, pan?: number, speed?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: any, message_id: hash, message: { play_id: number }, sender: url) => void',
	],
	[
		'function pause(url: string | hash | url, pause: any)',
		'function pause(url: string | hash | url, pause?: boolean)',
	],
	['function get_groups(): any', 'function get_groups(): hash[]'],
	// Describe messages
	[
		'export type play_sound = "play_sound"',
		'export type play_sound = "play_sound"; export type play_sound_message = { delay?: number, gain?: number, play_id?: number }',
	],
	[
		'export type set_gain = "set_gain"',
		'export type set_gain = "set_gain"; export type set_gain_message = { gain: number }',
	],
	[
		'export type sound_done = "sound_done"',
		'export type sound_done = "sound_done"; export type sound_done_message = { play_id: number }',
	],
	[
		'export type sound_stopped = "sound_stopped"',
		'export type sound_stopped = "sound_stopped"; export type sound_stopped_message = { play_id: number }',
	],
	[
		'function stop(url: string | hash | url, stop_properties?: any)',
		'function stop(url: string | hash | url, stop_properties?: { play_id: ReturnType<typeof play> })',
	],
];
