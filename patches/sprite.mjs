// @ts-check

/** sprite namespace @satisfies {(string | RegExp)[][]} */
export const sprite = [
	['let material: any', 'let material: hash'],
	['let frame_count: any', 'const frame_count: number'],
	['let image: any', 'let image: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let scale: any', 'let scale: vmath.vector3'],
	['let size: any', 'let size: vmath.vector3'],
	['let animation: any', 'let animation: hash'],
	['let cursor: any', 'let cursor: number'],
	['let slice: any', 'let slice: vmath.vector4'],
	// function play_flipbook
	[
		'play_properties?: any',
		'play_properties?: { offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: any, message_id: hash, message: { current_tile: number, id: hash }, sender: url) => void',
	],
	// Describe messages
	[
		'export type animation_done = "animation_done"',
		'export type animation_done = "animation_done"; export type animation_done_message = { current_tile: number, id: hash }',
	],
	[
		'export type play_animation = "play_animation"',
		'export type play_animation = "play_animation"; export type play_animation_message = { id: hash }',
	],
];
