/** Initial generic changes */
export const earlyChanges = [
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

			/**
			 * Not available in HTML5, iOS, Switch builds
			 * @see {@link https://luajit.org/ext_jit.html|Documentation}
			 */
			declare namespace jit {
				/** Turns the JIT engine on.  */
				export function on(): void;
				/** Turns the JIT engine off. */
				export function off(): void;
				/** Enable JIT compilation for a Lua function. */
				export function on(fn: (...args: any[]) => unknown, recursive?: boolean): void;
				/** Disable JIT compilation for a Lua function. */
				export function off(fn: (...args: any[]) => unknown, recursive?: boolean): void;
				/** Enable JIT compilation for a module. */
				export function on(arg1: true, recursive?: boolean): void;
				/** Disable JIT compilation for a module. */
				export function off(arg1: true, recursive?: boolean): void;
				/** 
				 * Attach a handler to the compiler pipeline with the given priority.
				 * The handler is detached if no priority is given.
				 */
				export function attach(handler: (...args: any[]) => unknown, priority?: number): void;
				export function security(): void;
				export function flush(): void;
				export const arch: string;
				/** Contains the version number of the LuaJIT core.  */
				export const version_num: number;
				/** Contains the LuaJIT version string. */
				export const version: string;
				export const os: string;
			};
			`,
	],
	// Remove {}
	[
		'declare type bufferstream = Array<number> & LuaUserdata & {\n}',
		'declare type bufferstream = number[] & LuaUserdata & object',
	],
	[
		'@return hash  a hashed string',
		'@return hash  a hashed string\n * @see {@link https://defold.com/ref/stable/builtins/#hash:s|Documentation}',
	],
	['function pprint(v: any)', 'function pprint(...v: any[])'],
	// Add @see comment tags
	[
		'declare namespace socket',
		'/** @see {@link https://defold.com/ref/stable/socket/|Documentation} */\ndeclare namespace socket',
	],
	[
		'declare namespace b2d {',
		'/** @see {@link https://defold.com/ref/stable/b2d/|Documentation} */\ndeclare namespace b2d {',
	],
	[
		'declare namespace b2d.body {',
		'/** @see {@link https://defold.com/ref/stable/b2d.body/|Documentation} */\ndeclare namespace b2d.body {',
	],
	[
		'declare namespace crash',
		'/** @see {@link https://defold.com/ref/stable/crash/|Documentation} */\ndeclare namespace crash',
	],
	[
		'declare namespace go',
		'/** @see {@link https://defold.com/ref/stable/go/|Documentation} */\ndeclare namespace go',
	],
	[
		'declare namespace gui',
		'/** @see {@link https://defold.com/ref/stable/gui/|Documentation} */\ndeclare namespace gui',
	],
	[
		'declare namespace physics',
		'/** @see {@link https://defold.com/ref/stable/physics/|Documentation} */\ndeclare namespace physics',
	],
	[
		'declare namespace profiler',
		'/** @see {@link https://defold.com/ref/stable/profiler/|Documentation} */\ndeclare namespace profiler',
	],
	[
		'declare namespace render',
		'/** @see {@link https://defold.com/ref/stable/render/|Documentation} */\ndeclare namespace render',
	],
	[
		'declare namespace resource',
		'/** @see {@link https://defold.com/ref/stable/resource/|Documentation} */\ndeclare namespace resource',
	],
	[
		'declare namespace sys',
		'/** @see {@link https://defold.com/ref/stable/sys/|Documentation} */\ndeclare namespace sys',
	],
	[
		'declare namespace window',
		'/** @see {@link https://defold.com/ref/stable/window/|Documentation} */\ndeclare namespace window',
	],
	[
		'declare namespace buffer',
		'/** @see {@link https://defold.com/ref/stable/buffer/|Documentation} */\ndeclare namespace buffer',
	],
	[
		'declare namespace html5',
		'/** @see {@link https://defold.com/ref/stable/html5/|Documentation} */\ndeclare namespace html5',
	],
	[
		'declare namespace http',
		'/** @see {@link https://defold.com/ref/stable/http/|Documentation} */\ndeclare namespace http',
	],
	[
		'declare namespace image',
		'/** @see {@link https://defold.com/ref/stable/image/|Documentation} */\ndeclare namespace image',
	],
	[
		'declare namespace json',
		'/** @see {@link https://defold.com/ref/stable/json/|Documentation} */\ndeclare namespace json',
	],
	[
		'declare namespace msg',
		'/** @see {@link https://defold.com/ref/stable/msg/|Documentation} */\ndeclare namespace msg',
	],
	[
		'declare namespace timer',
		'/** @see {@link https://defold.com/ref/stable/timer/|Documentation} */\ndeclare namespace timer',
	],
	[
		'declare namespace vmath',
		'/** @see {@link https://defold.com/ref/stable/vmath/|Documentation} */\ndeclare namespace vmath',
	],
	[
		'declare namespace zlib',
		'/** @see {@link https://defold.com/ref/stable/zlib/|Documentation} */\ndeclare namespace zlib',
	],
	[
		'declare namespace camera',
		'/** @see {@link https://defold.com/ref/stable/camera/|Documentation} */\ndeclare namespace camera',
	],
	[
		'declare namespace collectionfactory',
		'/** @see {@link https://defold.com/ref/stable/collectionfactory/|Documentation} */\ndeclare namespace collectionfactory',
	],
	[
		'declare namespace collectionproxy',
		'/** @see {@link https://defold.com/ref/stable/collectionproxy/|Documentation} */\ndeclare namespace collectionproxy',
	],
	[
		'declare namespace factory',
		'/** @see {@link https://defold.com/ref/stable/factory/|Documentation} */\ndeclare namespace factory',
	],
	[
		'declare namespace label',
		'/** @see {@link https://defold.com/ref/stable/label/|Documentation} */\ndeclare namespace label',
	],
	[
		'declare namespace model',
		'/** @see {@link https://defold.com/ref/stable/model/|Documentation} */\ndeclare namespace model',
	],
	[
		'declare namespace particlefx',
		'/** @see {@link https://defold.com/ref/stable/particlefx/|Documentation} */\ndeclare namespace particlefx',
	],
	[
		'declare namespace sound',
		'/** @see {@link https://defold.com/ref/stable/sound/|Documentation} */\ndeclare namespace sound',
	],
	[
		'declare namespace sprite',
		'/** @see {@link https://defold.com/ref/stable/sprite/|Documentation} */\ndeclare namespace sprite',
	],
	[
		'declare namespace tilemap',
		'/** @see {@link https://defold.com/ref/stable/tilemap/|Documentation} */\ndeclare namespace tilemap',
	],
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
];
