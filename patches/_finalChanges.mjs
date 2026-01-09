// @ts-check

/** Late changes that don't fit anywhere else @satisfies {(string | RegExp)[][]} */
export const finalChanges = [
	// Add @see comment tags
	[
		'declare namespace socket',
		'/** @see {@link https://defold.com/ref/stable/socket/|API Documentation} */\ndeclare namespace socket',
	],
	[
		'declare namespace b2d {',
		'/** @see {@link https://defold.com/ref/stable/b2d/|Box2D Documentation} @since 1.8.0 */\ndeclare namespace b2d {',
	],
	[
		'declare namespace b2d.body {',
		'/** @see {@link https://defold.com/ref/stable/b2d.body/|Box2D b2Body Documentation} */\ndeclare namespace b2d.body {',
	],
	[
		'declare namespace crash',
		'/** @see {@link https://defold.com/ref/stable/crash/|API Documentation} */\ndeclare namespace crash',
	],
	[
		'declare namespace font',
		'/** @see {@link https://defold.com/ref/stable/font/|API Documentation} */\ndeclare namespace font',
	],
	[
		'declare namespace go',
		'/** @see {@link https://defold.com/ref/stable/go/|API Documentation} */\ndeclare namespace go',
	],
	[
		'declare namespace graphics',
		'/** @see {@link https://defold.com/ref/stable/graphics/|API Documentation} */\ndeclare namespace graphics',
	],
	[
		'declare namespace gui',
		'/** @see {@link https://defold.com/ref/stable/gui/|API Documentation} */\ndeclare namespace gui',
	],
	[
		'declare namespace physics',
		'/** @see {@link https://defold.com/ref/stable/physics/|API Documentation} */\ndeclare namespace physics',
	],
	[
		'declare namespace profiler',
		'/** @see {@link https://defold.com/ref/stable/profiler/|API Documentation} */\ndeclare namespace profiler',
	],
	[
		'declare namespace render',
		'/** @see {@link https://defold.com/ref/stable/render/|API Documentation} */\ndeclare namespace render',
	],
	[
		'declare namespace resource',
		'/** @see {@link https://defold.com/ref/stable/resource/|API Documentation} */\ndeclare namespace resource',
	],
	[
		'declare namespace sys',
		'/** @see {@link https://defold.com/ref/stable/sys/|API Documentation} */\ndeclare namespace sys',
	],
	[
		'declare namespace window',
		'/** @see {@link https://defold.com/ref/stable/window/|API Documentation} */\ndeclare namespace window',
	],
	[
		'declare namespace buffer',
		'/** @see {@link https://defold.com/ref/stable/buffer/|API Documentation} */\ndeclare namespace buffer',
	],
	[
		'declare namespace html5',
		'/** @see {@link https://defold.com/ref/stable/html5/|API Documentation} */\ndeclare namespace html5',
	],
	[
		'declare namespace http',
		'/** @see {@link https://defold.com/ref/stable/http/|API Documentation} */\ndeclare namespace http',
	],
	[
		'declare namespace image',
		'/** @see {@link https://defold.com/ref/stable/image/|API Documentation} */\ndeclare namespace image',
	],
	[
		'declare namespace json',
		'/** @see {@link https://defold.com/ref/stable/json/|API Documentation} */\ndeclare namespace json',
	],
	[
		'declare namespace msg',
		'/** @see {@link https://defold.com/ref/stable/msg/|API Documentation} */\ndeclare namespace msg',
	],
	[
		'declare namespace timer',
		'/** @see {@link https://defold.com/ref/stable/timer/|API Documentation} */\ndeclare namespace timer',
	],
	[
		'declare namespace vmath',
		'/** @see {@link https://defold.com/ref/stable/vmath/|API Documentation} */\ndeclare namespace vmath',
	],
	[
		'declare namespace zlib',
		'/** @see {@link https://defold.com/ref/stable/zlib/|API Documentation} */\ndeclare namespace zlib',
	],
	[
		'declare namespace camera',
		'/** @see {@link https://defold.com/ref/stable/camera/|API Documentation} */\ndeclare namespace camera',
	],
	[
		'declare namespace collectionfactory',
		'/** @see {@link https://defold.com/ref/stable/collectionfactory/|API Documentation} */\ndeclare namespace collectionfactory',
	],
	[
		'declare namespace collectionproxy',
		'/** @see {@link https://defold.com/ref/stable/collectionproxy/|API Documentation} */\ndeclare namespace collectionproxy',
	],
	[
		'declare namespace factory',
		'/** @see {@link https://defold.com/ref/stable/factory/|API Documentation} */\ndeclare namespace factory',
	],
	[
		'declare namespace label',
		'/** @see {@link https://defold.com/ref/stable/label/|API Documentation} */\ndeclare namespace label',
	],
	[
		'declare namespace model',
		'/** @see {@link https://defold.com/ref/stable/model/|API Documentation} */\ndeclare namespace model',
	],
	[
		'declare namespace particlefx',
		'/** @see {@link https://defold.com/ref/stable/particlefx/|API Documentation} */\ndeclare namespace particlefx',
	],
	[
		'declare namespace sound',
		'/** @see {@link https://defold.com/ref/stable/sound/|API Documentation} */\ndeclare namespace sound',
	],
	[
		'declare namespace sprite',
		'/** @see {@link https://defold.com/ref/stable/sprite/|API Documentation} */\ndeclare namespace sprite',
	],
	[
		'declare namespace tilemap',
		'/** @see {@link https://defold.com/ref/stable/tilemap/|API Documentation} */\ndeclare namespace tilemap',
	],
];
