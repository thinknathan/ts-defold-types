/**
 * Automatically make opinionated changes to the output of `type-gen`.
 * Uses arrays of data pairs ['findThis', 'replaceWithThis']
 * Ultimately uses `String.replace`, which accepts either strings or regex.
 */

const fs = require('fs');
const filePath = 'index.d.ts';

/** Initial generic changes */
const earlyChanges = [
	// Describe `url`
	[
		'declare type url = {\n}',
		`/**
			* A reference to game resources, such as game objects, components, and assets.
			*/
			declare type url = {
				socket: hash;
				path: hash;
				fragment: hash | undefined;
			};`,
	],
	// Describe `hash`
	[
		'declare type hash = {\n}',
		`/**
			* A unique identifier used to reference resources, messages, properties, and other entities within the game.
			*/
			declare type hash = Readonly<LuaUserdata &
			{
				readonly __hash__: unique symbol;
			}>;`,
	],
	// Describe `node`
	[
		'declare type node = {\n}',
		`declare type node = Readonly<LuaUserdata &
	{
		readonly __node__: unique symbol;
	}>;`,
	],
	// Describe `buffer`
	// Also add some new types!
	[
		'declare type buffer = {\n}',
		`/**
			* A block of memory that can store binary data.
			*/
			declare type buffer = object;

			/**
			 * Render pipeline predicate.
			 */
			declare type predicate = Readonly<LuaUserdata &
			{
				readonly __predicate__: unique symbol;
			}>;

			/**
			 * Render pipeline target.
			 */
			declare type rendertarget = Readonly<LuaUserdata &
			{
				readonly __rendertarget__: unique symbol;
			}>;

			/**
			 * Socket objects.
			 */
			declare type socketclient = object;
			declare type socketmaster = object;
			declare type socketunconnected = object;
			`,
	],
	// Remove {}
	[
		'declare type bufferstream = Array<number> & LuaUserdata & {\n}',
		'declare type bufferstream = number[] & LuaUserdata & object',
	],
	// Pretty print
	['function pprint(v: any)', 'function pprint(...args: unknown[])'],
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
];

/** socket namespace */
const socket = [
	['let _SETSIZE: any', 'const _SETSIZE: number'],
	['let _VERSION: any', 'const _VERSION: string'],
	[
		'newtry(finalizer: any): any',
		'newtry(finalizer: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown',
	],
	[
		'protect(func: any): any',
		'protect(func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown',
	],
	// Remove duplicate function definition
	[
		'export function skip(d: number, ret1?: any, ret2?: any, retN?: any): any',
		'',
	],
	[
		'function skip(d: number, ret1?: any, ret2?: any, retN?: any): any',
		'function skip(d: number, ret1?: unknown, ret2?: unknown, retN?: unknown): LuaMultiReturn<[unknown | undefined, unknown | undefined, unknown | undefined]>',
	],
	[
		'function connect(address: string, port: number, locaddr?: string, locport?: number, family?: string): LuaMultiReturn<[any, any, string, any]>',
		'function connect(address: string, port: number, locaddr?: string, locport?: number, family?: "inet" | "inet6"): LuaMultiReturn<[socketclient | undefined, string | undefined]>',
	],
	[
		'function select(recvt: any, sendt: any, timeout?: number): LuaMultiReturn<[any, any, string, any]>',
		'function select(recvt: unknown[], sendt: unknown[], timeout?: number): LuaMultiReturn<[unknown[], unknown[], string | undefined]>',
	],
	[
		'function tcp(): LuaMultiReturn<[any, any, string, any]>',
		'function tcp(): LuaMultiReturn<[socketmaster | undefined, string | undefined]>',
	],
	[
		'function tcp6(): LuaMultiReturn<[any, any, string, any]>',
		'function tcp6(): LuaMultiReturn<[socketmaster | undefined, string | undefined]>',
	],
	[
		'function udp(): LuaMultiReturn<[any, any, string, any]>',
		'function udp(): LuaMultiReturn<[socketunconnected | undefined, string | unknown]>',
	],
	[
		'function udp6(): LuaMultiReturn<[any, any, string, any]>',
		'function udp6(): LuaMultiReturn<[socketunconnected | undefined, string | unknown]>',
	],
];

/** crash namespace */
const crash = [
	// (greedy)
	[
		/let (SYSFIELD_.+): any/g,
		'const $1: number & { readonly _SYSFIELD_: unique symbol }',
	],
	// (greedy)
	[
		/let (USERFIELD_.+): any/g,
		'const $1: number & { readonly _USERFIELD_: unique symbol }',
	],
	[
		'get_sys_field(handle: number, index: number): LuaMultiReturn<[string, any]>',
		'get_sys_field(handle: number, index: number): undefined | string',
	],
	[
		'function load_previous(): LuaMultiReturn<[number, any]>',
		'function load_previous(): undefined | number',
	],
	[
		'function get_modules(handle: number): any',
		'function get_modules(handle: number): { name: unknown; address: unknown }[]',
	],
];

/** go namespace */
const go = [
	['let euler: any', 'let euler: vmath.vector3'],
	['let position: any', 'let position: vmath.vector3'],
	['let rotation: any', 'let rotation: vmath.quaternion'],
	['let scale: any', 'let scale: number'],
	// (greedy)
	[
		/let (EASING_.+): any/g,
		'const $1: number & { readonly _EASING_: unique symbol }',
	],
	// (greedy)
	[
		/let (PLAYBACK_.+): any/g,
		'const $1: number & { readonly _PLAYBACK_: unique symbol }',
	],
	[
		'function delete$(id?: any, recursive?: boolean)',
		'function delete$(id?: string | hash | url | Array<string | hash | url>, recursive?: boolean)',
	],
	// function animate
	[
		'playback: any,',
		'playback: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG,',
	],
	[
		'easing: any',
		'easing: vmath.vector3|typeof go.EASING_INBACK|typeof go.EASING_INBOUNCE|typeof go.EASING_INCIRC|typeof go.EASING_INCUBIC|typeof go.EASING_INELASTIC|typeof go.EASING_INEXPO|typeof go.EASING_INOUTBACK|typeof go.EASING_INOUTBOUNCE|typeof go.EASING_INOUTCIRC|typeof go.EASING_INOUTCUBIC|typeof go.EASING_INOUTELASTIC|typeof go.EASING_INOUTEXPO|typeof go.EASING_INOUTQUAD|typeof go.EASING_INOUTQUART|typeof go.EASING_INOUTQUINT|typeof go.EASING_INOUTSINE|typeof go.EASING_INQUAD|typeof go.EASING_INQUART|typeof go.EASING_INQUINT|typeof go.EASING_INSINE|typeof go.EASING_LINEAR|typeof go.EASING_OUTBACK|typeof go.EASING_OUTBOUNCE|typeof go.EASING_OUTCIRC|typeof go.EASING_OUTCUBIC|typeof go.EASING_OUTELASTIC|typeof go.EASING_OUTEXPO|typeof go.EASING_OUTINBACK|typeof go.EASING_OUTINBOUNCE|typeof go.EASING_OUTINCIRC|typeof go.EASING_OUTINCUBIC|typeof go.EASING_OUTINELASTIC|typeof go.EASING_OUTINEXPO|typeof go.EASING_OUTINQUAD|typeof go.EASING_OUTINQUART|typeof go.EASING_OUTINQUINT|typeof go.EASING_OUTINSINE|typeof go.EASING_OUTQUAD|typeof go.EASING_OUTQUART|typeof go.EASING_OUTQUINT|typeof go.EASING_OUTSINE',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, url: url, property: hash) => void',
	],
	[
		'function exists(url: string | hash | url): any',
		'function exists(url: string | hash | url): boolean',
	],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
	[
		'function get_parent(id?: string | hash | url): LuaMultiReturn<[hash, any]>',
		'function get_parent(id?: string | hash | url): hash | undefined',
	],
	// Describe input message
	[
		'export type acquire_input_focus = "acquire_input_focus"',
		'export type acquire_input_focus = "acquire_input_focus"; export type touch_input = { id: number, pressed: boolean, released: boolean, tap_count: number, x: number, y: number, dx: number, dy: number, acc_x?: number, acc_y?: number, acc_z?: number };export type input_message = { value?: number, pressed?: boolean, released?: boolean, repeated?: boolean, x?: number, y?: number, screen_x?: number, screen_y?: number, dx?: number, dy?: number, screen_dx?: number, screen_dy?: number, gamepad?: number, touch?: touch_input[] }',
	],
	// Describe set parent message
	[
		'export type set_parent = "set_parent"',
		'export type set_parent = "set_parent"; export type set_parent_message = { parent_id: hash, keep_world_transform?: number }',
	],
];

/** gui namespace */
const gui = [
	['let material: any', 'let material: hash'],
	['let fonts: any', 'let fonts: hash'],
	// (greedy)
	[
		/let (EASING_.+): any/g,
		'const $1: number & { readonly _EASING_: unique symbol }',
	],
	// (greedy)
	[
		/let (PLAYBACK_.+): any/g,
		'const $1: number & { readonly _PLAYBACK_: unique symbol }',
	],
	// (greedy)
	[
		/let (ADJUST_.+): any/g,
		'const $1: number & { readonly _ADJUST_: unique symbol }',
	],
	// (greedy)
	[
		/let (ANCHOR_.+): any/g,
		'const $1: number & { readonly _ANCHOR_: unique symbol }',
	],
	// (greedy)
	[
		/let (BLEND_.+): any/g,
		'const $1: number & { readonly _BLEND_: unique symbol }',
	],
	// (greedy)
	[
		/let (CLIPPING_MODE_.+): any/g,
		'const $1: number & { readonly _CLIPPING_MODE_: unique symbol }',
	],
	// (greedy)
	[
		/let (KEYBOARD_TYPE_.+): any/g,
		'const $1: number & { readonly _KEYBOARD_TYPE_: unique symbol }',
	],
	// (greedy)
	[
		/let (PIEBOUNDS_.+): any/g,
		'const $1: number & { readonly _PIEBOUNDS_: unique symbol }',
	],
	// (greedy)
	[
		/let (PIVOT_.+): any/g,
		'const $1: number & { readonly _PIVOT_: unique symbol }',
	],
	// (greedy)
	[
		/let (PROP_.+): any/g,
		'const $1: string & { readonly _PROP_: unique symbol }',
	],
	// (greedy)
	[
		/let (RESULT_.+): any/g,
		'const $1: number & { readonly _RESULT_: unique symbol }',
	],
	// (greedy)
	[
		/let (SIZE_MODE_.+): any/g,
		'const $1: number & { readonly _SIZE_MODE_: unique symbol }',
	],
	// function animate
	[
		'property: any',
		'property: typeof gui.PROP_POSITION | typeof gui.PROP_ROTATION | typeof gui.PROP_SCALE | typeof gui.PROP_COLOR | typeof gui.PROP_OUTLINE | typeof gui.PROP_SHADOW | typeof gui.PROP_SIZE | typeof gui.PROP_FILL_ANGLE | typeof gui.PROP_INNER_RADIUS | typeof gui.PROP_SLICE9',
	],
	[
		'easing: any',
		'easing: vmath.vector3|typeof gui.EASING_INBACK|typeof gui.EASING_INBOUNCE|typeof gui.EASING_INCIRC|typeof gui.EASING_INCUBIC|typeof gui.EASING_INELASTIC|typeof gui.EASING_INEXPO|typeof gui.EASING_INOUTBACK|typeof gui.EASING_INOUTBOUNCE|typeof gui.EASING_INOUTCIRC|typeof gui.EASING_INOUTCUBIC|typeof gui.EASING_INOUTELASTIC|typeof gui.EASING_INOUTEXPO|typeof gui.EASING_INOUTQUAD|typeof gui.EASING_INOUTQUART|typeof gui.EASING_INOUTQUINT|typeof gui.EASING_INOUTSINE|typeof gui.EASING_INQUAD|typeof gui.EASING_INQUART|typeof gui.EASING_INQUINT|typeof gui.EASING_INSINE|typeof gui.EASING_LINEAR|typeof gui.EASING_OUTBACK|typeof gui.EASING_OUTBOUNCE|typeof gui.EASING_OUTCIRC|typeof gui.EASING_OUTCUBIC|typeof gui.EASING_OUTELASTIC|typeof gui.EASING_OUTEXPO|typeof gui.EASING_OUTINBACK|typeof gui.EASING_OUTINBOUNCE|typeof gui.EASING_OUTINCIRC|typeof gui.EASING_OUTINCUBIC|typeof gui.EASING_OUTINELASTIC|typeof gui.EASING_OUTINEXPO|typeof gui.EASING_OUTINQUAD|typeof gui.EASING_OUTINQUART|typeof gui.EASING_OUTINQUINT|typeof gui.EASING_OUTINSINE|typeof gui.EASING_OUTQUAD|typeof gui.EASING_OUTQUART|typeof gui.EASING_OUTQUINT|typeof gui.EASING_OUTSINE',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, node: node) => void',
	],
	[
		'playback?: any',
		'playback?: typeof gui.PLAYBACK_ONCE_FORWARD | typeof gui.PLAYBACK_ONCE_BACKWARD | typeof gui.PLAYBACK_ONCE_PINGPONG | typeof gui.PLAYBACK_LOOP_FORWARD | typeof gui.PLAYBACK_LOOP_BACKWARD | typeof gui.PLAYBACK_LOOP_PINGPONG',
	],
	[
		'function get_adjust_mode(node: node): any',
		'function get_adjust_mode(node: node): typeof gui.ADJUST_FIT | typeof gui.ADJUST_ZOOM | typeof gui.ADJUST_STRETCH',
	],
	[
		'function get_blend_mode(node: node): any',
		'function get_blend_mode(node: node): typeof gui.BLEND_ALPHA | typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_MULT ',
	],
	[
		'function get_clipping_mode(node: node): any',
		'function get_clipping_mode(node: node): typeof gui.CLIPPING_MODE_NONE | typeof gui.CLIPPING_MODE_STENCIL',
	],
	[
		'function get_outer_bounds(node: node): any',
		'function get_outer_bounds(node: node): typeof gui.PIEBOUNDS_RECTANGLE | typeof gui.PIEBOUNDS_ELLIPSE',
	],
	[
		'function get_pivot(node: node): any',
		'function get_pivot(node: node): typeof gui.PIVOT_CENTER | typeof gui.PIVOT_N | typeof gui.PIVOT_NE | typeof gui.PIVOT_E | typeof gui.PIVOT_SE | typeof gui.PIVOT_S | typeof gui.PIVOT_SW | typeof gui.PIVOT_W | typeof gui.PIVOT_NW',
	],
	[
		'function get_size_mode(node: node): any',
		'function get_size_mode(node: node): typeof gui.SIZE_MODE_MANUAL | typeof gui.SIZE_MODE_AUTO',
	],
	[
		'function get_xanchor(node: node): any',
		'function get_xanchor(node: node): typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT',
	],
	[
		'function get_yanchor(node: node): any',
		'function get_yanchor(node: node): typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT',
	],
	[
		'function set_xanchor(node: node, anchor: any)',
		'function set_xanchor(node: node, anchor: typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT)',
	],
	[
		'function set_yanchor(node: node, anchor: any)',
		'function set_yanchor(node: node, anchor: typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_RIGHT)',
	],
	[
		'function show_keyboard(type: any',
		'function show_keyboard(type: typeof gui.KEYBOARD_TYPE_DEFAULT | typeof gui.KEYBOARD_TYPE_EMAIL | typeof gui.KEYBOARD_TYPE_NUMBER_PAD | typeof gui.KEYBOARD_TYPE_PASSWORD',
	],
	[
		'function move_below(node: node, reference: any)',
		'function move_below(node: node, reference: node)',
	],
	[
		'function move_above(node: node, reference: any)',
		'function move_above(node: node, reference: node)',
	],
	['let materials: any', 'let materials: hash'],
	['let textures: any', 'let textures: hash'],
	[
		'function set_adjust_mode(node: node, adjust_mode: any)',
		'function set_adjust_mode(node: node, adjust_mode: typeof gui.ADJUST_FIT | typeof gui.ADJUST_ZOOM | typeof gui.ADJUST_STRETCH)',
	],
	[
		'function set_blend_mode(node: node, blend_mode: any)',
		'function set_blend_mode(node: node, blend_mode: typeof gui.BLEND_ALPHA | typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_MULT)',
	],
	[
		'function set_clipping_mode(node: node, clipping_mode: any)',
		'function set_clipping_mode(node: node, clipping_mode: typeof gui.CLIPPING_MODE_NONE | typeof gui.CLIPPING_MODE_STENCIL)',
	],
	[
		'function set_outer_bounds(node: node, bounds_mode: any)',
		'function set_outer_bounds(node: node, bounds_mode: typeof gui.PIEBOUNDS_RECTANGLE | typeof gui.PIEBOUNDS_ELLIPSE)',
	],
	[
		'function set_pivot(node: node, pivot: any)',
		'function set_pivot(node: node, pivot: typeof gui.PIVOT_CENTER | typeof gui.PIVOT_N | typeof gui.PIVOT_NE | typeof gui.PIVOT_E | typeof gui.PIVOT_SE | typeof gui.PIVOT_S | typeof gui.PIVOT_SW | typeof gui.PIVOT_W | typeof gui.PIVOT_NW)',
	],
	[
		'function set_size_mode(node: node, size_mode: any)',
		'function set_size_mode(node: node, size_mode: typeof gui.SIZE_MODE_MANUAL | typeof gui.SIZE_MODE_AUTO)',
	],
	// function play_particlefx
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: unknown, node: node | undefined, emitter: hash, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
	// function play_flipbook
	[
		'play_properties?: any',
		'play_properties?: { offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, node: node) => void',
	],
	[
		'function new_texture(texture: string | hash, width: number, height: number, type: any, buffer: string, flip: boolean): LuaMultiReturn<[boolean, number]>',
		'function new_texture(texture: string | hash, width: number, height: number, type: "rgb" | "rgba" | "l", buffer: string, flip: boolean): LuaMultiReturn<[boolean, undefined | typeof gui.RESULT_TEXTURE_ALREADY_EXISTS | typeof gui.RESULT_DATA_ERROR | typeof gui.RESULT_OUT_OF_RESOURCES]>',
	],
	[
		'function cancel_animation(node: node, property: any)',
		'function cancel_animation(node: node, property: "position" | "rotation" | "scale" | "color" | "outline" | "shadow" | "size" | "fill_angle" | "inner_radius" | "slice9")',
	],
	[
		'function get_parent(node: node): LuaMultiReturn<[node, any]>',
		'function get_parent(node: node): node | undefined',
	],
	[
		'function stop_particlefx(node: node, options: any)',
		'function stop_particlefx(node: node, options?: { clear: boolean })',
	],
	// function set_texture_data
	['type: any', 'type: "rgb" | "rgba" | "l"'],
	// Describe layout changed message
	[
		'export type layout_changed = "layout_changed"',
		'export type layout_changed = "layout_changed"; export type layout_changed_message = { id: hash, previous_id: hash }',
	],
];

/** physics namespace */
const physics = [
	['let angular_damping: any', 'let angular_damping: number'],
	['let angular_velocity: any', 'let angular_velocity: vmath.vector3'],
	['let linear_damping: any', 'let linear_damping: number'],
	['let linear_velocity: any', 'let linear_velocity: vmath.vector3'],
	['let mass: any', 'const mass: number'],
	// (greedy)
	[
		/let (JOINT_TYPE.+): any/g,
		'const $1: number & { readonly _JOINT_TYPE_: unique symbol }',
	],
	// function create_joint
	['properties?: any', 'properties?: { [key: string]: boolean | number }'],
	[
		'function raycast(from: vmath.vector3, to: vmath.vector3, groups: any, options: any): LuaMultiReturn<[any, any]>',
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

/** profiler namespace */
const profiler = [
	// (greedy)
	[
		/let (MODE_.+): any/g,
		'const $1: number & { readonly _MODE_: unique symbol }',
	],
	// (greedy)
	[
		/let (VIEW_MODE_.+): any/g,
		'const $1: number & { readonly _VIEW_MODE_: unique symbol }',
	],
	[
		'function set_ui_mode(mode: any',
		'function set_ui_mode(mode: typeof profiler.MODE_RUN | typeof profiler.MODE_PAUSE | typeof profiler.MODE_SHOW_PEAK_FRAME | typeof profiler.MODE_RECORD',
	],
	[
		'function set_ui_view_mode(mode: any',
		'function set_ui_view_mode(mode: typeof profiler.VIEW_MODE_FULL | typeof profiler.VIEW_MODE_MINIMIZED',
	],
	[
		'function view_recorded_frame(frame_index: any)',
		'function view_recorded_frame(frame_index: { distance?: number, frame?: number })',
	],
];

/** render namespace */
const render = [
	// (greedy)
	[
		/let (BLEND_.+): any/g,
		'const $1: number & { readonly _BLEND_: unique symbol }',
	],
	// (greedy)
	[
		/let (BUFFER_.+): any/g,
		'const $1: number & { readonly _BUFFER_: unique symbol }',
	],
	// (greedy)
	[
		/let (COMPARE_FUNC_.+): any/g,
		'const $1: number & { readonly _COMPARE_FUNC_: unique symbol }',
	],
	// (greedy)
	[
		/let (FACE_.+): any/g,
		'const $1: number & { readonly _FACE_: unique symbol }',
	],
	// (greedy)
	[
		/let (FILTER_.+): any/g,
		'const $1: number & { readonly _FILTER_: unique symbol }',
	],
	// (greedy)
	[/(render_target): any/g, '$1: rendertarget'],
	[
		'let FORMAT_R16F: any',
		'const FORMAT_R16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_R32F: any',
		'const FORMAT_R32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RG16F: any',
		'const FORMAT_RG16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RG32F: any',
		'const FORMAT_RG32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGB16F: any',
		'const FORMAT_RGB16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGB32F: any',
		'const FORMAT_RGB32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGBA16F: any',
		'const FORMAT_RGBA16F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	[
		'let FORMAT_RGBA32F: any',
		'const FORMAT_RGBA32F: number & { readonly _FORMAT_: unique symbol } | undefined',
	],
	// (greedy)
	[
		/let (FORMAT_.+): any/g,
		'const $1: number & { readonly _FORMAT_: unique symbol }',
	],
	// (greedy)
	[
		/let (FRUSTUM_PLANES_.+): any/g,
		'const $1: number & { readonly _FRUSTUM_PLANES_: unique symbol }',
	],
	[
		'let RENDER_TARGET_DEFAULT: any',
		'const RENDER_TARGET_DEFAULT: number & { readonly _RENDER_TARGET_DEFAULT: unique symbol }',
	],
	// (greedy)
	[
		/let (STATE_.+): any/g,
		'const $1: number & { readonly _STATE_: unique symbol }',
	],
	// (greedy)
	[
		/let (STENCIL_.+): any/g,
		'const $1: number & { readonly _STENCIL_: unique symbol }',
	],
	// (greedy)
	[
		/let (WRAP_.+): any/g,
		'const $1: number & { readonly _WRAP_: unique symbol }',
	],
	[
		'function disable_state(state: any',
		'function disable_state(state: typeof render.STATE_DEPTH_TEST | typeof render.STATE_STENCIL_TEST | typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_POLYGON_OFFSET_FILL',
	],
	[
		'function enable_state(state: any',
		'function enable_state(state: typeof render.STATE_DEPTH_TEST | typeof render.STATE_STENCIL_TEST | typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_POLYGON_OFFSET_FILL',
	],
	[
		'function predicate(tags: any): any',
		'function predicate(tags: Array<string|hash> | LuaSet<string|hash>): predicate',
	],
	[
		'function set_cull_face(face_type: any',
		'function set_cull_face(face_type: typeof render.FACE_FRONT | typeof render.FACE_BACK | typeof render.FACE_FRONT_AND_BACK',
	],
	[
		'function set_depth_func(func: any',
		'function set_depth_func(func: typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_NOTEQUAL | typeof render.COMPARE_FUNC_ALWAYS',
	],
	// function enable_texture
	[
		'buffer_type?: any',
		'buffer_type?: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT',
	],
	// function get_render_target_height
	[
		'buffer_type: any',
		'buffer_type: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT',
	],
	// function get_render_target_width
	[
		'buffer_type: any',
		'buffer_type: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT',
	],
	// function set_stencil_func
	[
		'func: any',
		'func: typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_NOTEQUAL | typeof render.COMPARE_FUNC_ALWAYS',
	],
	['function constant_buffer(): any', 'function constant_buffer(): buffer'],
	[
		'function clear(buffers: any)',
		'function clear(buffers: { [key: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT]: number | vmath.vector4 })',
	],
	[
		'function draw(predicate: any, options?: any)',
		'function draw(predicate: predicate, options?: { frustum?: vmath.matrix4, frustum_planes?: typeof render.FRUSTUM_PLANES_SIDES | typeof render.FRUSTUM_PLANES_ALL, constants?: buffer })',
	],
	[
		'function draw_debug3d(options?: any)',
		'function draw_debug3d(options?: { frustum?: vmath.matrix4, frustum_planes?: typeof render.FRUSTUM_PLANES_SIDES | typeof render.FRUSTUM_PLANES_ALL })',
	],
	[
		'function render_target(name: string, parameters: any): any',
		'function render_target(name: string, parameters: { [key: typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT ]: {	format: typeof render.FORMAT_LUMINANCE | typeof render.FORMAT_RGB | typeof render.FORMAT_RGBA | typeof render.FORMAT_DEPTH | typeof render.FORMAT_STENCIL | typeof render.FORMAT_RGBA32F | typeof render.FORMAT_RGBA16F; width: number; height: number; min_filter?: typeof render.FILTER_LINEAR | typeof render.FILTER_NEAREST; mag_filter?: typeof render.FILTER_LINEAR | typeof render.FILTER_NEAREST; u_wrap?: typeof render.WRAP_CLAMP_TO_BORDER | typeof render.WRAP_CLAMP_TO_EDGE | typeof render.WRAP_MIRRORED_REPEAT | typeof render.WRAP_REPEAT; v_wrap?: typeof render.WRAP_CLAMP_TO_BORDER | typeof render.WRAP_CLAMP_TO_EDGE | typeof render.WRAP_MIRRORED_REPEAT | typeof render.WRAP_REPEAT; flags?: unknown } }): rendertarget',
	],
	[
		'function set_stencil_op(sfail: any, dpfail: any, dppass: any)',
		'function set_stencil_op(sfail: typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_ZERO | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INVERT, dpfail: typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_ZERO | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INVERT, dppass: typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_ZERO | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INVERT)',
	],
	[
		'function set_render_target(render_target: rendertarget, options?: any)',
		'function set_render_target(render_target: rendertarget, options?: Array<typeof render.BUFFER_COLOR_BIT | typeof  render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT>)',
	],
	[
		'function set_blend_func(source_factor: any, destination_factor: any)',
		'function set_blend_func(source_factor: typeof render.BLEND_ZERO | typeof render.BLEND_ONE | typeof render.BLEND_SRC_COLOR | typeof render.BLEND_ONE_MINUS_SRC_COLOR | typeof render.BLEND_DST_COLOR | typeof render.BLEND_ONE_MINUS_DST_COLOR | typeof render.BLEND_SRC_ALPHA | typeof render.BLEND_ONE_MINUS_SRC_ALPHA | typeof render.BLEND_DST_ALPHA | typeof render.BLEND_ONE_MINUS_DST_ALPHA | typeof render.BLEND_CONSTANT_COLOR | typeof render.BLEND_ONE_MINUS_CONSTANT_COLOR | typeof render.BLEND_CONSTANT_ALPHA | typeof render.BLEND_ONE_MINUS_CONSTANT_ALPHA | typeof render.BLEND_SRC_ALPHA_SATURATE	, destination_factor: typeof render.BLEND_ZERO | typeof render.BLEND_ONE | typeof render.BLEND_SRC_COLOR | typeof render.BLEND_ONE_MINUS_SRC_COLOR | typeof render.BLEND_DST_COLOR | typeof render.BLEND_ONE_MINUS_DST_COLOR | typeof render.BLEND_SRC_ALPHA | typeof render.BLEND_ONE_MINUS_SRC_ALPHA | typeof render.BLEND_DST_ALPHA | typeof render.BLEND_ONE_MINUS_DST_ALPHA | typeof render.BLEND_CONSTANT_COLOR | typeof render.BLEND_ONE_MINUS_CONSTANT_COLOR | typeof render.BLEND_CONSTANT_ALPHA | typeof render.BLEND_ONE_MINUS_CONSTANT_ALPHA | typeof render.BLEND_SRC_ALPHA_SATURATE	)',
	],
	// Describe clear color message
	[
		'export type clear_color = "clear_color"',
		'export type clear_color = "clear_color"; export type clear_color_message = { color: vmath.vector4 }',
	],
	[
		'export type draw_debug_text = "draw_debug_text"',
		'export type draw_debug_text = "draw_debug_text"; export type draw_debug_text_message = { position: vmath.vector3, text: string, color: vmath.vector4 }',
	],
	[
		'export type draw_line = "draw_line"',
		'export type draw_line = "draw_line";export type draw_line_message = { start_point: vmath.vector3, end_point: vmath.vector3, color: vmath.vector4 }',
	],
	[
		'export type resize = "resize"',
		'export type resize = "resize"; export type resize_message = { height: number, width: number }',
	],
	[
		'export type window_resized = "window_resized"',
		'export type window_resized = "window_resized"; export type window_resized_message = { height: number, width: number }',
	],
];

/** resource namespace */
const resource = [
	// (greedy)
	[
		/let (COMPRESSION_.+): any/g,
		'const $1: number & { readonly _COMPRESSION_: unique symbol }',
	],
	// (greedy)
	[
		/let (TEXTURE_.+): any/g,
		'const $1: number & { readonly _TEXTURE_: unique symbol }',
	],
	[
		'function create_atlas(path: string, table: any)',
		'function create_atlas(path: string, table: {	texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] } )',
	],
	[
		'function get_atlas(path: hash | string): any',
		'function get_atlas(path: hash | string): {	texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] }',
	],
	[
		'function get_text_metrics(url: hash, text: string, options?: any): any',
		'function get_text_metrics(url: hash, text: string, options?: { width?: number, leading?: number, tracking?: number, line_break?: boolean }): { width: number, height: number, max_ascent: number, max_descent: number }',
	],
	[
		'function get_texture_info(path: any): any',
		'function get_texture_info(path: hash | string): { handle: hash, width: number, height: number, depth: number, mipmaps: number, type: typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_CUBE_MAP | typeof resource.TEXTURE_TYPE_2D_ARRAY }',
	],
	[
		'function create_buffer(path: string, table: any)',
		'function create_buffer(path: string, table: { buffer: buffer, transfer_ownership?: boolean })',
	],
	[
		'function create_texture(path: string, table: any, buffer?: buffer): hash',
		'function create_texture(path: string, table: { type: typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_CUBE_MAP, width: number, height: number, format: typeof resource.TEXTURE_FORMAT_LUMINANCE | typeof resource.TEXTURE_FORMAT_RGB | typeof resource.TEXTURE_FORMAT_RGBA | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_ETC1 | typeof resource.TEXTURE_FORMAT_RGBA_ETC2 | typeof resource.TEXTURE_FORMAT_RGBA_ASTC_4x4 | typeof resource.TEXTURE_FORMAT_RGB_BC1 | typeof resource.TEXTURE_FORMAT_RGBA_BC3 | typeof resource.TEXTURE_FORMAT_R_BC4 | typeof resource.TEXTURE_FORMAT_RG_BC5 | typeof resource.TEXTURE_FORMAT_RGBA_BC7 | typeof resource.TEXTURE_FORMAT_RGB16F | typeof resource.TEXTURE_FORMAT_RGB32F | typeof resource.TEXTURE_FORMAT_RGBA16F | typeof resource.TEXTURE_FORMAT_RGBA32F | typeof resource.TEXTURE_FORMAT_R16F | typeof resource.TEXTURE_FORMAT_RG16F | typeof resource.TEXTURE_FORMAT_R32F | typeof resource.TEXTURE_FORMAT_RG32F, max_mipmaps?: number, compression_type?: typeof resource.COMPRESSION_TYPE_DEFAULT | typeof resource.COMPRESSION_TYPE_BASIS_UASTC }, buffer?: buffer): hash',
	],
	[
		'function set_atlas(path: hash | string, table: any)',
		'function set_atlas(path: hash | string, table: { texture: string | hash,	animations: [{ id: string, width: number, height: number, frame_start: number, frame_end: number, playback?: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, fps?: number, flip_vertical?: boolean, flip_horizontal?: boolean }], geometries: [{ vertices: number[], uvs: number[], indices: number[] }] })',
	],
	[
		'function set_buffer(path: hash | string, buffer: buffer, table: any)',
		'function set_buffer(path: hash | string, buffer: buffer, table?: { transfer_ownership: boolean })',
	],
	[
		'function set_texture(path: hash | string, table: any, buffer: buffer)',
		'function set_texture(path: hash | string, table: { type: typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_CUBE_MAP, width: number, height: number, format: typeof resource.TEXTURE_FORMAT_LUMINANCE | typeof resource.TEXTURE_FORMAT_RGB | typeof resource.TEXTURE_FORMAT_RGBA | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_ETC1 | typeof resource.TEXTURE_FORMAT_RGBA_ETC2 | typeof resource.TEXTURE_FORMAT_RGBA_ASTC_4x4 | typeof resource.TEXTURE_FORMAT_RGB_BC1 | typeof resource.TEXTURE_FORMAT_RGBA_BC3 | typeof resource.TEXTURE_FORMAT_R_BC4 | typeof resource.TEXTURE_FORMAT_RG_BC5 | typeof resource.TEXTURE_FORMAT_RGBA_BC7 | typeof resource.TEXTURE_FORMAT_RGB16F | typeof resource.TEXTURE_FORMAT_RGB32F | typeof resource.TEXTURE_FORMAT_RGBA16F | typeof resource.TEXTURE_FORMAT_RGBA32F | typeof resource.TEXTURE_FORMAT_R16F | typeof resource.TEXTURE_FORMAT_RG16F | typeof resource.TEXTURE_FORMAT_R32F | typeof resource.TEXTURE_FORMAT_RG32F, x?: number, y?: number, mipmap?: number, compression_type?: typeof resource.COMPRESSION_TYPE_DEFAULT | typeof resource.COMPRESSION_TYPE_BASIS_UASTC }, buffer: buffer)',
	],
];

/** sys namespace */
const sys = [
	// (greedy)
	[
		/let (NETWORK_.+): any/g,
		'const $1: number & { readonly _NETWORK_: unique symbol }',
	],
	[
		'function exists(path: string): any',
		'function exists(path: string): boolean',
	],
	[
		'function get_config_int(key: string, default_value?: any): any',
		'function get_config_int(key: string, default_value?: number): number',
	],
	[
		'function get_connectivity(): any',
		'function get_connectivity(): typeof sys.NETWORK_DISCONNECTED | typeof sys.NETWORK_CONNECTED_CELLULAR | typeof sys.NETWORK_CONNECTED',
	],
	[
		'function get_engine_info(): any',
		'function get_engine_info(): { version: string, version_sha1: string, is_debug: boolean }',
	],
	[
		'function load(filename: string): any',
		'function load(filename: string): LuaMap<AnyNotNil, unknown>',
	],
	[
		'function set_error_handler(error_handler: any',
		'function set_error_handler(error_handler: (source: string, message: string, traceback: string) => void',
	],
	[
		'function get_application_info(app_string: string): any',
		'function get_application_info(app_string: string): { installed: boolean }',
	],
	[
		'function open_url(url: string, attributes?: any)',
		'function open_url(url: string, attributes?: { target?: "_self" | "_blank" | "_parent" | "_top" | string })',
	],
	// Remove overloaded function
	['export function load_resource(filename: string): any', ''],
	[
		'function load_resource(filename: string): string',
		'function load_resource(filename: string): LuaMultiReturn<[string| undefined, string | undefined]>',
	],
	[
		'function get_sys_info(options?: any): any',
		'function get_sys_info(options?: { ignore_secure: boolean }): { device_model?: string, manufacturer?: string, system_name: string, system_version: string, api_version: string, language: string, device_language: string, territory: string, gmt_offset: number, device_ident?: string, user_agent: string }',
	],
	[
		'function get_ifaddrs(): any',
		'function get_ifaddrs(): { name: string, address: string | undefined, mac: string | undefined, up: boolean, running: boolean }[]',
	],
	// Describe messages
	[
		'export type exit = "exit"',
		'export type exit = "exit"; export type exit_message = { code: number }',
	],
	[
		'export type reboot = "reboot"',
		'export type reboot = "reboot"; export type reboot_message = { arg1?: string, arg2?: string, arg3?: string, arg4?: string, arg5?: string, arg6?: string }',
	],
	[
		'export type set_update_frequency = "set_update_frequency"',
		'export type set_update_frequency = "set_update_frequency"; export type set_update_frequency_message = { frequency: number }',
	],
	[
		'export type set_vsync = "set_vsync"',
		'export type set_vsync = "set_vsync"; export type set_vsync_message = { swap_interval: number }',
	],
	[
		'export type start_record = "start_record"',
		'export type start_record = "start_record"; export type start_record_message = { file_name: string, frame_period?: number, fps?: number }',
	],
	[
		'function reboot(arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6: string): void',
		'function reboot(arg1?: string, arg2?: string, arg3?: string, arg4?: string, arg5?: string, arg6?: string): void',
	],
];

/** window namespace */
const windowChanges = [
	// (greedy)
	[
		/let (DIMMING_.+): any/g,
		'const $1: number & { readonly _DIMMING_: unique symbol }',
	],
	// (greedy)
	[
		/let (WINDOW_EVENT_.+): any/g,
		'const $1: number & { readonly _WINDOW_EVENT_: unique symbol }',
	],
	[
		'function get_dim_mode(): any',
		'function get_dim_mode(): typeof window.DIMMING_UNKNOWN | typeof window.DIMMING_ON | typeof window.DIMMING_OFF',
	],
	[
		'function set_dim_mode(mode: any)',
		'function set_dim_mode(mode: typeof window.DIMMING_ON | typeof window.DIMMING_OFF)',
	],
	[
		'function set_listener(callback: any)',
		'function set_listener(callback: (this: unknown, event: typeof window.WINDOW_EVENT_FOCUS_LOST | typeof window.WINDOW_EVENT_FOCUS_GAINED | typeof window.WINDOW_EVENT_RESIZED | typeof window.WINDOW_EVENT_ICONFIED | typeof window.WINDOW_EVENT_DEICONIFIED, data: { width: number | undefined, height: number | undefined	}) => void)',
	],
];

/** buffer namespace */
const bufferChanges = [
	// (greedy)
	[
		/let (VALUE_TYPE_.+): any/g,
		'const $1: number & { readonly _VALUE_TYPE_: unique symbol }',
	],
	[
		'function create(element_count: number, declaration: any)',
		'function create(element_count: number, declaration: { hash: hash | string, type: typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_FLOAT32, count: number })',
	],
	[
		'function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[any, any, any, any]>',
		'function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[undefined | unknown[], undefined | typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_FLOAT32]>',
	],
	[
		'function set_metadata(buf: buffer, metadata_name: hash | string, values: any, value_type: any)',
		'function set_metadata(buf: buffer, metadata_name: hash | string, values: number[], value_type: typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_FLOAT32)',
	],
];

/** html5 namespace */
const html5 = [
	[
		'function set_interaction_listener(callback: any',
		'function set_interaction_listener(callback: undefined | ((this: unknown) => void)',
	],
];

/** http namespace */
const http = [
	// function request
	[
		'function request(url: string, method: string, callback: any, headers?: any, post_data?: string, options?: any)',
		'function request(url: string, method: string, callback: ( this: unknown, id: hash, response: { status: number; response?: string, headers: { [key:string]: string }; path?: string; error?: string; } ) => void, headers?: { [key:string]: string }, post_data?: string, options?: { timeout?: number, path?: string, ignore_cache?: boolean, chunked_transfer?: boolean })',
	],
];

/** image namespace */
const image = [
	['let TYPE_LUMINANCE: any', 'const TYPE_LUMINANCE: "l"'],
	['let TYPE_LUMINANCE_ALPHA: any', 'const TYPE_LUMINANCE_ALPHA: "la"'],
	['let TYPE_RGB: any', 'const TYPE_RGB: "rgb"'],
	['let TYPE_RGBA: any', 'const TYPE_RGBA: "rgba"'],
	[
		'function load(buffer: string, premult?: boolean): LuaMultiReturn<[any, any]>',
		'function load(buffer: string, premult?: boolean): undefined | { width: number, height: number, type: typeof image.TYPE_RGB | typeof image.TYPE_RGBA | typeof image.TYPE_LUMINANCE | typeof image.TYPE_LUMINANCE_ALPHA, buffer: string }',
	],
];

/** json namespace */
const jsonChanges = [
	// Change invalid JSON null type
	['let null$: any', 'let null$: null'],
];

/** msg namespace */
const msg = [
	[
		'export function post(receiver: string | url | hash, message_id: string | hash, message?: any): void',
		'export function post(receiver: hash | url | string, message_id: hash | string, message?: generic_message): void; export type generic_message = LuaMap<AnyNotNil, AnyNotNil> | { [key: string | number | symbol]: AnyNotNil }',
	],
];

/** timer namespace */
const timer = [
	[
		'let INVALID_TIMER_HANDLE: any',
		'const INVALID_TIMER_HANDLE: number & { readonly _INVALID_TIMER_: unique symbol }',
	],
	// function delay
	[
		'function delay(delay: number, repeat: boolean, callback: any): hash',
		'function delay(delay: number, repeat: boolean, callback: (this: unknown, handle: number, time_elapsed: number) => void): hash | typeof timer.INVALID_TIMER_HANDLE',
	],
	[
		'function get_info(handle: hash): LuaMultiReturn<[any, any]>',
		'function get_info(handle: hash): undefined | { time_remaining: number, delay: number, repeating: boolean }',
	],
];

/** vmath namespace */
const vmathChanges = [
	[
		'function vector(t: any): any',
		'function vector(t: number[]): number & { [key: number]: number }',
	],
];

/** zlib namespace */
const zlib = [['', '']];

/** camera namespace */
const camera = [
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

/** collectionFactory namespace */
const collectionFactory = [
	// (greedy)
	[
		/let (STATUS_.+): any/g,
		'const $1: number & { readonly _STATUS_: unique symbol }',
	],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof collectionfactory.STATUS_UNLOADED | typeof collectionfactory.STATUS_LOADING | typeof collectionfactory.STATUS_LOADED',
	],
	// function load
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, url: url, result: boolean) => void',
	],
	[
		'function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number): any',
		'function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number): LuaMap<hash, hash>',
	],
];

/** collectionproxy namespace */
const collectionProxy = [
	[
		'function missing_resources(collectionproxy: url): any',
		'function missing_resources(collectionproxy: url): string[]',
	],
	[
		'function get_resources(collectionproxy: url): any',
		'function get_resources(collectionproxy: url): string[]',
	],
	// Describe message
	[
		'export type set_time_step = "set_time_step"',
		'export type set_time_step = "set_time_step"; export type set_time_step_message = { factor: number, mode: 1 | 0 }',
	],
];

/** factory namespace */
const factory = [
	// (greedy)
	[
		/let (STATUS_.+): any/g,
		'const $1: number & { readonly _STATUS_: unique symbol }',
	],
	[
		'function get_status(url?: string | hash | url): any',
		'function get_status(url?: string | hash | url): typeof factory.STATUS_UNLOADED | typeof factory.STATUS_LOADING | typeof factory.STATUS_LOADED',
	],
	// function load
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, url: url, result: boolean) => void',
	],
	[
		'function set_prototype(url?: string | hash | url, prototype?: any)',
		'function set_prototype(url?: string | hash | url, prototype?: string)',
	],
];

/** label namespace */
const label = [
	['let material: any', 'let material: hash'],
	['let color: any', 'let color: vmath.vector4'],
	['let font: any', 'let font: hash'],
	['let leading: any', 'let leading: number'],
	['let line_break: any', 'let line_break: boolean'],
	['let outline: any', 'let outline: vmath.vector4'],
	['let scale: any', 'let scale: number | vmath.vector3'],
	['let shadow: any', 'let shadow: vmath.vector4'],
	['let tracking: any', 'let tracking: number'],
	['let size: any', 'let size: vmath.vector3'],
];

/** model namespace */
const model = [
	['let material: any', 'let material: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let animation: any', 'let animation: hash'],
	['let cursor: any', 'let cursor: number'],
	// function play_anim
	[
		'play_properties?: any',
		'play_properties?: { blend_duration?: number, offset?: number, playback_rate?: number }',
	],
	[
		'playback: any',
		'playback: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, message_id: hash, message: { animation_id: hash, playback: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG }, sender: url) => void',
	],
	['let textureN: any', 'let textureN: hash'],
	// Describe message
	[
		'export type model_animation_done = "model_animation_done"',
		'export type model_animation_done = "model_animation_done"; export type model_animation_done_message = { animation_id: hash, playback: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG }',
	],
];

/** particlefx namespace */
const particleFx = [
	// (greedy)
	[
		/let (EMITTER_STATE_.+): any/g,
		'const $1: number & { readonly _EMITTER_STATE_: unique symbol }',
	],
	// function play
	[
		'emitter_state_function?: any',
		'emitter_state_function?: (this: unknown, id: hash, emitter: hash, state: typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SPAWNING | typeof particlefx.EMITTER_STATE_POSTSPAWN) => void',
	],
	[
		'function stop(url: string | hash | url, options: any)',
		'function stop(url: string | hash | url, options?: { clear: boolean })',
	],
];

/** sound namespace */
const sound = [
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
		'complete_function?: (this: unknown, message_id: hash, message: { play_id: number }, sender: url) => void',
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
];

/** sprite namespace */
const sprite = [
	['let material: any', 'let material: hash'],
	['let frame_count: any', 'const frame_count: number'],
	['let image: any', 'let image: hash'],
	['let playback_rate: any', 'let playback_rate: number'],
	['let scale: any', 'let scale: vmath.vector3'],
	['let size: any', 'let size: vmath.vector3'],
	['let animation: any', 'let animation: hash'],
	['let cursor: any', 'let cursor: number'],
	// function play_flipbook
	[
		'play_properties?: any',
		'play_properties?: { offset?: number, playback_rate?: number }',
	],
	[
		'complete_function?: any',
		'complete_function?: (this: unknown, message_id: hash, message: { current_tile: number, id: hash }, sender: url) => void',
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

/** tilemap namespace */
const tilemap = [
	['let material: any', 'let material: hash'],
	['let tile_source: any', 'let tile_source: hash'],
	[
		'let H_FLIP: any',
		'const H_FLIP: number & { readonly __FLIP_: unique symbol }',
	],
	// (greedy)
	[
		/let (ROTATE_.+): any/g,
		'const $1: number & { readonly _ROTATE_: unique symbol }',
	],
	[
		'let V_FLIP: any',
		'const V_FLIP: number & { readonly __FLIP_: unique symbol }',
	],
];

/** Late changes that don't fit anywhere else */
const finalChanges = [
	// Replace `any` keyword with `unknown` (greedy)
	[/\: any/g, ': unknown'],
	[/\[any/g, '[unknown'],
	[/any,/g, 'unknown,'],
	[/any\]/g, 'unknown]'],
	// Change uppercase variables to const (greedy)
	[/let (?:\b|\W)([A-Z0-9_]+)(?:\b|\W)/g, 'const $1'],
];

const patches = [
	// The following are in order of appearance in the final definitions file
	{
		regex: /(declare namespace socket {)([\s\S]*?)(declare namespace crash {)/s,
		replacements: socket,
	},
	{
		regex: /(declare namespace crash {)([\s\S]*?)(declare namespace go {)/s,
		replacements: crash,
	},
	{
		regex: /(declare namespace go {)([\s\S]*?)(declare namespace gui {)/s,
		replacements: go,
	},
	{
		regex: /(declare namespace gui {)([\s\S]*?)(declare namespace physics {)/s,
		replacements: gui,
	},
	{
		regex:
			/(declare namespace physics {)([\s\S]*?)(declare namespace profiler {)/s,
		replacements: physics,
	},
	{
		regex:
			/(declare namespace profiler {)([\s\S]*?)(declare namespace render {)/s,
		replacements: profiler,
	},
	{
		regex:
			/(declare namespace render {)([\s\S]*?)(declare namespace resource {)/s,
		replacements: render,
	},
	{
		regex: /(declare namespace resource {)([\s\S]*?)(declare namespace sys {)/s,
		replacements: resource,
	},
	{
		regex: /(declare namespace sys {)([\s\S]*?)(declare namespace window {)/s,
		replacements: sys,
	},
	{
		regex:
			/(declare namespace window {)([\s\S]*?)(declare namespace buffer {)/s,
		replacements: windowChanges,
	},
	{
		regex: /(declare namespace buffer {)([\s\S]*?)(declare namespace html5 {)/s,
		replacements: bufferChanges,
	},
	{
		regex: /(declare namespace html5 {)([\s\S]*?)(declare namespace http {)/s,
		replacements: html5,
	},
	{
		regex: /(declare namespace http {)([\s\S]*?)(declare namespace image {)/s,
		replacements: http,
	},
	{
		regex: /(declare namespace image {)([\s\S]*?)(declare namespace json {)/s,
		replacements: image,
	},
	{
		regex: /(declare namespace json {)([\s\S]*?)(declare namespace msg {)/s,
		replacements: jsonChanges,
	},
	{
		regex: /(declare namespace msg {)([\s\S]*?)(declare namespace timer {)/s,
		replacements: msg,
	},
	{
		regex: /(declare namespace timer {)([\s\S]*?)(declare namespace vmath {)/s,
		replacements: timer,
	},
	{
		regex: /(declare namespace vmath {)([\s\S]*?)(declare namespace zlib {)/s,
		replacements: vmathChanges,
	},
	{
		regex: /(declare namespace zlib {)([\s\S]*?)(declare namespace camera {)/s,
		replacements: zlib,
	},
	{
		regex:
			/(declare namespace camera {)([\s\S]*?)(declare namespace collectionfactory {)/s,
		replacements: camera,
	},
	{
		regex:
			/(declare namespace collectionfactory {)([\s\S]*?)(declare namespace collectionproxy {)/s,
		replacements: collectionFactory,
	},
	{
		regex:
			/(declare namespace collectionproxy {)([\s\S]*?)(declare namespace factory {)/s,
		replacements: collectionProxy,
	},
	{
		regex:
			/(declare namespace factory {)([\s\S]*?)(declare namespace label {)/s,
		replacements: factory,
	},
	{
		regex: /(declare namespace label {)([\s\S]*?)(declare namespace model {)/s,
		replacements: label,
	},
	{
		regex:
			/(declare namespace model {)([\s\S]*?)(declare namespace particlefx {)/s,
		replacements: model,
	},
	{
		regex:
			/(declare namespace particlefx {)([\s\S]*?)(declare namespace sound {)/s,
		replacements: particleFx,
	},
	{
		regex: /(declare namespace sound {)([\s\S]*?)(declare namespace sprite {)/s,
		replacements: sound,
	},
	{
		regex:
			/(declare namespace sprite {)([\s\S]*?)(declare namespace tilemap {)/s,
		replacements: sprite,
	},
	{
		regex: /(declare namespace tilemap {)([\s\S]*?)(})/s,
		replacements: tilemap,
	},
];

/**
 * Load the contents of the file
 */
fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}
	console.time('Patching definitions');

	// Make early find and replace changes
	earlyChanges.forEach((pair) => (data = data.replace(pair[0], pair[1])));

	// Loop through namespace changes
	for (const patch of patches) {
		const { regex, replacements } = patch;

		data = data.replace(regex, (match, namespace, group, namespace2) => {
			// Apply replacements using string.replace dynamically
			replacements.forEach(([search, replace]) => {
				group = group.replace(search, replace);
			});
			return `${namespace}${group}${namespace2}`;
		});
	}

	// Make final find an replace changes
	finalChanges.forEach((pair) => (data = data.replace(pair[0], pair[1])));
	console.timeEnd('Patching definitions');

	// Save the modified contents back to the file
	console.time('Saving file');
	fs.writeFile(filePath, data, 'utf8', (err) => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.timeEnd('Saving file');
	});
});
