// @ts-check

/** physics namespace @satisfies {(string | RegExp)[][]} */
export const physics = [
	['let angular_damping: any', 'let angular_damping: number'],
	['let angular_velocity: any', 'let angular_velocity: vmath.vector3'],
	['let linear_damping: any', 'let linear_damping: number'],
	['let linear_velocity: any', 'let linear_velocity: vmath.vector3'],
	['let mass: any', 'const mass: number'],
	[
		'function set_listener(callback: any',
		'function set_listener(callback: (this: any, event: contact_point_event | collision_event | trigger_event | ray_cast_response | ray_cast_missed, data: object) => void',
	],
	[
		'function get_shape(url: string | hash | url, shape: string | hash): any',
		`function get_shape(url: hash | url | string, shape: hash | string): { type: ShapeTypeConstant, diameter?: number, dimensions?: vmath.vector3, height?: number };
		export type SHAPE_TYPE_SPHERE = ShapeTypeConstant;
		export type SHAPE_TYPE_BOX = ShapeTypeConstant;
		/** 3D Physics Only */
		export type SHAPE_TYPE_CAPSULE = ShapeTypeConstant;
		export type SHAPE_TYPE_HULL = ShapeTypeConstant;`,
	],
	// Create Constant type
	[
		'',
		'export type JointTypeConstant = number & { readonly __brand: "physics.JOINT_TYPE" };',
	],
	// Create Constant type
	[
		'',
		'export type ShapeTypeConstant = number & { readonly __brand: "physics.SHAPE_TYPE" };',
	],
	// (greedy)
	[/let (JOINT_TYPE.+): any/g, 'const $1: JointTypeConstant'],
	// (greedy)
	[/let (SHAPE_TYPE.+): any/g, 'const $1: ShapeTypeConstant'],
	[
		// function create_joint
		'properties?: any',
		'properties?: { [key: string]: boolean | number }',
	],
	[
		'function set_group(url: string | hash | url, group: string): void',
		'function set_group(url: hash | url | string, group: hash | string): void',
	],
	[
		'function set_maskbit(url: string | hash | url, group: string, maskbit: boolean): void',
		'function set_maskbit(url: hash | url | string, group: hash | string, maskbit: boolean): void',
	],
	[
		'function raycast(from: vmath.vector3, to: vmath.vector3, groups: any, options?: any): LuaMultiReturn<[any, any]>',
		'function raycast(from: vmath.vector3, to: vmath.vector3, groups: hash[], options?: { all: boolean }): undefined | physics.ray_cast_response_message[]',
	],
	[
		'function raycast_async(from: vmath.vector3, to: vmath.vector3, groups: any, request_id?: number)',
		'function raycast_async(from: vmath.vector3, to: vmath.vector3, groups: hash[], request_id?: number)',
	],
	[
		'function get_joint_reaction_torque(collisionobject: string | hash | url, joint_id: string | hash): any',
		'function get_joint_reaction_torque(collisionobject: string | hash | url, joint_id: string | hash): number',
	],
	// Describe ray cast message
	[
		'export type ray_cast_response = "ray_cast_response"',
		'export type ray_cast_response = "ray_cast_response";export type ray_cast_response_message = { fraction: number, position: vmath.vector3, normal: vmath.vector3, id: hash, group: hash, request_id: number }',
	],
	// Describe ray cast missed message
	[
		'export type ray_cast_missed = "ray_cast_missed"',
		'export type ray_cast_missed = "ray_cast_missed";export type ray_cast_missed_message = { request_id: number }',
	],
	// Describe trigger response message
	[
		'export type trigger_response = "trigger_response"',
		'export type trigger_response = "trigger_response";export type trigger_response_message = { other_id: hash, enter: boolean, other_group: hash, own_group: hash }',
	],
	// Describe contact point reponse message
	[
		'export type contact_point_response = "contact_point_response"',
		'export type contact_point_response = "contact_point_response";export type contact_point_response_message = { position: vmath.vector3, normal: vmath.vector3, relative_velocity: vmath.vector3, distance: number, applied_impulse: number, life_time: number, mass: number, other_mass: number, other_id: hash, other_position: vmath.vector3, other_group: hash, own_group: hash }',
	],
	// Describe collision response message
	[
		'export type collision_response = "collision_response"',
		'export type collision_response = "collision_response";export type collision_response_message = { other_id: hash, other_position: vmath.vector3, other_group: hash, own_group: hash }',
	],
	// Describe apply force message
	[
		'export type apply_force = "apply_force"',
		'export type apply_force = "apply_force";export type apply_force_message = { force: vmath.vector3, position: vmath.vector3 }',
	],
];
