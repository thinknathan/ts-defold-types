// @ts-check

/** b2d.body namespace @satisfies {(string | RegExp)[][]} */
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
		'function set_type(body: typeof b2d.body, type: Constant)',
	],
	// Create Constant type
	['', 'type Constant = number & { readonly __brand: "b2d.body.B2" };'],
	// (greedy)
	[/let (B2_.+): any/g, 'const $1: Constant'],
	// (greedy)
	[/body: any/g, 'body: typeof b2d.body'],
];
