/** camera namespace */
export const camera = [
	['let aspect_ratio: any', 'let aspect_ratio: number'],
	['let far_z: any', 'let far_z: number'],
	['let fov: any', 'let fov: number'],
	['let near_z: any', 'let near_z: number'],
	['let orthographic_zoom: any', 'let orthographic_zoom: number'],
	['let projection: any', 'const projection: Readonly<vmath.matrix4>'],
	['let view: any', 'const view: Readonly<vmath.matrix4>'],
	// Describe message
	[
		'export type set_camera = "set_camera"',
		'export type set_camera = "set_camera"; export type set_camera_message = { aspect_ratio?: number, fov?: number, near_z?: number, far_z?: number, orthographic_projection?: boolean, orthographic_zoom?: number }',
	],
];
