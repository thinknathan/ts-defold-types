// @ts-check

/** types namespace @satisfies {(string | RegExp)[][]} */
export const types = [
	[/var: any/g, 'v: any'],
	['is_hash(v: any): boolean', 'is_hash(v: any): v is hash'],
	['is_matrix4(v: any): boolean', 'is_matrix4(v: any): v is vmath.matrix4'],
	['is_quat(v: any): boolean', 'is_quat(v: any): v is vmath.quaternion'],
	['is_url(v: any): boolean', 'is_url(v: any): v is url'],
	[
		'is_vector(v: any): boolean',
		'is_vector(v: any): v is ReturnType<typeof vmath.vector>',
	],
	['is_vector3(v: any): boolean', 'is_vector3(v: any): v is vmath.vector3'],
	['is_vector4(v: any): boolean', 'is_vector4(v: any): v is vmath.vector4'],
];
