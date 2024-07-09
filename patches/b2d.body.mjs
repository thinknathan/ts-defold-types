// @ts-check

/** b2d.body namespace */
export const b2dBody = [
	[
		'function set_active(body: any, enable: any)',
		'function set_active(body: typeof b2d.body, enable: boolean)',
	],
	[
		'function set_awake(body: any, enable: any)',
		'function set_awake(body: typeof b2d.body, enable: boolean)',
	],
	[
		'function set_bullet(body: any, enable: any)',
		'function set_bullet(body: typeof b2d.body, enable: boolean)',
	],
	[
		'set_fixed_rotation(body: any, enable: any)',
		'set_fixed_rotation(body: typeof b2d.body, enable: boolean)',
	],
	[
		'function set_sleeping_allowed(body: any, enable: any)',
		'function set_sleeping_allowed(body: typeof b2d.body, enable: boolean)',
	],
	[
		'function set_type(body: any, type: any)',
		'function set_type(body: typeof b2d.body, type: typeof b2d.body.B2_DYNAMIC_BODY | typeof b2d.body.B2_KINEMATIC_BODY | typeof b2d.body.B2_STATIC_BODY)',
	],
	// (greedy)
	[
		/let (B2_.+): any/g,
		'const $1: number & { readonly _B2DBODY_: unique symbol }',
	],
	// (greedy)
	[/body: any/g, 'body: typeof b2d.body'],
];
