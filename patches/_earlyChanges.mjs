// @ts-check

/** Initial generic changes @satisfies {(string | RegExp)[][]} */
export const earlyChanges = [
	[
		'/// <reference types="lua-types/5.1" />',
		`/// <reference types="lua-types/5.1" />
		/// <reference types="lua-types/special/jit-only" />`,
	],
	[
		'/// <reference types="@typescript-to-lua/language-extensions" />',
		`/// <reference types="@typescript-to-lua/language-extensions" />
		/// <reference types="./deprecated.d.ts" />
		/// <reference types="./socket.d.ts" />`,
	],
	// Describe `url`
	[
		'declare type url = {\n}',
		`/**
			* A reference to game resources, such as game objects, components, and assets.
			* @see {@link https://defold.com/manuals/addressing/|Addressing Manual}
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
			* @see {@link https://defold.com/manuals/addressing/#hashed-identifiers|Addressing Manual}
			*/
			declare type hash = Readonly<LuaUserdata &
			{
				readonly __hash__: unique symbol;
			}>;`,
	],
	// Describe `node`
	[
		'declare type node = {\n}',
		`/**
		  * A representation of a GUI object.
		  * @see {@link https://defold.com/manuals/gui/|GUI Manual}
		  */
		declare type node = Readonly<LuaUserdata &
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
			* @see {@link https://defold.com/manuals/buffer/|Buffer Manual}
			*/
			declare type buffer = object;

			/**
			 * Render pipeline predicate.
			 * @see {@link https://defold.com/manuals/render/|Render Manual}
			 */
			declare type predicate = Readonly<LuaUserdata &
			{
				readonly __predicate__: unique symbol;
			}>;

			/**
			 * Render pipeline target.
			 * @see {@link https://defold.com/manuals/render/|Render Manual}
			 */
			declare type rendertarget = Readonly<LuaUserdata &
			{
				readonly __rendertarget__: unique symbol;
			}>;
			`,
	],
	// Remove {}
	[
		'declare type bufferstream = Array<number> & LuaUserdata & {\n}',
		`/**
		  * A data stream derived from a buffer.
		  * @see {@link https://defold.com/ref/stable/buffer/#buffer.get_stream:buffer-stream_name|API Documentation}
		  */
		declare type bufferstream = number[] & LuaUserdata & object`,
	],
	[
		'@return hash  a hashed string',
		'@return hash  a hashed string\n * @see {@link https://defold.com/ref/stable/builtins/#hash:s|API Documentation}',
	],
	[
		'@return hex  hex representation of the hash',
		'@return hex  hex representation of the hash\n * @see {@link https://defold.com/ref/stable/builtins/#hash_to_hex:h|API Documentation}',
	],
	[
		'@param v  value to print',
		'@param v  value to print\n * @see {@link https://defold.com/ref/stable/builtins/#pprint:v|API Documentation}',
	],
	['function pprint(v: any)', 'function pprint(...v: any[])'],
	// Replace nil with undefined
	[/nil/g, 'undefined'],
	[/Nil/g, 'Undefined'],
	// Replace lua not equals with TS not equals
	[/~=/g, '!=='],
	// Replace lua self with TS this
	[/`self`/g, '`this`'],
];
