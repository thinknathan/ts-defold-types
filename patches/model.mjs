// @ts-check

/** model namespace @satisfies {(string | RegExp)[][]} */
export const model = [
	['let material: any', 'let material: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let animation: any', 'let animation: hash'],
	['let cursor: any', 'let cursor: number'],
	// function play_anim
	[
		'play_properties?: any',
		'play_properties?: { blend_duration?: number, offset?: number, playback_rate?: number }',
	],
	['playback: any', 'playback: go.PlaybackConstant'],
	[
		'complete_function?: any',
		'complete_function?: (this: any, message_id: hash, message: { animation_id: hash, playback: go.PlaybackConstant }, sender: url) => void',
	],
	['let textureN: any', 'let textureN: hash'],
	// Describe message
	[
		'export type model_animation_done = "model_animation_done"',
		'export type model_animation_done = "model_animation_done"; export type model_animation_done_message = { animation_id: hash, playback: go.PlaybackConstant }',
	],
];
