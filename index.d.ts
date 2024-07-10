/** @noSelfInFile */
/// <reference types="lua-types/5.1" />
/// <reference types="@typescript-to-lua/language-extensions" />

// DEFOLD. stable version 1.9.0 (d6882f432beca85d460ec42497888157c356d058)
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/**
 * A unique identifier used to reference resources, messages, properties, and other entities within the game.
 */
declare type hash = Readonly<
	LuaUserdata & {
		readonly __hash__: unique symbol;
	}
>;

/**
 * A reference to game resources, such as game objects, components, and assets.
 */
declare type url = {
	socket: hash;
	path: hash;
	fragment: hash | undefined;
};

declare type node = Readonly<
	LuaUserdata & {
		readonly __node__: unique symbol;
	}
>;

/**
 * A block of memory that can store binary data.
 */
declare type buffer = object;

/**
 * Render pipeline predicate.
 */
declare type predicate = Readonly<
	LuaUserdata & {
		readonly __predicate__: unique symbol;
	}
>;

/**
 * Render pipeline target.
 */
declare type rendertarget = Readonly<
	LuaUserdata & {
		readonly __rendertarget__: unique symbol;
	}
>;

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
	export function on(
		fn: (...args: any[]) => unknown,
		recursive?: boolean,
	): void;
	/** Disable JIT compilation for a Lua function. */
	export function off(
		fn: (...args: any[]) => unknown,
		recursive?: boolean,
	): void;
	/** Enable JIT compilation for a module. */
	export function on(arg1: true, recursive?: boolean): void;
	/** Disable JIT compilation for a module. */
	export function off(arg1: true, recursive?: boolean): void;
	/**
	 * Attach a handler to the compiler pipeline with the given priority.
	 * The handler is detached if no priority is given.
	 */
	export function attach(
		handler: (...args: any[]) => unknown,
		priority?: number,
	): void;
	export function security(): void;
	export function flush(): void;
	export const arch: string;
	/** Contains the version number of the LuaJIT core.  */
	export const version_num: number;
	/** Contains the LuaJIT version string. */
	export const version: string;
	export const os: string;
}

declare type bufferstream = LuaUserdata & number[] & object;

/** @see {@link https://defold.com/ref/stable/vmath/|Documentation} */
declare namespace vmath {
	export type vector3 = number & {
		x: number;
		y: number;
		z: number;
	};

	export type vector4 = number & {
		x: number;
		y: number;
		z: number;
		w: number;
	};

	export type matrix4 = number & {
		c0: vmath.vector4;
		c1: vmath.vector4;
		c2: vmath.vector4;
		c3: vmath.vector4;
		m01: number;
		m02: number;
		m03: number;
		m04: number;
		m11: number;
		m12: number;
		m13: number;
		m14: number;
		m21: number;
		m22: number;
		m23: number;
		m24: number;
		m31: number;
		m32: number;
		m33: number;
		m34: number;
	};

	export type quaternion = number & {
		x: number;
		y: number;
		z: number;
		w: number;
	};
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/**
 * All ids in the engine are represented as hashes, so a string needs to be hashed
 * before it can be compared with an id.
 * @param s  string to hash
 * @returns hash  a hashed string
 * @see {@link https://defold.com/ref/stable/builtins/#hash:s|Documentation}
 */
declare function hash(s: string): hash;

/**
 * Returns a hexadecimal representation of a hash value.
 * The returned string is always padded with leading zeros.
 * @param h  hash value to get hex string for
 * @returns hex  hex representation of the hash
 */
declare function hash_to_hex(h: hash): string;

/**
 * Pretty printing of Lua values. This function prints Lua values
 * in a manner similar to +print()+, but will also recurse into tables
 * and pretty print them. There is a limit to how deep the function
 * will recurse.
 * @param v  value to print
 */
declare function pprint(...v: any[]): void;

// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/socket/|Documentation} */
declare namespace socket {
	/**
	 * max numbers of sockets the select function can handle
	 */
	export const _SETSIZE: number;

	/**
	 * the current LuaSocket version
	 */
	export const _VERSION: string;

	/**
	 * This function is a shortcut that creates and returns a TCP client object connected to a remote
	 * address at a given port. Optionally, the user can also specify the local address and port to
	 * bind (`locaddr` and `locport`), or restrict the socket family to `"inet"` or `"inet6"`.
	 * Without specifying family to connect, whether a tcp or tcp6 connection is created depends on
	 * your system configuration.
	 * @param address  the address to connect to.
	 * @param port  the port to connect to.
	 * @param locaddr  optional local address to bind to.
	 * @param locport  optional local port to bind to.
	 * @param family  optional socket family to use, `"inet"` or `"inet6"`.
	 * @returns tcp_client  a new IPv6 TCP client object, or `undefined` in case of error.
	 * @returns error  the error message, or `undefined` if no error occurred.
	 */
	export function connect(
		address: string,
		port: number,
		locaddr?: string,
		locport?: number,
		family?: 'inet' | 'inet6',
	): LuaMultiReturn<[socketclient | undefined, string | undefined]>;

	/**
	 * Returns the time in seconds, relative to the system epoch (Unix epoch time since January 1, 1970 (UTC) or Windows file time since January 1, 1601 (UTC)).
	 * You should use the values returned by this function for relative measurements only.
	 * @returns seconds  the number of seconds elapsed.
	 */
	export function gettime(): number;

	/**
	 * This function creates and returns a clean try function that allows for cleanup before the exception is raised.
	 * The `finalizer` function will be called in protected mode (see protect).
	 * @param finalizer  a function that will be called before the try throws the exception.
	 * @returns try  the customized try function.
	 */
	export function newtry(
		finalizer: (...args: any[]) => unknown,
	): (...args: any[]) => unknown;

	/**
	 * Converts a function that throws exceptions into a safe function. This function only catches exceptions thrown by try functions. It does not catch normal Lua errors.
	 * ⚠ Beware that if your function performs some illegal operation that raises an error, the protected function will catch the error and return it as a string. This is because try functions uses errors as the mechanism to throw exceptions.
	 * @param func  a function that calls a try function (or assert, or error) to throw exceptions.
	 * @returns safe_func  an equivalent function that instead of throwing exceptions, returns `undefined` followed by an error message.
	 */
	export function protect(
		func: (...args: any[]) => unknown,
	): (...args: any[]) => unknown;

	/**
	 * The function returns a list with the sockets ready for reading, a list with the sockets ready for writing and an error message. The error message is "timeout" if a timeout condition was met and undefined otherwise. The returned tables are doubly keyed both by integers and also by the sockets themselves, to simplify the test if a specific socket has changed status.
	 * `Recvt` and `sendt` parameters can be empty tables or `undefined`. Non-socket values (or values with non-numeric indices) in these arrays will be silently ignored.
	 * The returned tables are doubly keyed both by integers and also by the sockets themselves, to simplify the test if a specific socket has changed status.
	 * ⚠ This function can monitor a limited number of sockets, as defined by the constant socket._SETSIZE. This number may be as high as 1024 or as low as 64 by default, depending on the system. It is usually possible to change this at compile time. Invoking select with a larger number of sockets will raise an error.
	 * ⚠ A known bug in WinSock causes select to fail on non-blocking TCP sockets. The function may return a socket as writable even though the socket is not ready for sending.
	 * ⚠ Calling select with a server socket in the receive parameter before a call to accept does not guarantee accept will return immediately. Use the settimeout method or accept might block forever.
	 * ⚠ If you close a socket and pass it to select, it will be ignored.
	 * (Using select with non-socket objects: Any object that implements `getfd` and `dirty` can be used with select, allowing objects from other libraries to be used within a socket.select driven loop.)
	 * @param recvt  array with the sockets to test for characters available for reading.
	 * @param sendt  array with sockets that are watched to see if it is OK to immediately write on them.
	 * @param timeout  the maximum amount of time (in seconds) to wait for a change in status. Undefined, negative or omitted timeout value allows the function to block indefinitely.
	 * @returns sockets_r  a list with the sockets ready for reading.
	 * @returns sockets_w  a list with the sockets ready for writing.
	 * @returns error  an error message. "timeout" if a timeout condition was met, otherwise `undefined`.
	 */
	export function select(
		recvt: any[],
		sendt: any[],
		timeout?: number,
	): LuaMultiReturn<[unknown[], unknown[], string | undefined]>;

	/**
	 * This function drops a number of arguments and returns the remaining.
	 * It is useful to avoid creation of dummy variables:
	 * `D` is the number of arguments to drop. `Ret1` to `retN` are the arguments.
	 * The function returns `retD+1` to `retN`.
	 * @param d  the number of arguments to drop.
	 * @param ret1  argument 1.
	 * @param ret2  argument 2.
	 * @param retN  argument N.
	 * @returns retD_1  argument D+1.
	 * @returns retD_2  argument D+2.
	 * @returns retN  argument N.
	 */

	export function skip(
		d: number,
		ret1?: unknown,
		ret2?: unknown,
		retN?: unknown,
	): LuaMultiReturn<
		[unknown | undefined, unknown | undefined, unknown | undefined]
	>;

	/**
	 * Freezes the program execution during a given amount of time.
	 * @param time  the number of seconds to sleep for.
	 */
	export function sleep(time: number): void;

	/**
	 * Creates and returns an IPv4 TCP master object. A master object can be transformed into a server object with the method `listen` (after a call to `bind`) or into a client object with the method `connect`. The only other method supported by a master object is the `close` method.
	 * @returns tcp_master  a new IPv4 TCP master object, or `undefined` in case of error.
	 * @returns error  the error message, or `undefined` if no error occurred.
	 */
	export function tcp(): LuaMultiReturn<
		[socketmaster | undefined, string | undefined]
	>;

	/**
	 * Creates and returns an IPv6 TCP master object. A master object can be transformed into a server object with the method `listen` (after a call to `bind`) or into a client object with the method connect. The only other method supported by a master object is the close method.
	 * Note: The TCP object returned will have the option "ipv6-v6only" set to true.
	 * @returns tcp_master  a new IPv6 TCP master object, or `undefined` in case of error.
	 * @returns error  the error message, or `undefined` if no error occurred.
	 */
	export function tcp6(): LuaMultiReturn<
		[socketmaster | undefined, string | undefined]
	>;

	/**
	 * Creates and returns an unconnected IPv4 UDP object. Unconnected objects support the `sendto`, `receive`, `receivefrom`, `getoption`, `getsockname`, `setoption`, `settimeout`, `setpeername`, `setsockname`, and `close` methods. The `setpeername` method is used to connect the object.
	 * @returns udp_unconnected  a new unconnected IPv4 UDP object, or `undefined` in case of error.
	 * @returns error  the error message, or `undefined` if no error occurred.
	 */
	export function udp(): LuaMultiReturn<
		[socketunconnected | undefined, string | unknown]
	>;

	/**
	 * Creates and returns an unconnected IPv6 UDP object. Unconnected objects support the `sendto`, `receive`, `receivefrom`, `getoption`, `getsockname`, `setoption`, `settimeout`, `setpeername`, `setsockname`, and `close` methods. The `setpeername` method is used to connect the object.
	 * Note: The UDP object returned will have the option "ipv6-v6only" set to true.
	 * @returns udp_unconnected  a new unconnected IPv6 UDP object, or `undefined` in case of error.
	 * @returns error  the error message, or `undefined` if no error occurred.
	 */
	export function udp6(): LuaMultiReturn<
		[socketunconnected | undefined, string | unknown]
	>;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/b2d/|Box2D Documentation} @since 1.8.0 */
declare namespace b2d {
	/**
	 * Get the Box2D body from a collision object
	 * @param url  the url to the game object collision component
	 * @returns body  the body if successful. Otherwise `undefined`.
	 */
	export function get_body(
		url: hash | url | string,
	): typeof b2d.body | undefined;

	/**
	 * Get the Box2D world from the current collection
	 * @returns world  the world if successful. Otherwise `undefined`.
	 */
	export function get_world(): AnyNotNil | undefined;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/b2d.body/|Box2D b2Body Documentation} */
declare namespace b2d.body {
	/**
	 * Dynamic body
	 */
	export const B2_DYNAMIC_BODY: number & { readonly _B2DBODY_: unique symbol };

	/**
	 * Kinematic body
	 */
	export const B2_KINEMATIC_BODY: number & {
		readonly _B2DBODY_: unique symbol;
	};

	/**
	 * Static (immovable) body
	 */
	export const B2_STATIC_BODY: number & { readonly _B2DBODY_: unique symbol };

	/**
	 * Apply an angular impulse.
	 * @param body  body
	 * @param impulse  impulse the angular impulse in units of kg*m*m/s
	 */
	export function apply_angular_impulse(
		body: typeof b2d.body,
		impulse: number,
	): void;

	/**
	 * Apply a force at a world point. If the force is not
	 * applied at the center of mass, it will generate a torque and
	 * affect the angular velocity. This wakes up the body.
	 * @param body  body
	 * @param force  the world force vector, usually in Newtons (N).
	 * @param point  the world position of the point of application.
	 */
	export function apply_force(
		body: typeof b2d.body,
		force: vmath.vector3,
		point: vmath.vector3,
	): void;

	/**
	 * Apply a force to the center of mass. This wakes up the body.
	 * @param body  body
	 * @param force  the world force vector, usually in Newtons (N).
	 */
	export function apply_force_to_center(
		body: typeof b2d.body,
		force: vmath.vector3,
	): void;

	/**
	 * Apply an impulse at a point. This immediately modifies the velocity.
	 * It also modifies the angular velocity if the point of application
	 * is not at the center of mass. This wakes up the body.
	 * @param body  body
	 * @param impulse  the world impulse vector, usually in N-seconds or kg-m/s.
	 * @param point  the world position of the point of application.
	 */
	export function apply_linear_impulse(
		body: typeof b2d.body,
		impulse: vmath.vector3,
		point: vmath.vector3,
	): void;

	/**
	 * Apply a torque. This affects the angular velocity
	 * without affecting the linear velocity of the center of mass.
	 * This wakes up the body.
	 * @param body  body
	 * @param torque  torque about the z-axis (out of the screen), usually in N-m.
	 */
	export function apply_torque(body: typeof b2d.body, torque: number): void;

	/**
	 * Print the body representation to the log output
	 * @param body  body
	 */
	export function dump(body: typeof b2d.body): void;

	/**
	 * Get the angular damping of the body.
	 * @param body  body
	 * @returns damping  the damping
	 */
	export function get_angular_damping(body: typeof b2d.body): number;

	/**
	 * Get the angular velocity.
	 * @param body  body
	 * @returns velocity  the angular velocity in radians/second.
	 */
	export function get_angular_velocity(body: typeof b2d.body): number;

	/**
	 * Get the gravity scale of the body.
	 * @param body  body
	 * @returns scale  the scale
	 */
	export function get_gravity_scale(body: typeof b2d.body): number;

	/**
	 * Get the rotational inertia of the body about the local origin.
	 * @param body  body
	 * @returns inertia  the rotational inertia, usually in kg-m^2.
	 */
	export function get_inertia(body: typeof b2d.body): number;

	/**
	 * Get the linear damping of the body.
	 * @param body  body
	 * @returns damping  the damping
	 */
	export function get_linear_damping(body: typeof b2d.body): number;

	/**
	 * Get the linear velocity of the center of mass.
	 * @param body  body
	 * @returns velocity  the linear velocity of the center of mass.
	 */
	export function get_linear_velocity(body: typeof b2d.body): vmath.vector3;

	/**
	 * Get the world velocity of a local point.
	 * @param body  body
	 * @param local_point  a point in local coordinates.
	 * @returns velocity  the world velocity of a point.
	 */
	export function get_linear_velocity_from_local_point(
		body: typeof b2d.body,
		local_point: vmath.vector3,
	): vmath.vector3;

	/**
	 * Get the world linear velocity of a world point attached to this body.
	 * @param body  body
	 * @param world_point  a point in world coordinates.
	 * @returns velocity  the world velocity of a point.
	 */
	export function get_linear_velocity_from_world_point(
		body: typeof b2d.body,
		world_point: vmath.vector3,
	): vmath.vector3;

	/**
	 * Get the local position of the center of mass.
	 * @param body  body
	 * @returns center  Get the local position of the center of mass.
	 */
	export function get_local_center(body: typeof b2d.body): vmath.vector3;

	/**
	 * Gets a local point relative to the body's origin given a world point.
	 * @param body  body
	 * @param world_point  a point in world coordinates.
	 * @returns vector  the corresponding local point relative to the body's origin.
	 */
	export function get_local_point(
		body: typeof b2d.body,
		world_point: vmath.vector3,
	): vmath.vector3;

	/**
	 * Gets a local vector given a world vector.
	 * @param body  body
	 * @param world_vector  a vector in world coordinates.
	 * @returns vector  the corresponding local vector.
	 */
	export function get_local_vector(
		body: typeof b2d.body,
		world_vector: vmath.vector3,
	): vmath.vector3;

	/**
	 * Get the total mass of the body.
	 * @param body  body
	 * @returns mass  the mass, usually in kilograms (kg).
	 */
	export function get_mass(body: typeof b2d.body): number;

	/**
	 * Get the next body in the world's body list.
	 * @param body  body
	 * @returns body  the next body
	 */
	export function get_next(body: typeof b2d.body): AnyNotNil | undefined;

	/**
	 * Get the world body origin position.
	 * @param body  body
	 * @returns position  the world position of the body's origin.
	 */
	export function get_position(body: typeof b2d.body): vmath.vector3;

	/**
	 * Get the type of this body.
	 * @param body  body
	 * @returns type  the body type
	 */
	export function get_type(body: typeof b2d.body): AnyNotNil | undefined;

	/**
	 * Get the parent world of this body.
	 * @param body  body
	 * @returns world
	 */
	export function get_world(body: typeof b2d.body): AnyNotNil | undefined;

	/**
	 * Get the angle in radians.
	 * @param body  body
	 * @returns angle  the current world rotation angle in radians.
	 */
	export function get_world_center(body: typeof b2d.body): number;

	/**
	 * Get the world position of the center of mass.
	 * @param body  body
	 * @returns center  Get the world position of the center of mass.
	 */
	export function get_world_center(body: typeof b2d.body): vmath.vector3;

	/**
	 * Get the world coordinates of a point given the local coordinates.
	 * @param body  body
	 * @param local_vector  localPoint a point on the body measured relative the the body's origin.
	 * @returns vector  the same point expressed in world coordinates.
	 */
	export function get_world_point(
		body: typeof b2d.body,
		local_vector: vmath.vector3,
	): vmath.vector3;

	/**
	 * Get the world coordinates of a vector given the local coordinates.
	 * @param body  body
	 * @param local_vector  a vector fixed in the body.
	 * @returns vector  the same vector expressed in world coordinates.
	 */
	export function get_world_vector(
		body: typeof b2d.body,
		local_vector: vmath.vector3,
	): vmath.vector3;

	/**
	 * Get the active state of the body.
	 * @param body  body
	 * @returns enabled  is the body active
	 */
	export function is_active(body: typeof b2d.body): AnyNotNil | undefined;

	/**
	 * Get the sleeping state of this body.
	 * @param body  body
	 * @returns enabled  true if the body is awake, false if it's sleeping.
	 */
	export function is_awake(body: typeof b2d.body): AnyNotNil | undefined;

	/**
	 * Is this body in bullet mode
	 * @param body  body
	 * @returns enabled  true if the body is in bullet mode
	 */
	export function is_bullet(body: typeof b2d.body): AnyNotNil | undefined;

	/**
	 * Does this body have fixed rotation?
	 * @param body  body
	 * @returns enabled  is the rotation fixed
	 */
	export function is_fixed_rotation(
		body: typeof b2d.body,
	): AnyNotNil | undefined;

	/**
	 * Is this body allowed to sleep
	 * @param body  body
	 * @returns enabled  true if the body is allowed to sleep
	 */
	export function is_sleeping_allowed(
		body: typeof b2d.body,
	): AnyNotNil | undefined;

	/**
	 * This resets the mass properties to the sum of the mass properties of the fixtures.
	 * This normally does not need to be called unless you called SetMassData to override
	 * @param body  body
	 */
	export function reset_mass_data(body: typeof b2d.body): void;

	/**
	 * Set the active state of the body. An inactive body is not
	 * simulated and cannot be collided with or woken up.
	 * If you pass a flag of true, all fixtures will be added to the
	 * broad-phase.
	 * If you pass a flag of false, all fixtures will be removed from
	 * the broad-phase and all contacts will be destroyed.
	 * Fixtures and joints are otherwise unaffected. You may continue
	 * to create/destroy fixtures and joints on inactive bodies.
	 * Fixtures on an inactive body are implicitly inactive and will
	 * not participate in collisions, ray-casts, or queries.
	 * Joints connected to an inactive body are implicitly inactive.
	 * An inactive body is still owned by a b2World object and remains
	 * in the body list.
	 * @param body  body
	 * @param enable  true if the body should be active
	 */
	export function set_active(body: typeof b2d.body, enable: boolean): void;

	/**
	 * Set the angular damping of the body.
	 * @param body  body
	 * @param damping  the damping
	 */
	export function set_angular_damping(
		body: typeof b2d.body,
		damping: number,
	): void;

	/**
	 * Set the angular velocity.
	 * @param body  body
	 * @param omega  the new angular velocity in radians/second.
	 */
	export function set_angular_velocity(
		body: typeof b2d.body,
		omega: number,
	): void;

	/**
	 * Set the sleep state of the body. A sleeping body has very low CPU cost.
	 * @param body  body
	 * @param enable  flag set to false to put body to sleep, true to wake it.
	 */
	export function set_awake(body: typeof b2d.body, enable: boolean): void;

	/**
	 * Should this body be treated like a bullet for continuous collision detection?
	 * @param body  body
	 * @param enable  if true, the body will be in bullet mode
	 */
	export function set_bullet(body: typeof b2d.body, enable: boolean): void;

	/**
	 * Set this body to have fixed rotation. This causes the mass to be reset.
	 * @param body  body
	 * @param enable  true if the rotation should be fixed
	 */
	export function set_fixed_rotation(
		body: typeof b2d.body,
		enable: boolean,
	): void;

	/**
	 * Set the gravity scale of the body.
	 * @param body  body
	 * @param scale  the scale
	 */
	export function set_gravity_scale(body: typeof b2d.body, scale: number): void;

	/**
	 * Set the linear damping of the body.
	 * @param body  body
	 * @param damping  the damping
	 */
	export function set_linear_damping(
		body: typeof b2d.body,
		damping: number,
	): void;

	/**
	 * Set the linear velocity of the center of mass.
	 * @param body  body
	 * @param velocity  the new linear velocity of the center of mass.
	 */
	export function set_linear_velocity(
		body: typeof b2d.body,
		velocity: vmath.vector3,
	): void;

	/**
	 * You can disable sleeping on this body. If you disable sleeping, the body will be woken.
	 * @param body  body
	 * @param enable  if false, the body will never sleep, and consume more CPU
	 */
	export function set_sleeping_allowed(
		body: typeof b2d.body,
		enable: boolean,
	): void;

	/**
	 * Set the position of the body's origin and rotation.
	 * This breaks any contacts and wakes the other bodies.
	 * Manipulating a body's transform may cause non-physical behavior.
	 * @param body  body
	 * @param position  the world position of the body's local origin.
	 * @param angle  the world position of the body's local origin.
	 */
	export function set_transform(
		body: typeof b2d.body,
		position: vmath.vector3,
		angle: number,
	): void;

	/**
	 * Set the type of this body. This may alter the mass and velocity.
	 * @param body  body
	 * @param type  the body type
	 */
	export function set_type(
		body: typeof b2d.body,
		type:
			| typeof b2d.body.B2_DYNAMIC_BODY
			| typeof b2d.body.B2_KINEMATIC_BODY
			| typeof b2d.body.B2_STATIC_BODY,
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/crash/|Documentation} */
declare namespace crash {
	/**
	 * android build fingerprint
	 */
	export const SYSFIELD_ANDROID_BUILD_FINGERPRINT: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * system device language as reported by sys.get_sys_info
	 */
	export const SYSFIELD_DEVICE_LANGUAGE: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * device model as reported by sys.get_sys_info
	 */
	export const SYSFIELD_DEVICE_MODEL: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * engine version as hash
	 */
	export const SYSFIELD_ENGINE_HASH: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * engine version as release number
	 */
	export const SYSFIELD_ENGINE_VERSION: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * system language as reported by sys.get_sys_info
	 */
	export const SYSFIELD_LANGUAGE: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * device manufacturer as reported by sys.get_sys_info
	 */
	export const SYSFIELD_MANUFACTURER: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * The max number of sysfields.
	 */
	export const SYSFIELD_MAX: number & { readonly _SYSFIELD_: unique symbol };

	/**
	 * system name as reported by sys.get_sys_info
	 */
	export const SYSFIELD_SYSTEM_NAME: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * system version as reported by sys.get_sys_info
	 */
	export const SYSFIELD_SYSTEM_VERSION: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * system territory as reported by sys.get_sys_info
	 */
	export const SYSFIELD_TERRITORY: number & {
		readonly _SYSFIELD_: unique symbol;
	};

	/**
	 * The max number of user fields.
	 */
	export const USERFIELD_MAX: number & { readonly _USERFIELD_: unique symbol };

	/**
	 * The max size of a single user field.
	 */
	export const USERFIELD_SIZE: number & { readonly _USERFIELD_: unique symbol };

	/**
	 * A table is returned containing the addresses of the call stack.
	 * @param handle  crash dump handle
	 * @returns backtrace  table containing the backtrace
	 */
	export function get_backtrace(handle: number): AnyNotNil | undefined;

	/**
	 * The format of read text blob is platform specific
	 * and not guaranteed
	 * but can be useful for manual inspection.
	 * @param handle  crash dump handle
	 * @returns blob  string with the platform specific data
	 */
	export function get_extra_data(handle: number): string;

	/**
	 * The function returns a table containing entries with sub-tables that
	 * have fields 'name' and 'address' set for all loaded modules.
	 * @param handle  crash dump handle
	 * @returns modules  module table
	 */
	export function get_modules(
		handle: number,
	): { name: unknown; address: unknown }[];

	/**
	 * read signal number from a crash report
	 * @param handle  crash dump handle
	 * @returns signal  signal number
	 */
	export function get_signum(handle: number): number;

	/**
	 * reads a system field from a loaded crash dump
	 * @param handle  crash dump handle
	 * @param index  system field enum. Must be less than crash.SYSFIELD_MAX
	 * @returns value  value recorded in the crash dump, or `undefined` if it didn't exist
	 */
	export function get_sys_field(
		handle: number,
		index: number,
	): string | undefined;

	/**
	 * reads user field from a loaded crash dump
	 * @param handle  crash dump handle
	 * @param index  user data slot index
	 * @returns value  user data value recorded in the crash dump
	 */
	export function get_user_field(handle: number, index: number): string;

	/**
	 * The crash dump will be removed from disk upon a successful
	 * load, so loading is one-shot.
	 * @returns handle  handle to the loaded dump, or `undefined` if no dump was found
	 */
	export function load_previous(): number | undefined;

	/**
	 * releases a previously loaded crash dump
	 * @param handle  handle to loaded crash dump
	 */
	export function release(handle: number): void;

	/**
	 * Crashes occuring before the path is set will be stored to a default engine location.
	 * @param path  file path to use
	 */
	export function set_file_path(path: string): void;

	/**
	 * Store a user value that will get written to a crash dump when
	 * a crash occurs. This can be user id:s, breadcrumb data etc.
	 * There are 32 slots indexed from 0. Each slot stores at most 255 characters.
	 * @param index  slot index. 0-indexed
	 * @param value  string value to store
	 */
	export function set_user_field(index: number, value: string): void;

	/**
	 * Performs the same steps as if a crash had just occured but
	 * allows the program to continue.
	 * The generated dump can be read by crash.load_previous
	 */
	export function write_dump(): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/go/|Documentation} */
declare namespace go {
	/**
	 * Post this message to a game object instance to make that instance acquire the user input focus.
	 * User input is distributed by the engine to every instance that has
	 * requested it. The last instance to request focus will receive it first.
	 * This means that the scripts in the instance will have first-hand-chance
	 * at reacting on user input, possibly consuming it (by returning
	 * `true` from `on_input`) so that no other instances
	 * can react on it. The most common case is for a script to send this message
	 * to itself when it needs to respond to user input.
	 * A script belonging to an instance which has the user input focus will
	 * receive the input actions in its `on_input` callback function.
	 * See on_input for more information on how user input can be
	 * handled.
	 */
	export type acquire_input_focus = 'acquire_input_focus';
	export type touch_input = {
		id: number;
		pressed: boolean;
		released: boolean;
		tap_count: number;
		x: number;
		y: number;
		dx: number;
		dy: number;
		acc_x?: number;
		acc_y?: number;
		acc_z?: number;
	};
	export type input_message = {
		value?: number;
		pressed?: boolean;
		released?: boolean;
		repeated?: boolean;
		x?: number;
		y?: number;
		screen_x?: number;
		screen_y?: number;
		dx?: number;
		dy?: number;
		screen_dx?: number;
		screen_dy?: number;
		gamepad?: number;
		touch?: touch_input[];
	};

	/**
	 * This message disables the receiving component. All components are enabled by default, which means they will receive input, updates
	 * and be a part of the simulation. A component is disabled when it receives the `disable` message.
	 * undefined Components that currently supports this message are:
	 *
	 * - Collection Proxy
	 * - Collision Object
	 * - Gui
	 * - Label
	 * - Spine Model
	 * - Sprite
	 * - Tile Grid
	 * - Model
	 * - Mesh
	 *
	 */
	export type disable = 'disable';

	/**
	 * This message enables the receiving component. All components are enabled by default, which means they will receive input, updates
	 * and be a part of the simulation. A component is disabled when it receives the `disable` message.
	 * undefined Components that currently supports this message are:
	 *
	 * - Collection Proxy
	 * - Collision Object
	 * - Gui
	 * - Label
	 * - Spine Model
	 * - Sprite
	 * - Tile Grid
	 * - Model
	 * - Mesh
	 *
	 */
	export type enable = 'enable';

	/**
	 * The rotation of the game object expressed in Euler angles.
	 * Euler angles are specified in degrees in the interval (-360, 360).
	 * The type of the property is vector3.
	 */
	export let euler: vmath.vector3;

	/**
	 * This is a callback-function, which is called by the engine at fixed intervals to update the state of a script
	 * component. The function will be called if 'Fixed Update Frequency' is enabled in the Engine section of game.project.
	 * It can for instance be used to update game logic with the physics simulation if using a fixed timestep for the
	 * physics (enabled by ticking 'Use Fixed Timestep' in the Physics section of game.project).
	 * @param self  reference to the script state to be used for storing data
	 * @param dt  the time-step of the frame update
	 */
	// export function fixed_update(self: object, dt: number): void

	/**
	 * in-back
	 */
	export const EASING_INBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * in-bounce
	 */
	export const EASING_INBOUNCE: number & { readonly _EASING_: unique symbol };

	/**
	 * in-circlic
	 */
	export const EASING_INCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-cubic
	 */
	export const EASING_INCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-elastic
	 */
	export const EASING_INELASTIC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-exponential
	 */
	export const EASING_INEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-back
	 */
	export const EASING_INOUTBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-bounce
	 */
	export const EASING_INOUTBOUNCE: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * in-out-circlic
	 */
	export const EASING_INOUTCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-cubic
	 */
	export const EASING_INOUTCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-elastic
	 */
	export const EASING_INOUTELASTIC: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * in-out-exponential
	 */
	export const EASING_INOUTEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-quadratic
	 */
	export const EASING_INOUTQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-quartic
	 */
	export const EASING_INOUTQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-quintic
	 */
	export const EASING_INOUTQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-sine
	 */
	export const EASING_INOUTSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * in-quadratic
	 */
	export const EASING_INQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * in-quartic
	 */
	export const EASING_INQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * in-quintic
	 */
	export const EASING_INQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * in-sine
	 */
	export const EASING_INSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * linear interpolation
	 */
	export const EASING_LINEAR: number & { readonly _EASING_: unique symbol };

	/**
	 * out-back
	 */
	export const EASING_OUTBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * out-bounce
	 */
	export const EASING_OUTBOUNCE: number & { readonly _EASING_: unique symbol };

	/**
	 * out-circlic
	 */
	export const EASING_OUTCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-cubic
	 */
	export const EASING_OUTCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-elastic
	 */
	export const EASING_OUTELASTIC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-exponential
	 */
	export const EASING_OUTEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-back
	 */
	export const EASING_OUTINBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-bounce
	 */
	export const EASING_OUTINBOUNCE: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * out-in-circlic
	 */
	export const EASING_OUTINCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-cubic
	 */
	export const EASING_OUTINCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-elastic
	 */
	export const EASING_OUTINELASTIC: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * out-in-exponential
	 */
	export const EASING_OUTINEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-quadratic
	 */
	export const EASING_OUTINQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-quartic
	 */
	export const EASING_OUTINQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-quintic
	 */
	export const EASING_OUTINQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-sine
	 */
	export const EASING_OUTINSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * out-quadratic
	 */
	export const EASING_OUTQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * out-quartic
	 */
	export const EASING_OUTQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * out-quintic
	 */
	export const EASING_OUTQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * out-sine
	 */
	export const EASING_OUTSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * loop backward
	 */
	export const PLAYBACK_LOOP_BACKWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * loop forward
	 */
	export const PLAYBACK_LOOP_FORWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * ping pong loop
	 */
	export const PLAYBACK_LOOP_PINGPONG: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * no playback
	 */
	export const PLAYBACK_NONE: number & { readonly _PLAYBACK_: unique symbol };

	/**
	 * once backward
	 */
	export const PLAYBACK_ONCE_BACKWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * once forward
	 */
	export const PLAYBACK_ONCE_FORWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * once ping pong
	 */
	export const PLAYBACK_ONCE_PINGPONG: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	* This is only supported for numerical properties. If the node property is already being
	* animated, that animation will be canceled and replaced by the new one.
	* If a `complete_function` (lua function) is specified, that function will be called when the animation has completed.
	* By starting a new animation in that function, several animations can be sequenced together. See the examples for more information.
	* ⚠ If you call `go.animate()` from a game object's `final()` function,
	* any passed `complete_function` will be ignored and never called upon animation completion.
	* See the properties guide for which properties can be animated and the animation guide for how
	* them.
	* @param url  url of the game object or component having the property
	* @param property  id of the property to animate
	* @param playback  playback mode of the animation

- `go.PLAYBACK_ONCE_FORWARD`
- `go.PLAYBACK_ONCE_BACKWARD`
- `go.PLAYBACK_ONCE_PINGPONG`
- `go.PLAYBACK_LOOP_FORWARD`
- `go.PLAYBACK_LOOP_BACKWARD`
- `go.PLAYBACK_LOOP_PINGPONG`

	* @param to  target property value
	* @param easing  easing to use during animation. Either specify a constant, see the animation guide for a complete list, or a vmath.vector with a curve
	* @param duration  duration of the animation in seconds
	* @param delay  delay before the animation starts in seconds
	* @param complete_function  optional function to call when the animation has completed

`this`

The current object.

`url`

The game object or component instance for which the property is animated.

`property`

The id of the animated property.


	*/
	export function animate(
		url: hash | url | string,
		property: hash | string,
		playback:
			typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_PINGPONG | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG,
		to: vmath.quaternion | vmath.vector3 | vmath.vector4 | number,
		easing:
			| vmath.vector3
			| typeof go.EASING_INBACK
			| typeof go.EASING_INBOUNCE
			| typeof go.EASING_INCIRC
			| typeof go.EASING_INCUBIC
			| typeof go.EASING_INELASTIC
			| typeof go.EASING_INEXPO
			| typeof go.EASING_INOUTBACK
			| typeof go.EASING_INOUTBOUNCE
			| typeof go.EASING_INOUTCIRC
			| typeof go.EASING_INOUTCUBIC
			| typeof go.EASING_INOUTELASTIC
			| typeof go.EASING_INOUTEXPO
			| typeof go.EASING_INOUTQUAD
			| typeof go.EASING_INOUTQUART
			| typeof go.EASING_INOUTQUINT
			| typeof go.EASING_INOUTSINE
			| typeof go.EASING_INQUAD
			| typeof go.EASING_INQUART
			| typeof go.EASING_INQUINT
			| typeof go.EASING_INSINE
			| typeof go.EASING_LINEAR
			| typeof go.EASING_OUTBACK
			| typeof go.EASING_OUTBOUNCE
			| typeof go.EASING_OUTCIRC
			| typeof go.EASING_OUTCUBIC
			| typeof go.EASING_OUTELASTIC
			| typeof go.EASING_OUTEXPO
			| typeof go.EASING_OUTINBACK
			| typeof go.EASING_OUTINBOUNCE
			| typeof go.EASING_OUTINCIRC
			| typeof go.EASING_OUTINCUBIC
			| typeof go.EASING_OUTINELASTIC
			| typeof go.EASING_OUTINEXPO
			| typeof go.EASING_OUTINQUAD
			| typeof go.EASING_OUTINQUART
			| typeof go.EASING_OUTINQUINT
			| typeof go.EASING_OUTINSINE
			| typeof go.EASING_OUTQUAD
			| typeof go.EASING_OUTQUART
			| typeof go.EASING_OUTQUINT
			| typeof go.EASING_OUTSINE,
		duration: number,
		delay?: number,
		complete_function?: (this: any, url: url, property: hash) => void,
	): void;

	/**
	 * By calling this function, all or specified stored property animations of the game object or component will be canceled.
	 * See the properties guide for which properties can be animated and the animation guide for how to animate them.
	 * @param url  url of the game object or component
	 * @param property  optional id of the property to cancel
	 */
	export function cancel_animations(
		url: hash | url | string,
		property?: hash | string,
	): void;

	/**
	 * Delete one or more game objects identified by id. Deletion is asynchronous meaning that
	 * the game object(s) are scheduled for deletion which will happen at the end of the current
	 * frame. Note that game objects scheduled for deletion will be counted against
	 * `max_instances` in "game.project" until they are actually removed.
	 * ⚠ Deleting a game object containing a particle FX component emitting particles will not immediately stop the particle FX from emitting particles. You need to manually stop the particle FX using `particlefx.stop()`.
	 * ⚠ Deleting a game object containing a sound component that is playing will not immediately stop the sound from playing. You need to manually stop the sound using `sound.stop()`.
	 * @param id  optional id or table of id's of the instance(s) to delete, the instance of the calling script is deleted by default
	 * @param recursive  optional boolean, set to true to recursively delete child hiearchy in child to parent order
	 */
	function delete$(
		id?: Array<hash | url | string> | hash | url | string,
		recursive?: boolean,
	): void;
	export { delete$ as delete };

	/**
	 * check if the specified game object exists
	 * @param url  url of the game object to check
	 * @returns exists  true if the game object exists
	 */
	export function exists(url: hash | url | string): boolean;

	/**
	* gets a named property of the specified game object or component
	* @param url  url of the game object or component having the property
	* @param property  id of the property to retrieve
	* @param options  optional options table
index into array property (1 based)
name of internal property
	* @returns value  the value of the specified property
	*/
	export function get(
		url: hash | url | string,
		property: hash | string,
		options?: any,
	): AnyNotNil | undefined;

	/**
	 * Returns or constructs an instance identifier. The instance id is a hash
	 * of the absolute path to the instance.
	 *
	 * - If `path` is specified, it can either be absolute or relative to the instance of the calling script.
	 * - If `path` is not specified, the id of the game object instance the script is attached to will be returned.
	 *
	 * @param path  path of the instance for which to return the id
	 * @returns id  instance id
	 */
	export function get_id(path?: string): hash;

	/**
	 * Get the parent for a game object instance.
	 * @param id  optional id of the game object instance to get parent for, defaults to the instance containing the calling script
	 * @returns parent_id  parent instance or `undefined`
	 */
	export function get_parent(id?: hash | url | string): hash | undefined;

	/**
	 * The position is relative the parent (if any). Use go.get_world_position to retrieve the global world position.
	 * @param id  optional id of the game object instance to get the position for, by default the instance of the calling script
	 * @returns position  instance position
	 */
	export function get_position(id?: hash | url | string): vmath.vector3;

	/**
	 * The rotation is relative to the parent (if any). Use go.get_world_rotation to retrieve the global world rotation.
	 * @param id  optional id of the game object instance to get the rotation for, by default the instance of the calling script
	 * @returns rotation  instance rotation
	 */
	export function get_rotation(id?: hash | url | string): vmath.quaternion;

	/**
	 * The scale is relative the parent (if any). Use go.get_world_scale to retrieve the global world 3D scale factor.
	 * @param id  optional id of the game object instance to get the scale for, by default the instance of the calling script
	 * @returns scale  instance scale factor
	 */
	export function get_scale(id?: hash | url | string): vmath.vector3;

	/**
	 * The uniform scale is relative the parent (if any). If the underlying scale vector is non-uniform the min element of the vector is returned as the uniform scale factor.
	 * @param id  optional id of the game object instance to get the uniform scale for, by default the instance of the calling script
	 * @returns scale  uniform instance scale factor
	 */
	export function get_scale_uniform(id?: hash | url | string): number;

	/**
	 * The function will return the world position calculated at the end of the previous frame.
	 * Use go.get_position to retrieve the position relative to the parent.
	 * @param id  optional id of the game object instance to get the world position for, by default the instance of the calling script
	 * @returns position  instance world position
	 */
	export function get_world_position(id?: hash | url | string): vmath.vector3;

	/**
	 * The function will return the world rotation calculated at the end of the previous frame.
	 * Use go.get_rotation to retrieve the rotation relative to the parent.
	 * @param id  optional id of the game object instance to get the world rotation for, by default the instance of the calling script
	 * @returns rotation  instance world rotation
	 */
	export function get_world_rotation(
		id?: hash | url | string,
	): vmath.quaternion;

	/**
	 * The function will return the world 3D scale factor calculated at the end of the previous frame.
	 * Use go.get_scale to retrieve the 3D scale factor relative to the parent.
	 * This vector is derived by decomposing the transformation matrix and should be used with care.
	 * For most cases it should be fine to use go.get_world_scale_uniform instead.
	 * @param id  optional id of the game object instance to get the world scale for, by default the instance of the calling script
	 * @returns scale  instance world 3D scale factor
	 */
	export function get_world_scale(id?: hash | url | string): vmath.vector3;

	/**
	 * The function will return the world scale factor calculated at the end of the previous frame.
	 * Use go.get_scale_uniform to retrieve the scale factor relative to the parent.
	 * @param id  optional id of the game object instance to get the world scale for, by default the instance of the calling script
	 * @returns scale  instance world scale factor
	 */
	export function get_world_scale_uniform(id?: hash | url | string): number;

	/**
	 * The function will return the world transform matrix calculated at the end of the previous frame.
	 * @param id  optional id of the game object instance to get the world transform for, by default the instance of the calling script
	 * @returns transform  instance world transform
	 */
	export function get_world_transform(id?: hash | url | string): vmath.matrix4;

	/**
	 * This function defines a property which can then be used in the script through the self-reference.
	 * The properties defined this way are automatically exposed in the editor in game objects and collections which use the script.
	 * Note that you can only use this function outside any callback-functions like init and update.
	 * @param name  the id of the property
	 * @param value  default value of the property. In the case of a url, only the empty constructor msg.url() is allowed. In the case of a resource one of the resource constructors (eg resource.atlas(), resource.font() etc) is expected.
	 */
	export function property(name: string, value: any): void;

	/**
	* sets a named property of the specified game object or component, or a material constant
	* @param url  url of the game object or component having the property
	* @param property  id of the property to set
	* @param value  the value to set
	* @param options  optional options table
index into array property (1 based)
name of internal property
	*/
	export function set(
		url: hash | url | string,
		property: hash | string,
		value: any,
		options?: any,
	): void;

	/**
	 * Sets the parent for a game object instance. This means that the instance will exist in the geometrical space of its parent,
	 * like a basic transformation hierarchy or scene graph. If no parent is specified, the instance will be detached from any parent and exist in world
	 * space.
	 * This function will generate a `set_parent` message. It is not until the message has been processed that the change actually takes effect. This
	 * typically happens later in the same frame or the beginning of the next frame. Refer to the manual to learn how messages are processed by the
	 * engine.
	 * @param id  optional id of the game object instance to set parent for, defaults to the instance containing the calling script
	 * @param parent_id  optional id of the new parent game object, defaults to detaching game object from its parent
	 * @param keep_world_transform  optional boolean, set to true to maintain the world transform when changing spaces. Defaults to false.
	 */
	export function set_parent(
		id?: hash | url | string,
		parent_id?: hash | url | string,
		keep_world_transform?: boolean,
	): void;

	/**
	 * The position is relative to the parent (if any). The global world position cannot be manually set.
	 * @param position  position to set
	 * @param id  optional id of the game object instance to set the position for, by default the instance of the calling script
	 */
	export function set_position(
		position: vmath.vector3,
		id?: hash | url | string,
	): void;

	/**
	 * The rotation is relative to the parent (if any). The global world rotation cannot be manually set.
	 * @param rotation  rotation to set
	 * @param id  optional id of the game object instance to get the rotation for, by default the instance of the calling script
	 */
	export function set_rotation(
		rotation: vmath.quaternion,
		id?: hash | url | string,
	): void;

	/**
	 * The scale factor is relative to the parent (if any). The global world scale factor cannot be manually set.
	 * ⚠ Physics are currently not affected when setting scale from this function.
	 * @param scale  vector or uniform scale factor, must be greater than 0
	 * @param id  optional id of the game object instance to get the scale for, by default the instance of the calling script
	 */
	export function set_scale(
		scale: vmath.vector3 | number,
		id?: hash | url | string,
	): void;

	/**
	 * ⚠ The function uses world transformation calculated at the end of previous frame.
	 * @param position  position which need to be converted
	 * @param url  url of the game object which coordinate system convert to
	 * @returns converted_postion  converted position
	 */
	export function world_to_local_position(
		position: vmath.vector3,
		url: hash | url | string,
	): vmath.vector3;

	/**
	 * ⚠ The function uses world transformation calculated at the end of previous frame.
	 * @param transformation  transformation which need to be converted
	 * @param url  url of the game object which coordinate system convert to
	 * @returns converted_transform  converted transformation
	 */
	export function world_to_local_transform(
		transformation: vmath.matrix4,
		url: hash | url | string,
	): vmath.matrix4;

	/**
	 * The position of the game object.
	 * The type of the property is vector3.
	 */
	export let position: vmath.vector3;

	/**
	 * Post this message to an instance to make that instance release the user input focus.
	 * See acquire_input_focus for more information on how the user input handling
	 * works.
	 */
	export type release_input_focus = 'release_input_focus';

	/**
	 * The rotation of the game object.
	 * The type of the property is quaternion.
	 */
	export let rotation: vmath.quaternion;

	/**
	 * The uniform scale of the game object. The type of the property is number.
	 */
	export let scale: number;

	/**
	 * When this message is sent to an instance, it sets the parent of that instance. This means that the instance will exist
	 * in the geometrical space of its parent, like a basic transformation hierarchy or scene graph. If no parent is specified,
	 * the instance will be detached from any parent and exist in world space. A script can send this message to itself to set
	 * the parent of its instance.
	 */
	export type set_parent = 'set_parent';
	export type set_parent_message = {
		parent_id: hash;
		keep_world_transform?: number;
	};
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/gui/|Documentation} */
declare namespace gui {
	/**
	 * The fonts used in the gui. The type of the property is hash.
	 * Key must be specified in options table.
	 */
	export let fonts: hash;

	/**
	 * fit adjust mode
	 */
	export const ADJUST_FIT: number & { readonly _ADJUST_: unique symbol };

	/**
	 * stretch adjust mode
	 */
	export const ADJUST_STRETCH: number & { readonly _ADJUST_: unique symbol };

	/**
	 * zoom adjust mode
	 */
	export const ADJUST_ZOOM: number & { readonly _ADJUST_: unique symbol };

	/**
	 * bottom y-anchor
	 */
	export const ANCHOR_BOTTOM: number & { readonly _ANCHOR_: unique symbol };

	/**
	 * left x-anchor
	 */
	export const ANCHOR_LEFT: number & { readonly _ANCHOR_: unique symbol };

	/**
	 * no anchor
	 */
	export const ANCHOR_NONE: number & { readonly _ANCHOR_: unique symbol };

	/**
	 * right x-anchor
	 */
	export const ANCHOR_RIGHT: number & { readonly _ANCHOR_: unique symbol };

	/**
	 * top y-anchor
	 */
	export const ANCHOR_TOP: number & { readonly _ANCHOR_: unique symbol };

	/**
	 * additive blending
	 */
	export const BLEND_ADD: number & { readonly _BLEND_: unique symbol };

	/**
	 * additive alpha blending
	 */
	export const BLEND_ADD_ALPHA: number & { readonly _BLEND_: unique symbol };

	/**
	 * alpha blending
	 */
	export const BLEND_ALPHA: number & { readonly _BLEND_: unique symbol };

	/**
	 * multiply blending
	 */
	export const BLEND_MULT: number & { readonly _BLEND_: unique symbol };

	/**
	 * screen blending
	 */
	export const BLEND_SCREEN: number & { readonly _BLEND_: unique symbol };

	/**
	 * clipping mode none
	 */
	export const CLIPPING_MODE_NONE: number & {
		readonly _CLIPPING_MODE_: unique symbol;
	};

	/**
	 * clipping mode stencil
	 */
	export const CLIPPING_MODE_STENCIL: number & {
		readonly _CLIPPING_MODE_: unique symbol;
	};

	/**
	 * in-back
	 */
	export const EASING_INBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * in-bounce
	 */
	export const EASING_INBOUNCE: number & { readonly _EASING_: unique symbol };

	/**
	 * in-circlic
	 */
	export const EASING_INCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-cubic
	 */
	export const EASING_INCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-elastic
	 */
	export const EASING_INELASTIC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-exponential
	 */
	export const EASING_INEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-back
	 */
	export const EASING_INOUTBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-bounce
	 */
	export const EASING_INOUTBOUNCE: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * in-out-circlic
	 */
	export const EASING_INOUTCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-cubic
	 */
	export const EASING_INOUTCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-elastic
	 */
	export const EASING_INOUTELASTIC: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * in-out-exponential
	 */
	export const EASING_INOUTEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-quadratic
	 */
	export const EASING_INOUTQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-quartic
	 */
	export const EASING_INOUTQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-quintic
	 */
	export const EASING_INOUTQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * in-out-sine
	 */
	export const EASING_INOUTSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * in-quadratic
	 */
	export const EASING_INQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * in-quartic
	 */
	export const EASING_INQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * in-quintic
	 */
	export const EASING_INQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * in-sine
	 */
	export const EASING_INSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * linear interpolation
	 */
	export const EASING_LINEAR: number & { readonly _EASING_: unique symbol };

	/**
	 * out-back
	 */
	export const EASING_OUTBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * out-bounce
	 */
	export const EASING_OUTBOUNCE: number & { readonly _EASING_: unique symbol };

	/**
	 * out-circlic
	 */
	export const EASING_OUTCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-cubic
	 */
	export const EASING_OUTCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-elastic
	 */
	export const EASING_OUTELASTIC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-exponential
	 */
	export const EASING_OUTEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-back
	 */
	export const EASING_OUTINBACK: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-bounce
	 */
	export const EASING_OUTINBOUNCE: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * out-in-circlic
	 */
	export const EASING_OUTINCIRC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-cubic
	 */
	export const EASING_OUTINCUBIC: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-elastic
	 */
	export const EASING_OUTINELASTIC: number & {
		readonly _EASING_: unique symbol;
	};

	/**
	 * out-in-exponential
	 */
	export const EASING_OUTINEXPO: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-quadratic
	 */
	export const EASING_OUTINQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-quartic
	 */
	export const EASING_OUTINQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-quintic
	 */
	export const EASING_OUTINQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * out-in-sine
	 */
	export const EASING_OUTINSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * out-quadratic
	 */
	export const EASING_OUTQUAD: number & { readonly _EASING_: unique symbol };

	/**
	 * out-quartic
	 */
	export const EASING_OUTQUART: number & { readonly _EASING_: unique symbol };

	/**
	 * out-quintic
	 */
	export const EASING_OUTQUINT: number & { readonly _EASING_: unique symbol };

	/**
	 * out-sine
	 */
	export const EASING_OUTSINE: number & { readonly _EASING_: unique symbol };

	/**
	 * default keyboard
	 */
	export const KEYBOARD_TYPE_DEFAULT: number & {
		readonly _KEYBOARD_TYPE_: unique symbol;
	};

	/**
	 * email keyboard
	 */
	export const KEYBOARD_TYPE_EMAIL: number & {
		readonly _KEYBOARD_TYPE_: unique symbol;
	};

	/**
	 * number input keyboard
	 */
	export const KEYBOARD_TYPE_NUMBER_PAD: number & {
		readonly _KEYBOARD_TYPE_: unique symbol;
	};

	/**
	 * password keyboard
	 */
	export const KEYBOARD_TYPE_PASSWORD: number & {
		readonly _KEYBOARD_TYPE_: unique symbol;
	};

	/**
	 * elliptical pie node bounds
	 */
	export const PIEBOUNDS_ELLIPSE: number & {
		readonly _PIEBOUNDS_: unique symbol;
	};

	/**
	 * rectangular pie node bounds
	 */
	export const PIEBOUNDS_RECTANGLE: number & {
		readonly _PIEBOUNDS_: unique symbol;
	};

	/**
	 * center pivot
	 */
	export const PIVOT_CENTER: number & { readonly _PIVOT_: unique symbol };

	/**
	 * east pivot
	 */
	export const PIVOT_E: number & { readonly _PIVOT_: unique symbol };

	/**
	 * north pivot
	 */
	export const PIVOT_N: number & { readonly _PIVOT_: unique symbol };

	/**
	 * north-east pivot
	 */
	export const PIVOT_NE: number & { readonly _PIVOT_: unique symbol };

	/**
	 * north-west pivot
	 */
	export const PIVOT_NW: number & { readonly _PIVOT_: unique symbol };

	/**
	 * south pivot
	 */
	export const PIVOT_S: number & { readonly _PIVOT_: unique symbol };

	/**
	 * south-east pivot
	 */
	export const PIVOT_SE: number & { readonly _PIVOT_: unique symbol };

	/**
	 * south-west pivot
	 */
	export const PIVOT_SW: number & { readonly _PIVOT_: unique symbol };

	/**
	 * west pivot
	 */
	export const PIVOT_W: number & { readonly _PIVOT_: unique symbol };

	/**
	 * loop backward
	 */
	export const PLAYBACK_LOOP_BACKWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * loop forward
	 */
	export const PLAYBACK_LOOP_FORWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * ping pong loop
	 */
	export const PLAYBACK_LOOP_PINGPONG: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * once backward
	 */
	export const PLAYBACK_ONCE_BACKWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * once forward
	 */
	export const PLAYBACK_ONCE_FORWARD: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * once forward and then backward
	 */
	export const PLAYBACK_ONCE_PINGPONG: number & {
		readonly _PLAYBACK_: unique symbol;
	};

	/**
	 * color property
	 */
	export const PROP_COLOR: string & { readonly _PROP_: unique symbol };

	/**
	 * euler property
	 */
	export const PROP_EULER: string & { readonly _PROP_: unique symbol };

	/**
	 * fill_angle property
	 */
	export const PROP_FILL_ANGLE: string & { readonly _PROP_: unique symbol };

	/**
	 * inner_radius property
	 */
	export const PROP_INNER_RADIUS: string & { readonly _PROP_: unique symbol };

	/**
	 * outline color property
	 */
	export const PROP_OUTLINE: string & { readonly _PROP_: unique symbol };

	/**
	 * position property
	 */
	export const PROP_POSITION: string & { readonly _PROP_: unique symbol };

	/**
	 * rotation property
	 */
	export const PROP_ROTATION: string & { readonly _PROP_: unique symbol };

	/**
	 * scale property
	 */
	export const PROP_SCALE: string & { readonly _PROP_: unique symbol };

	/**
	 * shadow color property
	 */
	export const PROP_SHADOW: string & { readonly _PROP_: unique symbol };

	/**
	 * size property
	 */
	export const PROP_SIZE: string & { readonly _PROP_: unique symbol };

	/**
	 * slice9 property
	 */
	export const PROP_SLICE9: string & { readonly _PROP_: unique symbol };

	/**
	 * data error
	 */
	export const RESULT_DATA_ERROR: number & { readonly _RESULT_: unique symbol };

	/**
	 * out of resource
	 */
	export const RESULT_OUT_OF_RESOURCES: number & {
		readonly _RESULT_: unique symbol;
	};

	/**
	 * texture already exists
	 */
	export const RESULT_TEXTURE_ALREADY_EXISTS: number & {
		readonly _RESULT_: unique symbol;
	};

	/**
	 * automatic size mode
	 */
	export const SIZE_MODE_AUTO: number & { readonly _SIZE_MODE_: unique symbol };

	/**
	 * manual size mode
	 */
	export const SIZE_MODE_MANUAL: number & {
		readonly _SIZE_MODE_: unique symbol;
	};

	/**
	* This starts an animation of a node property according to the specified parameters.
	* If the node property is already being animated, that animation will be canceled and
	* replaced by the new one. Note however that several different node properties
	* can be animated simultaneously. Use `gui.cancel_animation` to stop the animation
	* before it has completed.
	* Composite properties of type vector3, vector4 or quaternion
	* also expose their sub-components (x, y, z and w).
	* You can address the components individually by suffixing the name with a dot '.'
	* and the name of the component.
	* For instance, `"position.x"` (the position x coordinate) or `"color.w"`
	* (the color alpha value).
	* If a `complete_function` (Lua function) is specified, that function will be called
	* when the animation has completed.
	* By starting a new animation in that function, several animations can be sequenced
	* together. See the examples below for more information.
	* @param node  node to animate
	* @param property  property to animate

- `"position"`
- `"rotation"`
- `"euler"`
- `"scale"`
- `"color"`
- `"outline"`
- `"shadow"`
- `"size"`
- `"fill_angle"` (pie)
- `"inner_radius"` (pie)
- `"slice9"` (slice9)

The following property constants are defined equaling the corresponding property string names.

- `gui.PROP_POSITION`
- `gui.PROP_ROTATION`
- `gui.PROP_EULER`
- `gui.PROP_SCALE`
- `gui.PROP_COLOR`
- `gui.PROP_OUTLINE`
- `gui.PROP_SHADOW`
- `gui.PROP_SIZE`
- `gui.PROP_FILL_ANGLE`
- `gui.PROP_INNER_RADIUS`
- `gui.PROP_SLICE9`

	* @param to  target property value
	* @param easing  easing to use during animation.
     Either specify one of the `gui.EASING_*` constants or provide a
with a custom curve. See the animation guide for more information.
	* @param duration  duration of the animation in seconds.
	* @param delay  delay before the animation starts in seconds.
	* @param complete_function  function to call when the
     animation has completed
	* @param playback  playback mode

- `gui.PLAYBACK_ONCE_FORWARD`
- `gui.PLAYBACK_ONCE_BACKWARD`
- `gui.PLAYBACK_ONCE_PINGPONG`
- `gui.PLAYBACK_LOOP_FORWARD`
- `gui.PLAYBACK_LOOP_BACKWARD`
- `gui.PLAYBACK_LOOP_PINGPONG`

	*/
	export function animate(
		node: node,
		property:
			string | typeof gui.PROP_COLOR | typeof gui.PROP_FILL_ANGLE | typeof gui.PROP_INNER_RADIUS | typeof gui.PROP_OUTLINE | typeof gui.PROP_POSITION | typeof gui.PROP_ROTATION | typeof gui.PROP_SCALE | typeof gui.PROP_SHADOW | typeof gui.PROP_SIZE | typeof gui.PROP_SLICE9,
		to: vmath.quaternion | vmath.vector3 | vmath.vector4 | number,
		easing:
			vmath.quaternion | vmath.vector3 | vmath.vector4 | number | typeof gui.EASING_INBACK | typeof gui.EASING_INBOUNCE | typeof gui.EASING_INCIRC | typeof gui.EASING_INCUBIC | typeof gui.EASING_INELASTIC | typeof gui.EASING_INEXPO | typeof gui.EASING_INOUTBACK | typeof gui.EASING_INOUTBOUNCE | typeof gui.EASING_INOUTCIRC | typeof gui.EASING_INOUTCUBIC | typeof gui.EASING_INOUTELASTIC | typeof gui.EASING_INOUTEXPO | typeof gui.EASING_INOUTQUAD | typeof gui.EASING_INOUTQUART | typeof gui.EASING_INOUTQUINT | typeof gui.EASING_INOUTSINE | typeof gui.EASING_INQUAD | typeof gui.EASING_INQUART | typeof gui.EASING_INQUINT | typeof gui.EASING_INSINE | typeof gui.EASING_LINEAR | typeof gui.EASING_OUTBACK | typeof gui.EASING_OUTBOUNCE | typeof gui.EASING_OUTCIRC | typeof gui.EASING_OUTCUBIC | typeof gui.EASING_OUTELASTIC | typeof gui.EASING_OUTEXPO | typeof gui.EASING_OUTINBACK | typeof gui.EASING_OUTINBOUNCE | typeof gui.EASING_OUTINCIRC | typeof gui.EASING_OUTINCUBIC | typeof gui.EASING_OUTINELASTIC | typeof gui.EASING_OUTINEXPO | typeof gui.EASING_OUTINQUAD | typeof gui.EASING_OUTINQUART | typeof gui.EASING_OUTINQUINT | typeof gui.EASING_OUTINSINE | typeof gui.EASING_OUTQUAD | typeof gui.EASING_OUTQUART | typeof gui.EASING_OUTQUINT | typeof gui.EASING_OUTSINE,
		duration: number,
		delay?: number,
		complete_function?: (this: any, node: node) => void,
		playback?:
			typeof gui.PLAYBACK_LOOP_BACKWARD | typeof gui.PLAYBACK_LOOP_FORWARD | typeof gui.PLAYBACK_LOOP_PINGPONG | typeof gui.PLAYBACK_ONCE_BACKWARD | typeof gui.PLAYBACK_ONCE_FORWARD | typeof gui.PLAYBACK_ONCE_PINGPONG,
	): void;

	/**
	* If an animation of the specified node is currently running (started by `gui.animate`), it will immediately be canceled.
	* @param node  node that should have its animation canceled
	* @param property  property for which the animation should be canceled

- `"position"`
- `"rotation"`
- `"euler"`
- `"scale"`
- `"color"`
- `"outline"`
- `"shadow"`
- `"size"`
- `"fill_angle"` (pie)
- `"inner_radius"` (pie)
- `"slice9"` (slice9)

	*/
	export function cancel_animation(
		node: node,
		property:
			'color' | 'fill_angle' | 'inner_radius' | 'outline' | 'position' | 'rotation' | 'scale' | 'shadow' | 'size' | 'slice9',
	): void;

	/**
	 * Cancels any running flipbook animation on the specified node.
	 * @param node  node cancel flipbook animation for
	 */
	export function cancel_flipbook(node: node): void;

	/**
	 * Make a clone instance of a node. The cloned node will be identical to the
	 * original node, except the id which is generated as the string "node" plus
	 * a sequential unsigned integer value.
	 * This function does not clone the supplied node's children nodes.
	 * Use gui.clone_tree for that purpose.
	 * @param node  node to clone
	 * @returns clone  the cloned node
	 */
	export function clone(node: node): node;

	/**
	 * Make a clone instance of a node and all its children.
	 * Use gui.clone to clone a node excluding its children.
	 * @param node  root node to clone
	 * @returns clones  a table mapping node ids to the corresponding cloned nodes
	 */
	export function clone_tree(node: node): AnyNotNil | undefined;

	/**
	 * Deletes the specified node. Any child nodes of the specified node will be
	 * recursively deleted.
	 * @param node  node to delete
	 */
	export function delete_node(node: node): void;

	/**
	 * Delete a dynamically created texture.
	 * @param texture  texture id
	 */
	export function delete_texture(texture: hash | string): void;

	/**
	 * Instead of using specific getters such as gui.get_position or gui.get_scale,
	 * you can use gui.get instead and supply the property as a string or a hash.
	 * While this function is similar to go.get, there are a few more restrictions
	 * when operating in the gui namespace. Most notably, only these propertie identifiers are supported:
	 *
	 * - `"position"`
	 * - `"rotation"`
	 * - `"euler"`
	 * - `"scale"`
	 * - `"color"`
	 * - `"outline"`
	 * - `"shadow"`
	 * - `"size"`
	 * - `"fill_angle"` (pie)
	 * - `"inner_radius"` (pie)
	 * - `"slice9"` (slice9)
	 *
	 * The value returned will either be a vmath.vector4 or a single number, i.e getting the "position"
	 * property will return a vec4 while getting the "position.x" property will return a single value.
	 * @param node  node to get the property for
	 * @param property  the property to retrieve
	 */
	export function get(node: node, property: any): void;

	/**
	* Returns the adjust mode of a node.
	* The adjust mode defines how the node will adjust itself to screen
	* resolutions that differs from the one in the project settings.
	* @param node  node from which to get the adjust mode (node)
	* @returns adjust_mode  the current adjust mode

- `gui.ADJUST_FIT`
- `gui.ADJUST_ZOOM`
- `gui.ADJUST_STRETCH`

	*/
	export function get_adjust_mode(
		node: node,
	): typeof gui.ADJUST_FIT | typeof gui.ADJUST_STRETCH | typeof gui.ADJUST_ZOOM;

	/**
	 * gets the node alpha
	 * @param node  node from which to get alpha
	 */
	export function get_alpha(node: node): void;

	/**
	* Returns the blend mode of a node.
	* Blend mode defines how the node will be blended with the background.
	* @param node  node from which to get the blend mode
	* @returns blend_mode  blend mode

- `gui.BLEND_ALPHA`
- `gui.BLEND_ADD`
- `gui.BLEND_ADD_ALPHA`
- `gui.BLEND_MULT`
- `gui.BLEND_SCREEN`

	*/
	export function get_blend_mode(
		node: node,
	):
		typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_ALPHA | typeof gui.BLEND_MULT | typeof gui.BLEND_SCREEN;

	/**
	 * If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
	 * @param node  node from which to get the clipping inverted state
	 * @returns inverted  true or false
	 */
	export function get_clipping_inverted(node: node): boolean;

	/**
	* Clipping mode defines how the node will clip it's children nodes
	* @param node  node from which to get the clipping mode
	* @returns clipping_mode  clipping mode

- `gui.CLIPPING_MODE_NONE`
- `gui.CLIPPING_MODE_STENCIL`

	*/
	export function get_clipping_mode(
		node: node,
	): typeof gui.CLIPPING_MODE_NONE | typeof gui.CLIPPING_MODE_STENCIL;

	/**
	 * If node is set as visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
	 * @param node  node from which to get the clipping visibility state
	 * @returns visible  true or false
	 */
	export function get_clipping_visible(node: node): boolean;

	/**
	 * Returns the color of the supplied node. The components
	 * of the returned vector4 contains the color channel values:
	 *
	 *
	 *
	 * Component
	 * Color value
	 *
	 *
	 *
	 *
	 * x
	 * Red value
	 *
	 *
	 * y
	 * Green value
	 *
	 *
	 * z
	 * Blue value
	 *
	 *
	 * w
	 * Alpha value
	 *
	 *
	 *
	 * @param node  node to get the color from
	 * @returns color  node color
	 */
	export function get_color(node: node): vmath.vector4;

	/**
	 * Returns the rotation of the supplied node.
	 * The rotation is expressed in degree Euler angles.
	 * @param node  node to get the rotation from
	 * @returns rotation  node rotation
	 */
	export function get_euler(node: node): vmath.vector3;

	/**
	 * Returns the sector angle of a pie node.
	 * @param node  node from which to get the fill angle
	 * @returns angle  sector angle
	 */
	export function get_fill_angle(node: node): number;

	/**
	 * Get node flipbook animation.
	 * @param node  node to get flipbook animation from
	 * @returns animation  animation id
	 */
	export function get_flipbook(node: node): hash;

	/**
	 * This is only useful nodes with flipbook animations. Gets the normalized cursor of the flipbook animation on a node.
	 * @param node  node to get the cursor for (node)
	 * @returns cursor  cursor value
	 */
	export function get_flipbook_cursor(node: node): number;

	/**
	 * This is only useful nodes with flipbook animations. Gets the playback rate of the flipbook animation on a node.
	 * @param node  node to set the cursor for
	 * @returns rate  playback rate
	 */
	export function get_flipbook_playback_rate(node: node): number;

	/**
	 * This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
	 * @param node  node from which to get the font
	 * @returns font  font id
	 */
	export function get_font(node: node): hash;

	/**
	 * This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
	 * @param font_name  font of which to get the path hash
	 * @returns hash  path hash to resource
	 */
	export function get_font_resource(font_name: hash | string): hash;

	/**
	 * Returns the scene height.
	 * @returns height  scene height
	 */
	export function get_height(): number;

	/**
	 * Retrieves the id of the specified node.
	 * @param node  the node to retrieve the id from
	 * @returns id  the id of the node
	 */
	export function get_id(node: node): hash;

	/**
	 * Retrieve the index of the specified node among its siblings.
	 * The index defines the order in which a node appear in a GUI scene.
	 * Higher index means the node is drawn on top of lower indexed nodes.
	 * @param node  the node to retrieve the id from
	 * @returns index  the index of the node
	 */
	export function get_index(node: node): number;

	/**
	 * gets the node inherit alpha state
	 * @param node  node from which to get the inherit alpha state
	 */
	export function get_inherit_alpha(node: node): void;

	/**
	 * Returns the inner radius of a pie node.
	 * The radius is defined along the x-axis.
	 * @param node  node from where to get the inner radius
	 * @returns radius  inner radius
	 */
	export function get_inner_radius(node: node): number;

	/**
	 * The layer must be mapped to the gui scene in the gui editor.
	 * @param node  node from which to get the layer
	 * @returns layer  layer id
	 */
	export function get_layer(node: node): hash;

	/**
	 * gets the scene current layout
	 * @returns layout  layout id
	 */
	export function get_layout(): hash;

	/**
	 * Returns the leading value for a text node.
	 * @param node  node from where to get the leading
	 * @returns leading  leading scaling value (default=1)
	 */
	export function get_leading(node: node): number;

	/**
	 * Returns whether a text node is in line-break mode or not.
	 * This is only useful for text nodes.
	 * @param node  node from which to get the line-break for
	 * @returns line_break  `true` or `false`
	 */
	export function get_line_break(node: node): boolean;

	/**
	 * Returns the material of a node.
	 * The material must be mapped to the gui scene in the gui editor.
	 * @param node  node to get the material for
	 */
	export function get_material(node: node): void;

	/**
	 * Retrieves the node with the specified id.
	 * @param id  id of the node to retrieve
	 * @returns instance  a new node instance
	 */
	export function get_node(id: hash | string): node;

	/**
	* Returns the outer bounds mode for a pie node.
	* @param node  node from where to get the outer bounds mode
	* @returns bounds_mode  the outer bounds mode of the pie node:

- `gui.PIEBOUNDS_RECTANGLE`
- `gui.PIEBOUNDS_ELLIPSE`

	*/
	export function get_outer_bounds(
		node: node,
	): typeof gui.PIEBOUNDS_ELLIPSE | typeof gui.PIEBOUNDS_RECTANGLE;

	/**
	 * Returns the outline color of the supplied node.
	 * See gui.get_color for info how vectors encode color values.
	 * @param node  node to get the outline color from
	 * @returns color  outline color
	 */
	export function get_outline(node: node): vmath.vector4;

	/**
	 * Returns the parent node of the specified node.
	 * If the supplied node does not have a parent, `undefined` is returned.
	 * @param node  the node from which to retrieve its parent
	 * @returns parent  parent instance or `undefined`
	 */
	export function get_parent(node: node): node | undefined;

	/**
	 * Get the paricle fx for a gui node
	 * @param node  node to get particle fx for
	 * @returns particlefx  particle fx id
	 */
	export function get_particlefx(node: node): hash;

	/**
	 * Returns the number of generated vertices around the perimeter
	 * of a pie node.
	 * @param node  pie node
	 * @returns vertices  vertex count
	 */
	export function get_perimeter_vertices(node: node): number;

	/**
	* The pivot specifies how the node is drawn and rotated from its position.
	* @param node  node to get pivot from
	* @returns pivot  pivot constant

- `gui.PIVOT_CENTER`
- `gui.PIVOT_N`
- `gui.PIVOT_NE`
- `gui.PIVOT_E`
- `gui.PIVOT_SE`
- `gui.PIVOT_S`
- `gui.PIVOT_SW`
- `gui.PIVOT_W`
- `gui.PIVOT_NW`

	*/
	export function get_pivot(
		node: node,
	):
		typeof gui.PIVOT_CENTER | typeof gui.PIVOT_E | typeof gui.PIVOT_N | typeof gui.PIVOT_NE | typeof gui.PIVOT_NW | typeof gui.PIVOT_S | typeof gui.PIVOT_SE | typeof gui.PIVOT_SW | typeof gui.PIVOT_W;

	/**
	 * Returns the position of the supplied node.
	 * @param node  node to get the position from
	 * @returns position  node position
	 */
	export function get_position(node: node): vmath.vector3;

	/**
	 * Returns the rotation of the supplied node.
	 * The rotation is expressed as a quaternion
	 * @param node  node to get the rotation from
	 * @returns rotation  node rotation
	 */
	export function get_rotation(node: node): vmath.quaternion;

	/**
	 * Returns the scale of the supplied node.
	 * @param node  node to get the scale from
	 * @returns scale  node scale
	 */
	export function get_scale(node: node): vmath.vector3;

	/**
	 * Returns the screen position of the supplied node. This function returns the
	 * calculated transformed position of the node, taking into account any parent node
	 * transforms.
	 * @param node  node to get the screen position from
	 * @returns position  node screen position
	 */
	export function get_screen_position(node: node): vmath.vector3;

	/**
	 * Returns the shadow color of the supplied node.
	 * See gui.get_color for info how vectors encode color values.
	 * @param node  node to get the shadow color from
	 * @returns color  node shadow color
	 */
	export function get_shadow(node: node): vmath.vector4;

	/**
	 * Returns the size of the supplied node.
	 * @param node  node to get the size from
	 * @returns size  node size
	 */
	export function get_size(node: node): vmath.vector3;

	/**
	* Returns the size of a node.
	* The size mode defines how the node will adjust itself in size. Automatic
	* size mode alters the node size based on the node's content. Automatic size
	* mode works for Box nodes and Pie nodes which will both adjust their size
	* to match the assigned image. Particle fx and Text nodes will ignore
	* any size mode setting.
	* @param node  node from which to get the size mode (node)
	* @returns size_mode  the current size mode

- `gui.SIZE_MODE_MANUAL`
- `gui.SIZE_MODE_AUTO`

	*/
	export function get_size_mode(
		node: node,
	): typeof gui.SIZE_MODE_AUTO | typeof gui.SIZE_MODE_MANUAL;

	/**
	 * Returns the slice9 configuration values for the node.
	 * @param node  node to manipulate
	 * @returns values  configuration values
	 */
	export function get_slice9(node: node): vmath.vector4;

	/**
	 * Returns the text value of a text node. This is only useful for text nodes.
	 * @param node  node from which to get the text
	 * @returns text  text value
	 */
	export function get_text(node: node): string;

	/**
	 * Returns the texture of a node.
	 * This is currently only useful for box or pie nodes.
	 * The texture must be mapped to the gui scene in the gui editor.
	 * @param node  node to get texture from
	 * @returns texture  texture id
	 */
	export function get_texture(node: node): hash;

	/**
	 * Returns the tracking value of a text node.
	 * @param node  node from where to get the tracking
	 * @returns tracking  tracking scaling number (default=0)
	 */
	export function get_tracking(node: node): number;

	/**
	 * Get a node and all its children as a Lua table.
	 * @param node  root node to get node tree from
	 * @returns clones  a table mapping node ids to the corresponding nodes
	 */
	export function get_tree(node: node): AnyNotNil | undefined;

	/**
	 * Returns `true` if a node is visible and `false` if it's not.
	 * Invisible nodes are not rendered.
	 * @param node  node to query
	 * @returns visible  whether the node is visible or not
	 */
	export function get_visible(node: node): boolean;

	/**
	 * Returns the scene width.
	 * @returns width  scene width
	 */
	export function get_width(): number;

	/**
	* The x-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to get x-anchor from
	* @returns anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_LEFT`
- `gui.ANCHOR_RIGHT`

	*/
	export function get_xanchor(
		node: node,
	): typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_RIGHT;

	/**
	* The y-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to get y-anchor from
	* @returns anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_TOP`
- `gui.ANCHOR_BOTTOM`

	*/
	export function get_yanchor(
		node: node,
	): typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_RIGHT;

	/**
	 * Hides the on-display touch keyboard on the device.
	 */
	export function hide_keyboard(): void;

	/**
	 * Returns `true` if a node is enabled and `false` if it's not.
	 * Disabled nodes are not rendered and animations acting on them are not evaluated.
	 * @param node  node to query
	 * @param recursive  check hierarchy recursively
	 * @returns enabled  whether the node is enabled or not
	 */
	export function is_enabled(node: node, recursive?: boolean): boolean;

	/**
	 * Alters the ordering of the two supplied nodes by moving the first node
	 * above the second.
	 * If the second argument is `undefined` the first node is moved to the top.
	 * @param node  to move
	 * @param reference  reference node above which the first node should be moved
	 */
	export function move_above(node: node, reference: node): void;

	/**
	 * Alters the ordering of the two supplied nodes by moving the first node
	 * below the second.
	 * If the second argument is `undefined` the first node is moved to the bottom.
	 * @param node  to move
	 * @param reference  reference node below which the first node should be moved
	 */
	export function move_below(node: node, reference: node): void;

	/**
	 * Dynamically create a new box node.
	 * @param pos  node position
	 * @param size  node size
	 * @returns node  new box node
	 */
	export function new_box_node(
		pos: vmath.vector3 | vmath.vector4,
		size: vmath.vector3,
	): node;

	/**
	 * Dynamically create a particle fx node.
	 * @param pos  node position
	 * @param particlefx  particle fx resource name
	 * @returns node  new particle fx node
	 */
	export function new_particlefx_node(
		pos: vmath.vector3 | vmath.vector4,
		particlefx: hash | string,
	): node;

	/**
	 * Dynamically create a new pie node.
	 * @param pos  node position
	 * @param size  node size
	 * @returns node  new pie node
	 */
	export function new_pie_node(
		pos: vmath.vector3 | vmath.vector4,
		size: vmath.vector3,
	): node;

	/**
	 * Dynamically create a new text node.
	 * @param pos  node position
	 * @param text  node text
	 * @returns node  new text node
	 */
	export function new_text_node(
		pos: vmath.vector3 | vmath.vector4,
		text: string,
	): node;

	/**
	* Dynamically create a new texture.
	* @param texture_id  texture id
	* @param width  texture width
	* @param height  texture height
	* @param type  texture type

- `"rgb"` - RGB
- `"rgba"` - RGBA
- `"l"` - LUMINANCE

	* @param buffer  texture data
	* @param flip  flip texture vertically
	* @returns success  texture creation was successful
	* @returns code  one of the gui.RESULT_* codes if unsuccessful
	*/
	export function new_texture(
		texture_id: hash | string,
		width: number,
		height: number,
		type: 'l' | 'rgb' | 'rgba',
		buffer: string,
		flip: boolean,
	): LuaMultiReturn<
		[
			boolean,
			(
				typeof gui.RESULT_DATA_ERROR | typeof gui.RESULT_OUT_OF_RESOURCES | typeof gui.RESULT_TEXTURE_ALREADY_EXISTS | undefined
			),
		]
	>;

	/**
	 * Tests whether a coordinate is within the bounding box of a
	 * node.
	 * @param node  node to be tested for picking
	 * @param x  x-coordinate (see on_input )
	 * @param y  y-coordinate (see on_input )
	 * @returns pickable  pick result
	 */
	export function pick_node(node: node, x: number, y: number): boolean;

	/**
	* Play flipbook animation on a box or pie node.
	* The current node texture must contain the animation.
	* Use this function to set one-frame still images on the node.
	* @param node  node to set animation for
	* @param animation  animation id
	* @param complete_function  optional function to call when the animation has completed

`this`

The current object.

`node`

The node that is animated.


	* @param play_properties  optional table with properties

`offset`
The normalized initial value of the animation cursor when the animation starts playing
`playback_rate`
The rate with which the animation will be played. Must be positive

	*/
	export function play_flipbook(
		node: node,
		animation: hash | string,
		complete_function?: (this: any, node: node) => void,
		play_properties?: { offset?: number; playback_rate?: number },
	): void;

	/**
	* Plays the paricle fx for a gui node
	* @param node  node to play particle fx for
	* @param emitter_state_function  optional callback function that will be called when an emitter attached to this particlefx changes state.

`this`
The current object
`node`
The particle fx node, or `undefined` if the node was deleted
`emitter`
The id of the emitter
`state`
the new state of the emitter:


- `particlefx.EMITTER_STATE_SLEEPING`
- `particlefx.EMITTER_STATE_PRESPAWN`
- `particlefx.EMITTER_STATE_SPAWNING`
- `particlefx.EMITTER_STATE_POSTSPAWN`

	*/
	export function play_particlefx(
		node: node,
		emitter_state_function?: (
			this: any,
			node: node | undefined,
			emitter: hash,
			state:
				typeof particlefx.EMITTER_STATE_POSTSPAWN | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_SPAWNING,
		) => void,
	): void;

	/**
	 * Resets the input context of keyboard. This will clear marked text.
	 */
	export function reset_keyboard(): void;

	/**
	 * Resets the node material to the material assigned in the gui scene.
	 * @param node  node to reset the material for
	 */
	export function reset_material(node: node): void;

	/**
	 * Resets all nodes in the current GUI scene to their initial state.
	 * The reset only applies to static node loaded from the scene.
	 * Nodes that are created dynamically from script are not affected.
	 */
	export function reset_nodes(): void;

	/**
	 * Convert the screen position to the local position of supplied node
	 * @param node  node used for getting local transformation matrix
	 * @param screen_position  screen position
	 * @returns local_position  local position
	 */
	export function screen_to_local(
		node: node,
		screen_position: vmath.vector3,
	): vmath.vector3;

	/**
	 * Instead of using specific setteres such as gui.set_position or gui.set_scale,
	 * you can use gui.set instead and supply the property as a string or a hash.
	 * While this function is similar to go.get and go.set, there are a few more restrictions
	 * when operating in the gui namespace. Most notably, only these propertie identifiers are supported:
	 *
	 * - `"position"`
	 * - `"rotation"`
	 * - `"euler"`
	 * - `"scale"`
	 * - `"color"`
	 * - `"outline"`
	 * - `"shadow"`
	 * - `"size"`
	 * - `"fill_angle"` (pie)
	 * - `"inner_radius"` (pie)
	 * - `"slice9"` (slice9)
	 *
	 * The value to set must either be a vmath.vector4, vmath.vector3, vmath.quat or a single number and depends on the property name you want to set.
	 * I.e when setting the "position" property, you need to use a vmath.vector4 and when setting a single component of the property,
	 * such as "position.x", you need to use a single value.
	 * Note: When setting the rotation using the "rotation" property, you need to pass in a vmath.quat. This behaviour is different than from the gui.set_rotation function,
	 * the intention is to move new functionality closer to go namespace so that migrating between gui and go is easier. To set the rotation using degrees instead,
	 * use the "euler" property instead. The rotation and euler properties are linked, changing one of them will change the backing data of the other.
	 * @param node  node to set the property for
	 * @param property  the property to set
	 * @param value  the property to set
	 */
	export function set(
		node: node,
		property: any,
		value: vmath.quaternion | vmath.vector3 | vmath.vector4 | number,
	): void;

	/**
	* Sets the adjust mode on a node.
	* The adjust mode defines how the node will adjust itself to screen
	* resolutions that differs from the one in the project settings.
	* @param node  node to set adjust mode for
	* @param adjust_mode  adjust mode to set

- `gui.ADJUST_FIT`
- `gui.ADJUST_ZOOM`
- `gui.ADJUST_STRETCH`

	*/
	export function set_adjust_mode(
		node: node,
		adjust_mode:
			typeof gui.ADJUST_FIT | typeof gui.ADJUST_STRETCH | typeof gui.ADJUST_ZOOM,
	): void;

	/**
	 * sets the node alpha
	 * @param node  node for which to set alpha
	 * @param alpha  0..1 alpha color
	 */
	export function set_alpha(node: node, alpha: number): void;

	/**
	* Set the blend mode of a node.
	* Blend mode defines how the node will be blended with the background.
	* @param node  node to set blend mode for
	* @param blend_mode  blend mode to set

- `gui.BLEND_ALPHA`
- `gui.BLEND_ADD`
- `gui.BLEND_ADD_ALPHA`
- `gui.BLEND_MULT`
- `gui.BLEND_SCREEN`

	*/
	export function set_blend_mode(
		node: node,
		blend_mode:
			typeof gui.BLEND_ADD | typeof gui.BLEND_ADD_ALPHA | typeof gui.BLEND_ALPHA | typeof gui.BLEND_MULT | typeof gui.BLEND_SCREEN,
	): void;

	/**
	 * If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
	 * @param node  node to set clipping inverted state for
	 * @param inverted  true or false
	 */
	export function set_clipping_inverted(node: node, inverted: boolean): void;

	/**
	* Clipping mode defines how the node will clip it's children nodes
	* @param node  node to set clipping mode for
	* @param clipping_mode  clipping mode to set

- `gui.CLIPPING_MODE_NONE`
- `gui.CLIPPING_MODE_STENCIL`

	*/
	export function set_clipping_mode(
		node: node,
		clipping_mode:
			| typeof gui.CLIPPING_MODE_NONE
			| typeof gui.CLIPPING_MODE_STENCIL,
	): void;

	/**
	 * If node is set as an visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
	 * @param node  node to set clipping visibility for
	 * @param visible  true or false
	 */
	export function set_clipping_visible(node: node, visible: boolean): void;

	/**
	 * Sets the color of the supplied node. The components
	 * of the supplied vector3 or vector4 should contain the color channel values:
	 *
	 *
	 *
	 * Component
	 * Color value
	 *
	 *
	 *
	 *
	 * x
	 * Red value
	 *
	 *
	 * y
	 * Green value
	 *
	 *
	 * z
	 * Blue value
	 *
	 *
	 * vector4
	 * Alpha value
	 *
	 *
	 *
	 * @param node  node to set the color for
	 * @param color  new color
	 */
	export function set_color(
		node: node,
		color: vmath.vector3 | vmath.vector4,
	): void;

	/**
	 * Sets a node to the disabled or enabled state.
	 * Disabled nodes are not rendered and animations acting on them are not evaluated.
	 * @param node  node to be enabled/disabled
	 * @param enabled  whether the node should be enabled or not
	 */
	export function set_enabled(node: node, enabled: boolean): void;

	/**
	 * Sets the rotation of the supplied node.
	 * The rotation is expressed in degree Euler angles.
	 * @param node  node to set the rotation for
	 * @param rotation  new rotation
	 */
	export function set_euler(
		node: node,
		rotation: vmath.vector3 | vmath.vector4,
	): void;

	/**
	 * Set the sector angle of a pie node.
	 * @param node  node to set the fill angle for
	 * @param angle  sector angle
	 */
	export function set_fill_angle(node: node, angle: number): void;

	/**
	 * This is only useful nodes with flipbook animations. The cursor is normalized.
	 * @param node  node to set the cursor for
	 * @param cursor  cursor value
	 */
	export function set_flipbook_cursor(node: node, cursor: number): void;

	/**
	 * This is only useful nodes with flipbook animations. Sets the playback rate of the flipbook animation on a node. Must be positive.
	 * @param node  node to set the cursor for
	 * @param playback_rate  playback rate
	 */
	export function set_flipbook_playback_rate(
		node: node,
		playback_rate: number,
	): void;

	/**
	 * This is only useful for text nodes.
	 * The font must be mapped to the gui scene in the gui editor.
	 * @param node  node for which to set the font
	 * @param font  font id
	 */
	export function set_font(node: node, font: hash | string): void;

	/**
	 * Set the id of the specicied node to a new value.
	 * Nodes created with the gui.new_*_node() functions get
	 * an empty id. This function allows you to give dynamically
	 * created nodes an id.
	 * ⚠ No checking is done on the uniqueness of supplied ids.
	 * It is up to you to make sure you use unique ids.
	 * @param node  node to set the id for
	 * @param id  id to set
	 */
	export function set_id(node: node, id: hash | string): void;

	/**
	 * sets the node inherit alpha state
	 * @param node  node from which to set the inherit alpha state
	 * @param inherit_alpha  true or false
	 */
	export function set_inherit_alpha(node: node, inherit_alpha: boolean): void;

	/**
	 * Sets the inner radius of a pie node.
	 * The radius is defined along the x-axis.
	 * @param node  node to set the inner radius for
	 * @param radius  inner radius
	 */
	export function set_inner_radius(node: node, radius: number): void;

	/**
	 * The layer must be mapped to the gui scene in the gui editor.
	 * @param node  node for which to set the layer
	 * @param layer  layer id
	 */
	export function set_layer(node: node, layer: hash | string): void;

	/**
	 * Sets the leading value for a text node. This value is used to
	 * scale the line spacing of text.
	 * @param node  node for which to set the leading
	 * @param leading  a scaling value for the line spacing (default=1)
	 */
	export function set_leading(node: node, leading: number): void;

	/**
	 * Sets the line-break mode on a text node.
	 * This is only useful for text nodes.
	 * @param node  node to set line-break for
	 * @param line_break  true or false
	 */
	export function set_line_break(node: node, line_break: boolean): void;

	/**
	 * Set the material on a node. The material must be mapped to the gui scene in the gui editor,
	 * and assigning a material is supported for all node types. To set the default material that
	 * is assigned to the gui scene node, use `gui.reset_material(node_id)` instead.
	 * @param node  node to set material for
	 * @param material  material id
	 */
	export function set_material(node: node, material: hash | string): void;

	/**
	* Sets the outer bounds mode for a pie node.
	* @param node  node for which to set the outer bounds mode
	* @param bounds_mode  the outer bounds mode of the pie node:

- `gui.PIEBOUNDS_RECTANGLE`
- `gui.PIEBOUNDS_ELLIPSE`

	*/
	export function set_outer_bounds(
		node: node,
		bounds_mode: typeof gui.PIEBOUNDS_ELLIPSE | typeof gui.PIEBOUNDS_RECTANGLE,
	): void;

	/**
	 * Sets the outline color of the supplied node.
	 * See gui.set_color for info how vectors encode color values.
	 * @param node  node to set the outline color for
	 * @param color  new outline color
	 */
	export function set_outline(
		node: node,
		color: vmath.vector3 | vmath.vector4,
	): void;

	/**
	 * Sets the parent node of the specified node.
	 * @param node  node for which to set its parent
	 * @param parent  parent node to set, pass `undefined` to remove parent
	 * @param keep_scene_transform  optional flag to make the scene position being perserved
	 */
	export function set_parent(
		node: node,
		parent?: node,
		keep_scene_transform?: boolean,
	): void;

	/**
	 * Set the paricle fx for a gui node
	 * @param node  node to set particle fx for
	 * @param particlefx  particle fx id
	 */
	export function set_particlefx(node: node, particlefx: hash | string): void;

	/**
	 * Sets the number of generated vertices around the perimeter of a pie node.
	 * @param node  pie node
	 * @param vertices  vertex count
	 */
	export function set_perimeter_vertices(node: node, vertices: number): void;

	/**
	* The pivot specifies how the node is drawn and rotated from its position.
	* @param node  node to set pivot for
	* @param pivot  pivot constant

- `gui.PIVOT_CENTER`
- `gui.PIVOT_N`
- `gui.PIVOT_NE`
- `gui.PIVOT_E`
- `gui.PIVOT_SE`
- `gui.PIVOT_S`
- `gui.PIVOT_SW`
- `gui.PIVOT_W`
- `gui.PIVOT_NW`

	*/
	export function set_pivot(
		node: node,
		pivot:
			typeof gui.PIVOT_CENTER | typeof gui.PIVOT_E | typeof gui.PIVOT_N | typeof gui.PIVOT_NE | typeof gui.PIVOT_NW | typeof gui.PIVOT_S | typeof gui.PIVOT_SE | typeof gui.PIVOT_SW | typeof gui.PIVOT_W,
	): void;

	/**
	 * Sets the position of the supplied node.
	 * @param node  node to set the position for
	 * @param position  new position
	 */
	export function set_position(
		node: node,
		position: vmath.vector3 | vmath.vector4,
	): void;

	/**
	 * Set the order number for the current GUI scene.
	 * The number dictates the sorting of the "gui" render predicate,
	 * in other words in which order the scene will be rendered in relation
	 * to other currently rendered GUI scenes.
	 * The number must be in the range 0 to 15.
	 * @param order  rendering order (0-15)
	 */
	export function set_render_order(order: number): void;

	/**
	 * Sets the rotation of the supplied node.
	 * The rotation is expressed as a quaternion
	 * @param node  node to set the rotation for
	 * @param rotation  new rotation
	 */
	export function set_rotation(
		node: node,
		rotation: vmath.quaternion | vmath.vector4,
	): void;

	/**
	 * Sets the scaling of the supplied node.
	 * @param node  node to set the scale for
	 * @param scale  new scale
	 */
	export function set_scale(
		node: node,
		scale: vmath.vector3 | vmath.vector4,
	): void;

	/**
	 * Set the screen position to the supplied node
	 * @param node  node to set the screen position to
	 * @param screen_position  screen position
	 */
	export function set_screen_position(
		node: node,
		screen_position: vmath.vector3,
	): void;

	/**
	 * Sets the shadow color of the supplied node.
	 * See gui.set_color for info how vectors encode color values.
	 * @param node  node to set the shadow color for
	 * @param color  new shadow color
	 */
	export function set_shadow(
		node: node,
		color: vmath.vector3 | vmath.vector4,
	): void;

	/**
	 * Sets the size of the supplied node.
	 * ⚠ You can only set size on nodes with size mode set to SIZE_MODE_MANUAL
	 * @param node  node to set the size for
	 * @param size  new size
	 */
	export function set_size(
		node: node,
		size: vmath.vector3 | vmath.vector4,
	): void;

	/**
	* Sets the size mode of a node.
	* The size mode defines how the node will adjust itself in size. Automatic
	* size mode alters the node size based on the node's content. Automatic size
	* mode works for Box nodes and Pie nodes which will both adjust their size
	* to match the assigned image. Particle fx and Text nodes will ignore
	* any size mode setting.
	* @param node  node to set size mode for
	* @param size_mode  size mode to set

- `gui.SIZE_MODE_MANUAL`
- `gui.SIZE_MODE_AUTO`

	*/
	export function set_size_mode(
		node: node,
		size_mode: typeof gui.SIZE_MODE_AUTO | typeof gui.SIZE_MODE_MANUAL,
	): void;

	/**
	 * Set the slice9 configuration values for the node.
	 * @param node  node to manipulate
	 * @param values  new values
	 */
	export function set_slice9(node: node, values: vmath.vector4): void;

	/**
	 * Set the text value of a text node. This is only useful for text nodes.
	 * @param node  node to set text for
	 * @param text  text to set
	 */
	export function set_text(node: node, text: number | string): void;

	/**
	 * Set the texture on a box or pie node. The texture must be mapped to
	 * the gui scene in the gui editor. The function points out which texture
	 * the node should render from. If the texture is an atlas, further
	 * information is needed to select which image/animation in the atlas
	 * to render. In such cases, use `gui.play_flipbook()` in
	 * addition to this function.
	 * @param node  node to set texture for
	 * @param texture  texture id
	 */
	export function set_texture(node: node, texture: hash | string): void;

	/**
	* Set the texture buffer data for a dynamically created texture.
	* @param texture  texture id
	* @param width  texture width
	* @param height  texture height
	* @param type  texture type

- `"rgb"` - RGB
- `"rgba"` - RGBA
- `"l"` - LUMINANCE

	* @param buffer  texture data
	* @param flip  flip texture vertically
	* @returns success  setting the data was successful
	*/
	export function set_texture_data(
		texture: hash | string,
		width: number,
		height: number,
		type: 'l' | 'rgb' | 'rgba',
		buffer: string,
		flip: boolean,
	): boolean;

	/**
	 * Sets the tracking value of a text node. This value is used to
	 * adjust the vertical spacing of characters in the text.
	 * @param node  node for which to set the tracking
	 * @param tracking  a scaling number for the letter spacing (default=0)
	 */
	export function set_tracking(node: node, tracking: number): void;

	/**
	 * Set if a node should be visible or not. Only visible nodes are rendered.
	 * @param node  node to be visible or not
	 * @param visible  whether the node should be visible or not
	 */
	export function set_visible(node: node, visible: boolean): void;

	/**
	* The x-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to set x-anchor for
	* @param anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_LEFT`
- `gui.ANCHOR_RIGHT`

	*/
	export function set_xanchor(
		node: node,
		anchor:
			typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_RIGHT,
	): void;

	/**
	* The y-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to set y-anchor for
	* @param anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_TOP`
- `gui.ANCHOR_BOTTOM`

	*/
	export function set_yanchor(
		node: node,
		anchor:
			typeof gui.ANCHOR_LEFT | typeof gui.ANCHOR_NONE | typeof gui.ANCHOR_RIGHT,
	): void;

	/**
	* Shows the on-display touch keyboard.
	* The specified type of keyboard is displayed if it is available on
	* the device.
	* 🤖.
	* @param type  keyboard type

- `gui.KEYBOARD_TYPE_DEFAULT`
- `gui.KEYBOARD_TYPE_EMAIL`
- `gui.KEYBOARD_TYPE_NUMBER_PAD`
- `gui.KEYBOARD_TYPE_PASSWORD`

	* @param autoclose  if the keyboard should automatically close when clicking outside
	*/
	export function show_keyboard(
		type:
			| typeof gui.KEYBOARD_TYPE_DEFAULT
			| typeof gui.KEYBOARD_TYPE_EMAIL
			| typeof gui.KEYBOARD_TYPE_NUMBER_PAD
			| typeof gui.KEYBOARD_TYPE_PASSWORD,
		autoclose: boolean,
	): void;

	/**
	* Stops the particle fx for a gui node
	* @param node  node to stop particle fx for
	* @param options  options when stopping the particle fx. Supported options:

`clear`: instantly clear spawned particles

	*/
	export function stop_particlefx(
		node: node,
		options?: { clear: boolean },
	): void;

	/**
	 * This message is broadcast to every GUI component when a layout change has been initiated
	 * on device.
	 */
	export type layout_changed = 'layout_changed';
	export type layout_changed_message = { id: hash; previous_id: hash };

	/**
	 * The main material (the default material assigned to a GUI) used when rendering the gui. The type of the property is hash.
	 */
	export let material: hash;

	/**
	 * The materials used when rendering the gui. The type of the property is hash.
	 * Key must be specified in options table.
	 */
	export let materials: hash;

	/**
	 * The textures used in the gui. The type of the property is hash.
	 * Key must be specified in options table.
	 */
	export let textures: hash;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/physics/|Documentation} */
declare namespace physics {
	/**
	 * The angular damping value for the collision object. Setting this value alters the damping of
	 * angular motion of the object (rotation). Valid values are between 0 (no damping) and 1 (full damping).
	 */
	export let angular_damping: number;

	/**
	 * vector3.
	 * The velocity is measured as a rotation around the vector with a speed equivalent to the vector length
	 * in radians/s.
	 */
	export let angular_velocity: vmath.vector3;

	/**
	 * Post this message to a collision-object-component to apply the specified force on the collision object.
	 * The collision object must be dynamic.
	 */
	export type apply_force = 'apply_force';
	export type apply_force_message = {
		force: vmath.vector3;
		position: vmath.vector3;
	};

	/**
	 * See physics.set_listener.
	 * This message is sent to a function specified in physics.set_listener
	 * when two collision objects collide.
	 * This message only reports that a collision has occurred and will be sent once per frame and per colliding pair.
	 * For more detailed information, check for the contact_point_event.
	 */
	export type collision_event = 'collision_event';

	/**
	 * This message is broadcasted to every component of an instance that has a collision object,
	 * when the collision object collides with another collision object. For a script to take action
	 * when such a collision happens, it should check for this message in its `on_message` callback
	 * function.
	 * This message only reports that a collision actually happened and will only be sent once per
	 * colliding pair and frame.
	 * To retrieve more detailed information, check for the `contact_point_response` instead.
	 */
	export type collision_response = 'collision_response';
	export type collision_response_message = {
		other_id: hash;
		other_position: vmath.vector3;
		other_group: hash;
		own_group: hash;
	};

	/**
	 * See physics.set_listener.
	 * This message is sent to a function specified in physics.set_listener when
	 * a collision object has contact points with another collision object.
	 * Since multiple contact points can occur for two colliding objects, this event can be sent
	 * multiple times in the same frame for the same two colliding objects. To only be notified once
	 * when the collision occurs, check for the collision_event event instead.
	 */
	export type contact_point_event = 'contact_point_event';

	/**
	 * This message is broadcasted to every component of an instance that has a collision object,
	 * when the collision object has contact points with respect to another collision object.
	 * For a script to take action when such contact points occur, it should check for this message
	 * in its `on_message` callback function.
	 * Since multiple contact points can occur for two colliding objects, this message can be sent
	 * multiple times in the same frame for the same two colliding objects. To only be notified once
	 * when the collision occurs, check for the `collision_response` message instead.
	 */
	export type contact_point_response = 'contact_point_response';
	export type contact_point_response_message = {
		position: vmath.vector3;
		normal: vmath.vector3;
		relative_velocity: vmath.vector3;
		distance: number;
		applied_impulse: number;
		life_time: number;
		mass: number;
		other_mass: number;
		other_id: hash;
		other_position: vmath.vector3;
		other_group: hash;
		own_group: hash;
	};

	/**
	 * The linear damping value for the collision object. Setting this value alters the damping of
	 * linear motion of the object. Valid values are between 0 (no damping) and 1 (full damping).
	 */
	export let linear_damping: number;

	/**
	 * The current linear velocity of the collision object component as a vector3.
	 * The velocity is measured in units/s (pixels/s).
	 */
	export let linear_velocity: vmath.vector3;

	/**
	 * READ ONLY Returns the defined physical mass of the collision object component as a number.
	 */
	export const mass: number;

	/**
	 * fixed joint type
	 */
	export const JOINT_TYPE_FIXED: number & {
		readonly _JOINT_TYPE_: unique symbol;
	};

	/**
	 * hinge joint type
	 */
	export const JOINT_TYPE_HINGE: number & {
		readonly _JOINT_TYPE_: unique symbol;
	};

	/**
	 * slider joint type
	 */
	export const JOINT_TYPE_SLIDER: number & {
		readonly _JOINT_TYPE_: unique symbol;
	};

	/**
	 * spring joint type
	 */
	export const JOINT_TYPE_SPRING: number & {
		readonly _JOINT_TYPE_: unique symbol;
	};

	/**
	 * weld joint type
	 */
	export const JOINT_TYPE_WELD: number & {
		readonly _JOINT_TYPE_: unique symbol;
	};

	/**
	 * wheel joint type
	 */
	export const JOINT_TYPE_WHEEL: number & {
		readonly _JOINT_TYPE_: unique symbol;
	};

	/**
	 *
	 */
	export const SHAPE_TYPE_BOX: number & {
		readonly _SHAPE_TYPE_: unique symbol;
	};

	/**
	 *
	 */
	export const SHAPE_TYPE_CAPSULE: number & {
		readonly _SHAPE_TYPE_: unique symbol;
	};

	/**
	 *
	 */
	export const SHAPE_TYPE_HULL: number & {
		readonly _SHAPE_TYPE_: unique symbol;
	};

	/**
	 *
	 */
	export const SHAPE_TYPE_SPHERE: number & {
		readonly _SHAPE_TYPE_: unique symbol;
	};

	/**
	* Create a physics joint between two collision object components.
	* Note: Currently only supported in 2D physics.
	* @param joint_type  the joint type
	* @param collisionobject_a  first collision object
	* @param joint_id  id of the joint
	* @param position_a  local position where to attach the joint on the first collision object
	* @param collisionobject_b  second collision object
	* @param position_b  local position where to attach the joint on the second collision object
	* @param properties  optional joint specific properties table
See each joint type for possible properties field. The one field that is accepted for all joint types is:
`collide_connected`: Set this flag to true if the attached bodies should collide.
	*/
	export function create_joint(
		joint_type: number,
		collisionobject_a: hash | url | string,
		joint_id: hash | string,
		position_a: vmath.vector3,
		collisionobject_b: hash | url | string,
		position_b: vmath.vector3,
		properties?: { [key: string]: boolean | number },
	): void;

	/**
	 * Destroy an already physics joint. The joint has to be created before a
	 * destroy can be issued.
	 * Note: Currently only supported in 2D physics.
	 * @param collisionobject  collision object where the joint exist
	 * @param joint_id  id of the joint
	 */
	export function destroy_joint(
		collisionobject: hash | url | string,
		joint_id: hash | string,
	): void;

	/**
	 * Get the gravity in runtime. The gravity returned is not global, it will return
	 * the gravity for the collection that the function is called from.
	 * Note: For 2D physics the z component will always be zero.
	 * @returns gravity  gravity vector of collection
	 */
	export function get_gravity(): vmath.vector3;

	/**
	* Returns the group name of a collision object as a hash.
	* @param url  the collision object to return the group of.
	* @returns group  hash value of the group.
`local function check_is_enemy()
    local group = physics.get_group(&quot;#collisionobject&quot;)
    return group == hash(&quot;enemy&quot;)
end
`
	*/
	export function get_group(url: hash | url | string): hash;

	/**
	* Get a table for properties for a connected joint. The joint has to be created before
	* properties can be retrieved.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @returns properties  properties table. See the joint types for what fields are available, the only field available for all types is:

`collide_connected`: Set this flag to true if the attached bodies should collide.

	*/
	export function get_joint_properties(
		collisionobject: hash | url | string,
		joint_id: hash | string,
	): AnyNotNil | undefined;

	/**
	 * Get the reaction force for a joint. The joint has to be created before
	 * the reaction force can be calculated.
	 * Note: Currently only supported in 2D physics.
	 * @param collisionobject  collision object where the joint exist
	 * @param joint_id  id of the joint
	 * @returns force  reaction force for the joint
	 */
	export function get_joint_reaction_force(
		collisionobject: hash | url | string,
		joint_id: hash | string,
	): vmath.vector3;

	/**
	 * Get the reaction torque for a joint. The joint has to be created before
	 * the reaction torque can be calculated.
	 * Note: Currently only supported in 2D physics.
	 * @param collisionobject  collision object where the joint exist
	 * @param joint_id  id of the joint
	 * @returns torque  the reaction torque on bodyB in N*m.
	 */
	export function get_joint_reaction_torque(
		collisionobject: hash | url | string,
		joint_id: hash | string,
	): number;

	/**
	* Returns true if the specified group is set in the mask of a collision
	* object, false otherwise.
	* @param url  the collision object to check the mask of.
	* @param group  the name of the group to check for.
	* @returns maskbit  boolean value of the maskbit. 'true' if present, 'false' otherwise.
`local function is_invincible()
    -- check if the collisionobject would collide with the &quot;bullet&quot; group
    local invincible = physics.get_maskbit(&quot;#collisionobject&quot;, &quot;bullet&quot;)
    return invincible
end
`
	*/
	export function get_maskbit(url: hash | url | string, group: string): boolean;

	/**
	* Gets collision shape data from a collision object
	* @param url  the collision object.
	* @param shape  the name of the shape to get data for.
	* @returns table  A table containing meta data about the physics shape

`type`
The shape type. Supported values:


- `physics.SHAPE_TYPE_SPHERE`
- `physics.SHAPE_TYPE_BOX`
- `physics.SHAPE_TYPE_CAPSULE` *Only supported for 3D physics*
- `physics.SHAPE_TYPE_HULL`

The returned table contains different fields depending on which type the shape is.
If the shape is a sphere:

`diameter`
the diameter of the sphere shape

If the shape is a box:

`dimensions`
a `vmath.vector3` of the box dimensions

If the shape is a capsule:

`diameter`
the diameter of the capsule poles
`height`
the height of the capsule

`local function get_shape_meta()
    local sphere = physics.get_shape(&quot;#collisionobject&quot;, &quot;my_sphere_shape&quot;)
    -- returns a table with sphere.diameter
    return sphere
end
`
	*/
	export function get_shape(
		url: hash | url | string,
		shape: hash | string,
	): {
		type:
			SHAPE_TYPE_BOX | SHAPE_TYPE_CAPSULE | SHAPE_TYPE_HULL | SHAPE_TYPE_SPHERE;
		diameter?: number;
		dimensions?: vmath.vector3;
		height?: number;
	};
	export type SHAPE_TYPE_SPHERE = { readonly _shape_: unique symbol };
	export type SHAPE_TYPE_BOX = { readonly _shape_: unique symbol };
	/** 3D Physics Only */
	export type SHAPE_TYPE_CAPSULE = { readonly _shape_: unique symbol };
	export type SHAPE_TYPE_HULL = { readonly _shape_: unique symbol };

	/**
	* Ray casts are used to test for intersections against collision objects in the physics world.
	* Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
	* do not intersect with ray casts.
	* Which collision objects to hit is filtered by their collision groups and can be configured
	* through `groups`.
	* @param from  the world position of the start of the ray
	* @param to  the world position of the end of the ray
	* @param groups  a lua table containing the hashed groups for which to test collisions against
	* @param options  a lua table containing options for the raycast.

`all`
Set to `true` to return all ray cast hits. If `false`, it will only return the closest hit.

	* @returns result  It returns a list. If missed it returns `undefined`. See ray_cast_response for details on the returned values.
	*/
	export function raycast(
		from: vmath.vector3,
		to: vmath.vector3,
		groups: hash[],
		options?: { all: boolean },
	): physics.ray_cast_response_message[] | undefined;

	/**
	 * Ray casts are used to test for intersections against collision objects in the physics world.
	 * Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
	 * do not intersect with ray casts.
	 * Which collision objects to hit is filtered by their collision groups and can be configured
	 * through `groups`.
	 * The actual ray cast will be performed during the physics-update.
	 *
	 * - If an object is hit, the result will be reported via a ray_cast_response message.
	 * - If there is no object hit, the result will be reported via a ray_cast_missed message.
	 *
	 * @param from  the world position of the start of the ray
	 * @param to  the world position of the end of the ray
	 * @param groups  a lua table containing the hashed groups for which to test collisions against
	 * @param request_id  a number between [0,-255]. It will be sent back in the response for identification, 0 by default
	 */
	export function raycast_async(
		from: vmath.vector3,
		to: vmath.vector3,
		groups: hash[],
		request_id?: number,
	): void;

	/**
	 * Set the gravity in runtime. The gravity change is not global, it will only affect
	 * the collection that the function is called from.
	 * Note: For 2D physics the z component of the gravity vector will be ignored.
	 * @param gravity  the new gravity vector
	 */
	export function set_gravity(gravity: vmath.vector3): void;

	/**
	* Updates the group property of a collision object to the specified
	* string value. The group name should exist i.e. have been used in
	* a collision object in the editor.
	* @param url  the collision object affected.
	* @param group  the new group name to be assigned.
`local function change_collision_group()
     physics.set_group(&quot;#collisionobject&quot;, &quot;enemy&quot;)
end
`
	*/
	export function set_group(
		url: hash | url | string,
		group: hash | string,
	): void;

	/**
	 * Flips the collision shapes horizontally for a collision object
	 * @param url  the collision object that should flip its shapes
	 * @param flip  `true` if the collision object should flip its shapes, `false` if not
	 */
	export function set_hflip(url: hash | url | string, flip: boolean): void;

	/**
	* Updates the properties for an already connected joint. The joint has to be created before
	* properties can be changed.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @param properties  joint specific properties table
Note: The `collide_connected` field cannot be updated/changed after a connection has been made.
	*/
	export function set_joint_properties(
		collisionobject: hash | url | string,
		joint_id: hash | string,
		properties: any,
	): void;

	/**
	* sets a physics world event listener. If a function is set, physics messages will no longer be sent.
	* @param callback  A callback that receives information about all the physics interactions in this physics world.

`this`
The calling script
`event`
The type of event. Can be one of these messages:


- contact_point_event
- collision_event
- trigger_event
- ray_cast_response
- ray_cast_missed


`data`
The callback value data is a table that contains event-related data. See the documentation for details on the messages.

	*/
	export function set_listener(
		callback: (
			this: any,
			event:
				collision_event | contact_point_event | ray_cast_missed | ray_cast_response | trigger_event,
			data: object,
		) => void,
	): void;

	/**
	* Sets or clears the masking of a group (maskbit) in a collision object.
	* @param url  the collision object to change the mask of.
	* @param group  the name of the group (maskbit) to modify in the mask.
	* @param maskbit  boolean value of the new maskbit. 'true' to enable, 'false' to disable.
`local function make_invincible()
    -- no longer collide with the &quot;bullet&quot; group
    physics.set_maskbit(&quot;#collisionobject&quot;, &quot;bullet&quot;, false)
end
`
	*/
	export function set_maskbit(
		url: hash | url | string,
		group: hash | string,
		maskbit: boolean,
	): void;

	/**
	* Sets collision shape data for a collision object. Please note that updating data in 3D
	* can be quite costly for box and capsules. Because of the physics engine, the cost
	* comes from having to recreate the shape objects when certain shapes needs to be updated.
	* @param url  the collision object.
	* @param shape  the name of the shape to get data for.
	* @param table  the shape data to update the shape with.
See physics.get_shape for a detailed description of each field in the data table.
`local function set_shape_data()
    -- set capsule shape data
    local data = {}
    data.type = physics.SHAPE_TYPE_CAPSULE
    data.diameter = 10
    data.height = 20
    physics.set_shape(&quot;#collisionobject&quot;, &quot;my_capsule_shape&quot;, data)

    -- set sphere shape data
    data = {}
    data.type = physics.SHAPE_TYPE_SPHERE
    data.diameter = 10
    physics.set_shape(&quot;#collisionobject&quot;, &quot;my_sphere_shape&quot;, data)

    -- set box shape data
    data = {}
    data.type = physics.SHAPE_TYPE_BOX
    data.dimensions = vmath.vector3(10, 10, 5)
    physics.set_shape(&quot;#collisionobject&quot;, &quot;my_box_shape&quot;, data)
end
`
	*/
	export function set_shape(
		url: hash | url | string,
		shape: hash | string,
		table: AnyNotNil,
	): void;

	/**
	 * Flips the collision shapes vertically for a collision object
	 * @param url  the collision object that should flip its shapes
	 * @param flip  `true` if the collision object should flip its shapes, `false` if not
	 */
	export function set_vflip(url: hash | url | string, flip: boolean): void;

	/**
	 * The function recalculates the density of each shape based on the total area of all shapes and the specified mass, then updates the mass of the body accordingly.
	 * Note: Currently only supported in 2D physics.
	 * @param collisionobject  the collision object whose mass needs to be updated.
	 * @param mass  the new mass value to set for the collision object.
	 */
	export function update_mass(
		collisionobject: hash | url | string,
		mass: number,
	): void;

	/**
	* Collision objects tend to fall asleep when inactive for a small period of time for
	* efficiency reasons. This function wakes them up.
	* @param url  the collision object to wake.
`function on_input(self, action_id, action)
    if action_id == hash(&quot;test&quot;) and action.pressed then
        physics.wakeup(&quot;#collisionobject&quot;)
    end
end
`
	*/
	export function wakeup(url: hash | url | string): void;

	/**
	 * This message is sent back to the sender of a ray_cast_request, or to the physics world listener
	 * if it is set (see physics.set_listener), if the ray didn't hit any collision object.
	 * See physics.raycast_async for examples of how to use it.
	 */
	export type ray_cast_missed = 'ray_cast_missed';
	export type ray_cast_missed_message = { request_id: number };

	/**
	 * This message is sent back to the sender of a ray_cast_request, or to the physics world listener
	 * if it is set (see physics.set_listener), if the ray hits a collision object.
	 * See physics.raycast_async for examples of how to use it.
	 */
	export type ray_cast_response = 'ray_cast_response';
	export type ray_cast_response_message = {
		fraction: number;
		position: vmath.vector3;
		normal: vmath.vector3;
		id: hash;
		group: hash;
		request_id: number;
	};

	/**
	 * See physics.set_listener.
	 * This message is sent to a function specified in physics.set_listener
	 * when a collision object interacts with another collision object and one of them is a trigger.
	 * This message only reports that an interaction actually happened and will be sent once per colliding pair and frame.
	 * For more detailed information, check for the contact_point_event.
	 */
	export type trigger_event = 'trigger_event';

	/**
	 * This message is broadcasted to every component of an instance that has a collision object,
	 * when the collision object interacts with another collision object and one of them is a trigger.
	 * For a script to take action when such an interaction happens, it should check for this message
	 * in its `on_message` callback function.
	 * This message only reports that an interaction actually happened and will only be sent once per
	 * colliding pair and frame. To retrieve more detailed information, check for the
	 * `contact_point_response` instead.
	 */
	export type trigger_response = 'trigger_response';
	export type trigger_response_message = {
		other_id: hash;
		enter: boolean;
		other_group: hash;
		own_group: hash;
	};
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/profiler/|Documentation} */
declare namespace profiler {
	/**
	 * pause on current frame
	 */
	export const MODE_PAUSE: number & { readonly _MODE_: unique symbol };

	/**
	 * start recording
	 */
	export const MODE_RECORD: number & { readonly _MODE_: unique symbol };

	/**
	 * continously show latest frame
	 */
	export const MODE_RUN: number & { readonly _MODE_: unique symbol };

	/**
	 * pause at peak frame
	 */
	export const MODE_SHOW_PEAK_FRAME: number & {
		readonly _MODE_: unique symbol;
	};

	/**
	 * show full profiler ui
	 */
	export const VIEW_MODE_FULL: number & { readonly _VIEW_MODE_: unique symbol };

	/**
	 * show mimimal profiler ui
	 */
	export const VIEW_MODE_MINIMIZED: number & {
		readonly _VIEW_MODE_: unique symbol;
	};

	/**
	 * Creates and shows or hides and destroys the on-sceen profiler ui
	 * The profiler is a real-time tool that shows the numbers of milliseconds spent
	 * in each scope per frame as well as counters. The profiler is very useful for
	 * tracking down performance and resource problems.
	 * @param enabled  true to enable, false to disable
	 */
	export function enable_ui(enabled: boolean): void;

	/**
	 * Get the percent of CPU usage by the application, as reported by the OS.
	 * 🌎 HTML5.
	 * 🌎 Windows), this information is only available
	 * by default in the debug version of the engine. It can be enabled in release version as well
	 * by checking `track_cpu` under `profiler` in the `game.project` file.
	 * (This means that the engine will sample the CPU usage in intervalls during execution even in release mode.)
	 * @returns percent  of CPU used by the application
	 */
	export function get_cpu_usage(): number;

	/**
	 * Get the amount of memory used (resident/working set) by the application in bytes, as reported by the OS.
	 * 🌎 HTML5.
	 * The values are gathered from internal OS functions which correspond to the following;
	 *
	 *
	 *
	 * OS
	 * Value
	 *
	 *
	 *
	 *
	 * 🌎 Linux
	 * Resident memory
	 *
	 *
	 * 🌎 Windows
	 * Working set
	 *
	 *
	 * 🌎 HTML5
	 * 🌎 Not available
	 *
	 *
	 *
	 * @returns bytes  used by the application
	 */
	export function get_memory_usage(): number;

	/**
	 * Send a text to the profiler
	 * @param text  the string to send to the profiler
	 */
	export function log_text(text: string): void;

	/**
	 * Get the number of recorded frames in the on-screen profiler ui recording buffer
	 * @returns frame_count  the number of recorded frames, zero if on-screen profiler is disabled
	 */
	export function recorded_frame_count(): number;

	/**
	 * Starts a profile scope.
	 * @param name  The name of the scope
	 */
	export function scope_begin(name: string): void;

	/**
	 * End the current profile scope.
	 */
	export function scope_end(): void;

	/**
	* Set the on-screen profile mode - run, pause, record or show peak frame
	* @param mode  the mode to set the ui profiler in

- `profiler.MODE_RUN` This is default mode that continously shows the last frame
- `profiler.MODE_PAUSE` Pauses on the currently displayed frame
- `profiler.MODE_SHOW_PEAK_FRAME` Pauses on the currently displayed frame but shows a new frame if that frame is slower
- `profiler.MODE_RECORD` Records all incoming frames to the recording buffer

To stop recording, switch to a different mode such as `MODE_PAUSE` or `MODE_RUN`.
You can also use the `view_recorded_frame` function to display a recorded frame. Doing so stops the recording as well.
Every time you switch to recording mode the recording buffer is cleared.
The recording buffer is also cleared when setting the `MODE_SHOW_PEAK_FRAME` mode.
	*/
	export function set_ui_mode(
		mode:
			typeof profiler.MODE_PAUSE | typeof profiler.MODE_RECORD | typeof profiler.MODE_RUN | typeof profiler.MODE_SHOW_PEAK_FRAME,
	): void;

	/**
	* Set the on-screen profile view mode - minimized or expanded
	* @param mode  the view mode to set the ui profiler in

- `profiler.VIEW_MODE_FULL` The default mode which displays all the ui profiler details
- `profiler.VIEW_MODE_MINIMIZED` Minimized mode which only shows the top header (fps counters and ui profiler mode)

	*/
	export function set_ui_view_mode(
		mode: typeof profiler.VIEW_MODE_FULL | typeof profiler.VIEW_MODE_MINIMIZED,
	): void;

	/**
	 * Shows or hides the time the engine waits for vsync in the on-screen profiler
	 * Each frame the engine waits for vsync and depending on your vsync settings and how much time
	 * your game logic takes this time can dwarf the time in the game logic making it hard to
	 * see details in the on-screen profiler graph and lists.
	 * Also, by hiding this the FPS times in the header show the time spent each time excuding the
	 * time spent waiting for vsync. This shows you how long time your game is spending actively
	 * working each frame.
	 * This setting also effects the display of recorded frames but does not affect the actual
	 * recorded frames so it is possible to toggle this on and off when viewing recorded frames.
	 * By default the vsync wait times is displayed in the profiler.
	 * @param visible  true to include it in the display, false to hide it.
	 */
	export function set_ui_vsync_wait_visible(visible: boolean): void;

	/**
	* Pauses and displays a frame from the recording buffer in the on-screen profiler ui
	* The frame to show can either be an absolute frame or a relative frame to the current frame.
	* @param frame_index  a table where you specify one of the following parameters:

- `distance` The offset from the currently displayed frame (this is truncated between zero and the number of recorded frames)
- `frame` The frame index in the recording buffer (1 is first recorded frame)

	*/
	export function view_recorded_frame(frame_index: {
		distance?: number;
		frame?: number;
	}): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/render/|Documentation} */
declare namespace render {
	/**
	 * Set render clear color. This is the color that appears on the screen where nothing is rendered, i.e. background.
	 */
	export type clear_color = 'clear_color';
	export type clear_color_message = { color: vmath.vector4 };

	/**
	 * Draw a text on the screen. This should be used for debugging purposes only.
	 */
	export type draw_debug_text = 'draw_debug_text';
	export type draw_debug_text_message = {
		position: vmath.vector3;
		text: string;
		color: vmath.vector4;
	};

	/**
	 * Draw a line on the screen. This should mostly be used for debugging purposes.
	 */
	export type draw_line = 'draw_line';
	export type draw_line_message = {
		start_point: vmath.vector3;
		end_point: vmath.vector3;
		color: vmath.vector4;
	};

	/**
	 *
	 */
	export const BLEND_CONSTANT_ALPHA: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_CONSTANT_COLOR: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_DST_ALPHA: number & { readonly _BLEND_: unique symbol };

	/**
	 *
	 */
	export const BLEND_DST_COLOR: number & { readonly _BLEND_: unique symbol };

	/**
	 *
	 */
	export const BLEND_ONE: number & { readonly _BLEND_: unique symbol };

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_CONSTANT_ALPHA: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_CONSTANT_COLOR: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_DST_ALPHA: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_DST_COLOR: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_SRC_ALPHA: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_ONE_MINUS_SRC_COLOR: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_SRC_ALPHA: number & { readonly _BLEND_: unique symbol };

	/**
	 *
	 */
	export const BLEND_SRC_ALPHA_SATURATE: number & {
		readonly _BLEND_: unique symbol;
	};

	/**
	 *
	 */
	export const BLEND_SRC_COLOR: number & { readonly _BLEND_: unique symbol };

	/**
	 *
	 */
	export const BLEND_ZERO: number & { readonly _BLEND_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_COLOR0_BIT: number & { readonly _BUFFER_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_COLOR1_BIT: number & { readonly _BUFFER_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_COLOR2_BIT: number & { readonly _BUFFER_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_COLOR3_BIT: number & { readonly _BUFFER_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_COLOR_BIT: number & { readonly _BUFFER_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_DEPTH_BIT: number & { readonly _BUFFER_: unique symbol };

	/**
	 *
	 */
	export const BUFFER_STENCIL_BIT: number & {
		readonly _BUFFER_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_ALWAYS: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_EQUAL: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_GEQUAL: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_GREATER: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_LEQUAL: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_LESS: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_NEVER: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const COMPARE_FUNC_NOTEQUAL: number & {
		readonly _COMPARE_FUNC_: unique symbol;
	};

	/**
	 *
	 */
	export const FACE_BACK: number & { readonly _FACE_: unique symbol };

	/**
	 *
	 */
	export const FACE_FRONT: number & { readonly _FACE_: unique symbol };

	/**
	 *
	 */
	export const FACE_FRONT_AND_BACK: number & { readonly _FACE_: unique symbol };

	/**
	 *
	 */
	export const FILTER_LINEAR: number & { readonly _FILTER_: unique symbol };

	/**
	 *
	 */
	export const FILTER_NEAREST: number & { readonly _FILTER_: unique symbol };

	/**
	 *
	 */
	export const FORMAT_DEPTH: number & { readonly _FORMAT_: unique symbol };

	/**
	 *
	 */
	export const FORMAT_LUMINANCE: number & { readonly _FORMAT_: unique symbol };

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_R16F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_R32F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RG16F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RG32F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 *
	 */
	export const FORMAT_RGB: number & { readonly _FORMAT_: unique symbol };

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGB16F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGB32F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 *
	 */
	export const FORMAT_RGBA: number & { readonly _FORMAT_: unique symbol };

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGBA16F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 * May be undefined if the format isn't supported
	 */
	export const FORMAT_RGBA32F:
		| (number & { readonly _FORMAT_: unique symbol })
		| undefined;

	/**
	 *
	 */
	export const FORMAT_STENCIL: number & { readonly _FORMAT_: unique symbol };

	/**
	 *
	 */
	export const FRUSTUM_PLANES_ALL: number & {
		readonly _FRUSTUM_PLANES_: unique symbol;
	};

	/**
	 *
	 */
	export const FRUSTUM_PLANES_SIDES: number & {
		readonly _FRUSTUM_PLANES_: unique symbol;
	};

	/**
	 *
	 */
	export const RENDER_TARGET_DEFAULT: number & {
		readonly _RENDER_TARGET_DEFAULT: unique symbol;
	};

	/**
	 *
	 */
	export const STATE_BLEND: number & { readonly _STATE_: unique symbol };

	/**
	 *
	 */
	export const STATE_CULL_FACE: number & { readonly _STATE_: unique symbol };

	/**
	 *
	 */
	export const STATE_DEPTH_TEST: number & { readonly _STATE_: unique symbol };

	/**
	 *
	 */
	export const STATE_POLYGON_OFFSET_FILL: number & {
		readonly _STATE_: unique symbol;
	};

	/**
	 *
	 */
	export const STATE_STENCIL_TEST: number & { readonly _STATE_: unique symbol };

	/**
	 *
	 */
	export const STENCIL_OP_DECR: number & { readonly _STENCIL_: unique symbol };

	/**
	 *
	 */
	export const STENCIL_OP_DECR_WRAP: number & {
		readonly _STENCIL_: unique symbol;
	};

	/**
	 *
	 */
	export const STENCIL_OP_INCR: number & { readonly _STENCIL_: unique symbol };

	/**
	 *
	 */
	export const STENCIL_OP_INCR_WRAP: number & {
		readonly _STENCIL_: unique symbol;
	};

	/**
	 *
	 */
	export const STENCIL_OP_INVERT: number & {
		readonly _STENCIL_: unique symbol;
	};

	/**
	 *
	 */
	export const STENCIL_OP_KEEP: number & { readonly _STENCIL_: unique symbol };

	/**
	 *
	 */
	export const STENCIL_OP_REPLACE: number & {
		readonly _STENCIL_: unique symbol;
	};

	/**
	 *
	 */
	export const STENCIL_OP_ZERO: number & { readonly _STENCIL_: unique symbol };

	/**
	 *
	 */
	export const WRAP_CLAMP_TO_BORDER: number & {
		readonly _WRAP_: unique symbol;
	};

	/**
	 *
	 */
	export const WRAP_CLAMP_TO_EDGE: number & { readonly _WRAP_: unique symbol };

	/**
	 *
	 */
	export const WRAP_MIRRORED_REPEAT: number & {
		readonly _WRAP_: unique symbol;
	};

	/**
	 *
	 */
	export const WRAP_REPEAT: number & { readonly _WRAP_: unique symbol };

	/**
	* Clear buffers in the currently enabled render target with specified value. If the render target has been created with multiple
	* color attachments, all buffers will be cleared with the same value.
	* @param buffers  table with keys specifying which buffers to clear and values set to clear values. Available keys are:

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	*/
	export function clear(buffers: {
		[
			key:
				| typeof render.BUFFER_COLOR_BIT
				| typeof render.BUFFER_DEPTH_BIT
				| typeof render.BUFFER_STENCIL_BIT
		]: vmath.vector4 | number;
	}): void;

	/**
	 * Constant buffers are used to set shader program variables and are optionally passed to the `render.draw()` function.
	 * The buffer's constant elements can be indexed like an ordinary Lua table, but you can't iterate over them with pairs() or ipairs().
	 * @returns buffer  new constant buffer
	 */
	export function constant_buffer(): buffer;

	/**
	 * Deletes a render target created by a render script.
	 * You cannot delete a render target resource.
	 * @param render_target  render target to delete
	 */
	export function delete_render_target(render_target: rendertarget): void;

	/**
	 * If a material is currently enabled, disable it.
	 * The name of the material must be specified in the ".render" resource set
	 * in the "game.project" setting.
	 */
	export function disable_material(): void;

	/**
	* Disables a render state.
	* @param state  state to disable

- `render.STATE_DEPTH_TEST`
- `render.STATE_STENCIL_TEST`
- `render.STATE_BLEND`
🤖 not available on iOS and Android)
- `render.STATE_CULL_FACE`
- `render.STATE_POLYGON_OFFSET_FILL`

	*/
	export function disable_state(
		state:
			typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_DEPTH_TEST | typeof render.STATE_POLYGON_OFFSET_FILL | typeof render.STATE_STENCIL_TEST,
	): void;

	/**
	 * Disables a texture that has previourly been enabled.
	 * @param binding  texture binding, either by texture unit, string or hash that should be disabled
	 */
	export function disable_texture(binding: hash | number | string): void;

	/**
	* Dispatches the currently enabled compute program. The dispatch call takes three arguments x,y,z which constitutes
	* the 'global working group' of the compute dispatch. Together with the 'local working group' specified in the compute shader
	* as a layout qualifier, these two sets of parameters forms the number of invocations the compute shader will execute.
	* An optional constant buffer can be provided to override the default constants. If no constants buffer is provided, a default
	* system constants buffer is used containing constants as defined in the compute program.
	* @param x  global work group size X
	* @param y  global work group size Y
	* @param z  global work group size Z
	* @param options  optional table with properties:

`constants`
optional constants to use while rendering

	*/
	export function dispatch_compute(
		x: number,
		y: number,
		z: number,
		options?: any,
	): void;

	/**
	* Draws all objects that match a specified predicate. An optional constant buffer can be
	* provided to override the default constants. If no constants buffer is provided, a default
	* system constants buffer is used containing constants as defined in materials and set through
	* go.set (or particlefx.set_constant) on visual components.
	* @param predicate  predicate to draw for
	* @param options  optional table with properties:

`frustum`
A frustum matrix used to cull renderable items. (E.g. `local frustum = proj * view`). default=undefined
`frustum_planes`
Determines which sides of the frustum will be used. Default is render.FRUSTUM_PLANES_SIDES.


- render.FRUSTUM_PLANES_SIDES : The left, right, top and bottom sides of the frustum.
- render.FRUSTUM_PLANES_ALL : All 6 sides of the frustum.


`constants`
optional constants to use while rendering

	*/
	export function draw(
		predicate: predicate,
		options?: {
			frustum?: vmath.matrix4;
			frustum_planes?:
				typeof render.FRUSTUM_PLANES_ALL | typeof render.FRUSTUM_PLANES_SIDES;
			constants?: buffer;
		},
	): void;

	/**
	* Draws all 3d debug graphics such as lines drawn with "draw_line" messages and physics visualization.
	* @param options  optional table with properties:

`frustum`
A frustum matrix used to cull renderable items. (E.g. `local frustum = proj * view`). May be undefined.
`frustum_planes`
Determines which sides of the frustum will be used. Default is render.FRUSTUM_PLANES_SIDES.


- render.FRUSTUM_PLANES_SIDES : The left, right, top and bottom sides of the frustum.
- render.FRUSTUM_PLANES_ALL : All sides of the frustum.

	*/
	export function draw_debug3d(options?: {
		frustum?: vmath.matrix4;
		frustum_planes?:
			typeof render.FRUSTUM_PLANES_ALL | typeof render.FRUSTUM_PLANES_SIDES;
	}): void;

	/**
	 * If another material was already enabled, it will be automatically disabled
	 * and the specified material is used instead.
	 * The name of the material must be specified in the ".render" resource set
	 * in the "game.project" setting.
	 * @param material_id  material id to enable
	 */
	export function enable_material(material_id: hash | string): void;

	/**
	* Enables a particular render state. The state will be enabled until disabled.
	* @param state  state to enable

- `render.STATE_DEPTH_TEST`
- `render.STATE_STENCIL_TEST`
- `render.STATE_BLEND`
🤖 not available on iOS and Android)
- `render.STATE_CULL_FACE`
- `render.STATE_POLYGON_OFFSET_FILL`

	*/
	export function enable_state(
		state:
			typeof render.STATE_BLEND | typeof render.STATE_CULL_FACE | typeof render.STATE_DEPTH_TEST | typeof render.STATE_POLYGON_OFFSET_FILL | typeof render.STATE_STENCIL_TEST,
	): void;

	/**
	* Sets the specified texture handle for a render target attachment or a regular texture
	* that should be used for rendering. The texture can be bound to either a texture unit
	* or to a sampler name by a hash or a string.
	* A texture can be bound to multiple units and sampler names at the same time,
	* the actual binding will be applied to the shaders when a shader program is bound.
	* When mixing binding using both units and sampler names, you might end up in situations
	* where two different textures will be applied to the same bind location in the shader.
	* In this case, the texture set to the named sampler will take precedence over the unit.
	* Note that you can bind multiple sampler names to the same texture, in case you want to reuse
	* the same texture for differnt use-cases. It is however recommended that you use the same name
	* everywhere for the textures that should be shared across different materials.
	* @param binding  texture binding, either by texture unit, string or hash for the sampler name that the texture should be bound to
	* @param handle_or_name  render target or texture handle that should be bound, or a named resource in the "Render Resource" table in the currently assigned .render file
	* @param buffer_type  optional buffer type from which to enable the texture. Note that this argument only applies to render targets. Defaults to `render.BUFFER_COLOR_BIT`. These values are supported:

- `render.BUFFER_COLOR_BIT`

If The render target has been created as depth and/or stencil textures, these buffer types can be used:

- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

If the render target has been created with multiple color attachments, these buffer types can be used
to enable those textures as well. Currently 4 color attachments are supported:

- `render.BUFFER_COLOR0_BIT`
- `render.BUFFER_COLOR1_BIT`
- `render.BUFFER_COLOR2_BIT`
- `render.BUFFER_COLOR3_BIT`

	*/
	export function enable_texture(
		binding: hash | number | string,
		handle_or_name: any,
		buffer_type?:
			typeof render.BUFFER_COLOR_BIT | typeof render.BUFFER_COLOR0_BIT | typeof render.BUFFER_COLOR1_BIT | typeof render.BUFFER_COLOR2_BIT | typeof render.BUFFER_COLOR3_BIT | typeof render.BUFFER_DEPTH_BIT | typeof render.BUFFER_STENCIL_BIT,
	): void;

	/**
	 * Returns the logical window height that is set in the "game.project" settings.
	 * Note that the actual window pixel size can change, either by device constraints
	 * or user input.
	 * @returns height  specified window height
	 */
	export function get_height(): number;

	/**
	* Returns the specified buffer height from a render target.
	* @param render_target  render target from which to retrieve the buffer height
	* @param buffer_type  which type of buffer to retrieve the height from

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	* @returns height  the height of the render target buffer texture
	*/
	export function get_render_target_height(
		render_target: rendertarget,
		buffer_type:
			| typeof render.BUFFER_COLOR_BIT
			| typeof render.BUFFER_DEPTH_BIT
			| typeof render.BUFFER_STENCIL_BIT,
	): number;

	/**
	* Returns the specified buffer width from a render target.
	* @param render_target  render target from which to retrieve the buffer width
	* @param buffer_type  which type of buffer to retrieve the width from

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_COLOR[x]_BIT` (x: [0..3], if supported!)
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	* @returns width  the width of the render target buffer texture
	*/
	export function get_render_target_width(
		render_target: rendertarget,
		buffer_type:
			| typeof render.BUFFER_COLOR_BIT
			| typeof render.BUFFER_COLOR0_BIT
			| typeof render.BUFFER_COLOR1_BIT
			| typeof render.BUFFER_COLOR2_BIT
			| typeof render.BUFFER_COLOR3_BIT
			| typeof render.BUFFER_DEPTH_BIT
			| typeof render.BUFFER_STENCIL_BIT,
	): number;

	/**
	 * Returns the logical window width that is set in the "game.project" settings.
	 * Note that the actual window pixel size can change, either by device constraints
	 * or user input.
	 * @returns width  specified window width (number)
	 */
	export function get_width(): number;

	/**
	 * Returns the actual physical window height.
	 * Note that this value might differ from the logical height that is set in the
	 * "game.project" settings.
	 * @returns height  actual window height
	 */
	export function get_window_height(): number;

	/**
	 * Returns the actual physical window width.
	 * Note that this value might differ from the logical width that is set in the
	 * "game.project" settings.
	 * @returns width  actual window width
	 */
	export function get_window_width(): number;

	/**
	 * This function returns a new render predicate for objects with materials matching
	 * the provided material tags. The provided tags are combined into a bit mask
	 * for the predicate. If multiple tags are provided, the predicate matches materials
	 * with all tags ANDed together.
	 * The current limit to the number of tags that can be defined is `64`.
	 * @param tags  table of tags that the predicate should match. The tags can be of either hash or string type
	 * @returns predicate  new predicate
	 */
	export function predicate(
		tags: Array<hash | string> | LuaSet<hash | string>,
	): predicate;

	/**
	 * Creates a new render target according to the supplied
	 * specification table.
	 * The table should contain keys specifying which buffers should be created
	 * with what parameters. Each buffer key should have a table value consisting
	 * of parameters. The following parameter keys are available:
	 *
	 *
	 *
	 * Key
	 * Values
	 *
	 *
	 *
	 *
	 * `format`
	 * `render.FORMAT_LUMINANCE``render.FORMAT_RGB``render.FORMAT_RGBA``render.FORMAT_DEPTH``render.FORMAT_STENCIL``render.FORMAT_RGBA32F``render.FORMAT_RGBA16F`
	 *
	 *
	 * `width`
	 * number
	 *
	 *
	 * `height`
	 * number
	 *
	 *
	 * `min_filter` (optional)
	 * `render.FILTER_LINEAR``render.FILTER_NEAREST`
	 *
	 *
	 * `mag_filter` (optional)
	 * `render.FILTER_LINEAR``render.FILTER_NEAREST`
	 *
	 *
	 * `u_wrap`     (optional)
	 * `render.WRAP_CLAMP_TO_BORDER``render.WRAP_CLAMP_TO_EDGE``render.WRAP_MIRRORED_REPEAT``render.WRAP_REPEAT`
	 *
	 *
	 * `v_wrap`     (optional)
	 * `render.WRAP_CLAMP_TO_BORDER``render.WRAP_CLAMP_TO_EDGE``render.WRAP_MIRRORED_REPEAT``render.WRAP_REPEAT`
	 *
	 *
	 * `flags`      (optional)
	 * `render.TEXTURE_BIT` (only applicable to depth and stencil buffers)
	 *
	 *
	 *
	 * The render target can be created to support multiple color attachments. Each attachment can have different format settings and texture filters,
	 * but attachments must be added in sequence, meaning you cannot create a render target at slot 0 and 3.
	 * Instead it has to be created with all four buffer types ranging from [0..3] (as denoted by render.BUFFER_COLORX_BIT where 'X' is the attachment you want to create).
	 * It is not guaranteed that the device running the script can support creating render targets with multiple color attachments. To check if the device can support multiple attachments,
	 * you can check if the `render` table contains any of the `BUFFER_COLOR1_BIT`, `BUFFER_COLOR2_BIT` or `BUFFER_COLOR3_BIT` constants:
	 * `function init(self)
	 *     if render.BUFFER_COLOR1_BIT == undefined then
	 *         -- this devices does not support multiple color attachments
	 *     end
	 * end
	 * `
	 * @param name  render target name
	 * @param parameters  table of buffer parameters, see the description for available keys and values
	 * @returns render_target  new render target
	 */
	export function render_target(
		name: string,
		parameters: {
			[
				key:
					| typeof render.BUFFER_COLOR_BIT
					| typeof render.BUFFER_COLOR0_BIT
					| typeof render.BUFFER_COLOR1_BIT
					| typeof render.BUFFER_COLOR2_BIT
					| typeof render.BUFFER_COLOR3_BIT
					| typeof render.BUFFER_DEPTH_BIT
					| typeof render.BUFFER_STENCIL_BIT
			]: {
				format:
					typeof render.FORMAT_DEPTH | typeof render.FORMAT_LUMINANCE | typeof render.FORMAT_RGB | typeof render.FORMAT_RGBA | typeof render.FORMAT_RGBA16F | typeof render.FORMAT_RGBA32F | typeof render.FORMAT_STENCIL;
				width: number;
				height: number;
				min_filter?: typeof render.FILTER_LINEAR | typeof render.FILTER_NEAREST;
				mag_filter?: typeof render.FILTER_LINEAR | typeof render.FILTER_NEAREST;
				u_wrap?:
					| typeof render.WRAP_CLAMP_TO_BORDER
					| typeof render.WRAP_CLAMP_TO_EDGE
					| typeof render.WRAP_MIRRORED_REPEAT
					| typeof render.WRAP_REPEAT;
				v_wrap?:
					| typeof render.WRAP_CLAMP_TO_BORDER
					| typeof render.WRAP_CLAMP_TO_EDGE
					| typeof render.WRAP_MIRRORED_REPEAT
					| typeof render.WRAP_REPEAT;
				flags?: unknown;
			};
		},
	): rendertarget;

	/**
	 * Specifies the arithmetic used when computing pixel values that are written to the frame
	 * buffer. In RGBA mode, pixels can be drawn using a function that blends the source RGBA
	 * pixel values with the destination pixel values already in the frame buffer.
	 * Blending is initially disabled.
	 * `source_factor` specifies which method is used to scale the source color components.
	 * `destination_factor` specifies which method is used to scale the destination color
	 * components.
	 * Source color components are referred to as (Rs,Gs,Bs,As).
	 * Destination color components are referred to as (Rd,Gd,Bd,Ad).
	 * The color specified by setting the blendcolor is referred to as (Rc,Gc,Bc,Ac).
	 * The source scale factor is referred to as (sR,sG,sB,sA).
	 * The destination scale factor is referred to as (dR,dG,dB,dA).
	 * The color values have integer values between 0 and (kR,kG,kB,kA), where kc = 2mc - 1 and mc is the number of bitplanes for that color. I.e for 8 bit color depth, color values are between `0` and `255`.
	 * Available factor constants and corresponding scale factors:
	 *
	 *
	 *
	 * Factor constant
	 * Scale factor (fR,fG,fB,fA)
	 *
	 *
	 *
	 *
	 * `render.BLEND_ZERO`
	 * (0,0,0,0)
	 *
	 *
	 * `render.BLEND_ONE`
	 * (1,1,1,1)
	 *
	 *
	 * `render.BLEND_SRC_COLOR`
	 * (Rs/kR,Gs/kG,Bs/kB,As/kA)
	 *
	 *
	 * `render.BLEND_ONE_MINUS_SRC_COLOR`
	 * (1,1,1,1) - (Rs/kR,Gs/kG,Bs/kB,As/kA)
	 *
	 *
	 * `render.BLEND_DST_COLOR`
	 * (Rd/kR,Gd/kG,Bd/kB,Ad/kA)
	 *
	 *
	 * `render.BLEND_ONE_MINUS_DST_COLOR`
	 * (1,1,1,1) - (Rd/kR,Gd/kG,Bd/kB,Ad/kA)
	 *
	 *
	 * `render.BLEND_SRC_ALPHA`
	 * (As/kA,As/kA,As/kA,As/kA)
	 *
	 *
	 * `render.BLEND_ONE_MINUS_SRC_ALPHA`
	 * (1,1,1,1) - (As/kA,As/kA,As/kA,As/kA)
	 *
	 *
	 * `render.BLEND_DST_ALPHA`
	 * (Ad/kA,Ad/kA,Ad/kA,Ad/kA)
	 *
	 *
	 * `render.BLEND_ONE_MINUS_DST_ALPHA`
	 * (1,1,1,1) - (Ad/kA,Ad/kA,Ad/kA,Ad/kA)
	 *
	 *
	 * `render.BLEND_CONSTANT_COLOR`
	 * (Rc,Gc,Bc,Ac)
	 *
	 *
	 * `render.BLEND_ONE_MINUS_CONSTANT_COLOR`
	 * (1,1,1,1) - (Rc,Gc,Bc,Ac)
	 *
	 *
	 * `render.BLEND_CONSTANT_ALPHA`
	 * (Ac,Ac,Ac,Ac)
	 *
	 *
	 * `render.BLEND_ONE_MINUS_CONSTANT_ALPHA`
	 * (1,1,1,1) - (Ac,Ac,Ac,Ac)
	 *
	 *
	 * `render.BLEND_SRC_ALPHA_SATURATE`
	 * (i,i,i,1) where i = min(As, kA - Ad) /kA
	 *
	 *
	 *
	 * The blended RGBA values of a pixel comes from the following equations:
	 *
	 * - Rd = min(kR, Rs * sR + Rd * dR)
	 * - Gd = min(kG, Gs * sG + Gd * dG)
	 * - Bd = min(kB, Bs * sB + Bd * dB)
	 * - Ad = min(kA, As * sA + Ad * dA)
	 *
	 * Blend function `(render.BLEND_SRC_ALPHA, render.BLEND_ONE_MINUS_SRC_ALPHA)` is useful for
	 * drawing with transparency when the drawn objects are sorted from farthest to nearest.
	 * It is also useful for drawing antialiased points and lines in arbitrary order.
	 * @param source_factor  source factor
	 * @param destination_factor  destination factor
	 */
	export function set_blend_func(
		source_factor:
			typeof render.BLEND_CONSTANT_ALPHA | typeof render.BLEND_CONSTANT_COLOR | typeof render.BLEND_DST_ALPHA | typeof render.BLEND_DST_COLOR | typeof render.BLEND_ONE | typeof render.BLEND_ONE_MINUS_CONSTANT_ALPHA | typeof render.BLEND_ONE_MINUS_CONSTANT_COLOR | typeof render.BLEND_ONE_MINUS_DST_ALPHA | typeof render.BLEND_ONE_MINUS_DST_COLOR | typeof render.BLEND_ONE_MINUS_SRC_ALPHA | typeof render.BLEND_ONE_MINUS_SRC_COLOR | typeof render.BLEND_SRC_ALPHA | typeof render.BLEND_SRC_ALPHA_SATURATE | typeof render.BLEND_SRC_COLOR | typeof render.BLEND_ZERO,
		destination_factor:
			typeof render.BLEND_CONSTANT_ALPHA | typeof render.BLEND_CONSTANT_COLOR | typeof render.BLEND_DST_ALPHA | typeof render.BLEND_DST_COLOR | typeof render.BLEND_ONE | typeof render.BLEND_ONE_MINUS_CONSTANT_ALPHA | typeof render.BLEND_ONE_MINUS_CONSTANT_COLOR | typeof render.BLEND_ONE_MINUS_DST_ALPHA | typeof render.BLEND_ONE_MINUS_DST_COLOR | typeof render.BLEND_ONE_MINUS_SRC_ALPHA | typeof render.BLEND_ONE_MINUS_SRC_COLOR | typeof render.BLEND_SRC_ALPHA | typeof render.BLEND_SRC_ALPHA_SATURATE | typeof render.BLEND_SRC_COLOR | typeof render.BLEND_ZERO,
	): void;

	/**
	* Sets the current render camera to be used for rendering. If a render camera
	* has been set by the render script, the renderer will be using its projection and view matrix
	* during rendering. If a projection and/or view matrix has been set by the render script,
	* they will not be used until the current render camera has been reset by calling `render.set_camera()`.
	* If the 'use_frustum' flag in the options table has been set to true, the renderer will automatically use the
	* camera frustum for frustum culling regardless of what frustum is being passed into the render.draw() function.
	* Note that the frustum plane option in render.draw can still be used together with the camera.
	* @param camera  camera id to use, or undefined to reset
	* @param options  optional table with properties:

`use_frustum`
If true, the renderer will use the cameras view-projection matrix for frustum culling (default: false)

	*/
	export function set_camera(
		camera: any,
		options?: { use_frustum: boolean },
	): void;

	/**
	 * Specifies whether the individual color components in the frame buffer is enabled for writing (`true`) or disabled (`false`). For example, if `blue` is `false`, nothing is written to the blue component of any pixel in any of the color buffers, regardless of the drawing operation attempted. Note that writing are either enabled or disabled for entire color components, not the individual bits of a component.
	 * The component masks are all initially `true`.
	 * @param red  red mask
	 * @param green  green mask
	 * @param blue  blue mask
	 * @param alpha  alpha mask
	 */
	export function set_color_mask(
		red: boolean,
		green: boolean,
		blue: boolean,
		alpha: boolean,
	): void;

	/**
	 * The name of the compute program must be specified in the ".render" resource set
	 * in the "game.project" setting. If undefined (or no arguments) are passed to this function,
	 * the current compute program will instead be disabled.
	 * @param compute  compute id to use, or undefined to disable
	 */
	export function set_compute(compute: any): void;

	/**
	* Specifies whether front- or back-facing polygons can be culled
	* when polygon culling is enabled. Polygon culling is initially disabled.
	* If mode is `render.FACE_FRONT_AND_BACK`, no polygons are drawn, but other
	* primitives such as points and lines are drawn. The initial value for
	* `face_type` is `render.FACE_BACK`.
	* @param face_type  face type

- `render.FACE_FRONT`
- `render.FACE_BACK`
- `render.FACE_FRONT_AND_BACK`

	*/
	export function set_cull_face(
		face_type:
			typeof render.FACE_BACK | typeof render.FACE_FRONT | typeof render.FACE_FRONT_AND_BACK,
	): void;

	/**
	 * Specifies the function that should be used to compare each incoming pixel
	 * depth value with the value present in the depth buffer.
	 * The comparison is performed only if depth testing is enabled and specifies
	 * the conditions under which a pixel will be drawn.
	 * Function constants:
	 *
	 * - `render.COMPARE_FUNC_NEVER` (never passes)
	 * - `render.COMPARE_FUNC_LESS` (passes if the incoming depth value is less than the stored value)
	 * - `render.COMPARE_FUNC_LEQUAL` (passes if the incoming depth value is less than or equal to the stored value)
	 * - `render.COMPARE_FUNC_GREATER` (passes if the incoming depth value is greater than the stored value)
	 * - `render.COMPARE_FUNC_GEQUAL` (passes if the incoming depth value is greater than or equal to the stored value)
	 * - `render.COMPARE_FUNC_EQUAL` (passes if the incoming depth value is equal to the stored value)
	 * - `render.COMPARE_FUNC_NOTEQUAL` (passes if the incoming depth value is not equal to the stored value)
	 * - `render.COMPARE_FUNC_ALWAYS` (always passes)
	 *
	 * The depth function is initially set to `render.COMPARE_FUNC_LESS`.
	 * @param func  depth test function, see the description for available values
	 */
	export function set_depth_func(
		func:
			typeof render.COMPARE_FUNC_ALWAYS | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_NOTEQUAL,
	): void;

	/**
	 * Specifies whether the depth buffer is enabled for writing. The supplied mask governs
	 * if depth buffer writing is enabled (`true`) or disabled (`false`).
	 * The mask is initially `true`.
	 * @param depth  depth mask
	 */
	export function set_depth_mask(depth: boolean): void;

	/**
	 * Sets the scale and units used to calculate depth values.
	 * If `render.STATE_POLYGON_OFFSET_FILL` is enabled, each fragment's depth value
	 * is offset from its interpolated value (depending on the depth value of the
	 * appropriate vertices). Polygon offset can be used when drawing decals, rendering
	 * hidden-line images etc.
	 * `factor` specifies a scale factor that is used to create a variable depth
	 * offset for each polygon. The initial value is `0`.
	 * `units` is multiplied by an implementation-specific value to create a
	 * constant depth offset. The initial value is `0`.
	 * The value of the offset is computed as `factor` &times; `DZ` + `r` &times; `units`
	 * `DZ` is a measurement of the depth slope of the polygon which is the change in z (depth)
	 * values divided by the change in either x or y coordinates, as you traverse a polygon.
	 * The depth values are in window coordinates, clamped to the range [0, 1].
	 * `r` is the smallest value that is guaranteed to produce a resolvable difference.
	 * It's value is an implementation-specific constant.
	 * The offset is added before the depth test is performed and before the
	 * value is written into the depth buffer.
	 * @param factor  polygon offset factor
	 * @param units  polygon offset units
	 */
	export function set_polygon_offset(factor: number, units: number): void;

	/**
	 * Sets the projection matrix to use when rendering.
	 * @param matrix  projection matrix
	 */
	export function set_projection(matrix: vmath.matrix4): void;

	/**
	* Sets a render target. Subsequent draw operations will be to the
	* render target until it is replaced by a subsequent call to set_render_target.
	* This function supports render targets created by a render script, or a render target resource.
	* @param render_target  render target to set. render.RENDER_TARGET_DEFAULT to set the default render target
	* @param options  optional table with behaviour parameters

`transient`
Transient frame buffer types are only valid while the render target is active, i.e becomes undefined when a new target is set by a subsequent call to set_render_target.
 Default is all non-transient. Be aware that some hardware uses a combined depth stencil buffer and when this is the case both are considered non-transient if exclusively selected!
 A buffer type defined that doesn't exist in the render target is silently ignored.


- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	*/
	export function set_render_target(
		render_target: rendertarget,
		options?: Array<
			| typeof render.BUFFER_COLOR_BIT
			| typeof render.BUFFER_DEPTH_BIT
			| typeof render.BUFFER_STENCIL_BIT
		>,
	): void;

	/**
	 * Sets the render target size for a render target created from
	 * either a render script, or from a render target resource.
	 * @param render_target  render target to set size for
	 * @param width  new render target width
	 * @param height  new render target height
	 */
	export function set_render_target_size(
		render_target: rendertarget,
		width: number,
		height: number,
	): void;

	/**
	 * Stenciling is similar to depth-buffering as it enables and disables drawing on a
	 * per-pixel basis. First, GL drawing primitives are drawn into the stencil planes.
	 * Second, geometry and images are rendered but using the stencil planes to mask out
	 * where to draw.
	 * The stencil test discards a pixel based on the outcome of a comparison between the
	 * reference value `ref` and the corresponding value in the stencil buffer.
	 * `func` specifies the comparison function. See the table below for values.
	 * The initial value is `render.COMPARE_FUNC_ALWAYS`.
	 * `ref` specifies the reference value for the stencil test. The value is clamped to
	 * the range [0, 2n-1], where n is the number of bitplanes in the stencil buffer.
	 * The initial value is `0`.
	 * `mask` is ANDed with both the reference value and the stored stencil value when the test
	 * is done. The initial value is all `1`'s.
	 * Function constant:
	 *
	 * - `render.COMPARE_FUNC_NEVER` (never passes)
	 * - `render.COMPARE_FUNC_LESS` (passes if (ref &amp; mask) &lt; (stencil &amp; mask))
	 * - `render.COMPARE_FUNC_LEQUAL` (passes if (ref &amp; mask) &lt;= (stencil &amp; mask))
	 * - `render.COMPARE_FUNC_GREATER` (passes if (ref &amp; mask) &gt; (stencil &amp; mask))
	 * - `render.COMPARE_FUNC_GEQUAL` (passes if (ref &amp; mask) &gt;= (stencil &amp; mask))
	 * - `render.COMPARE_FUNC_EQUAL` (passes if (ref &amp; mask) = (stencil &amp; mask))
	 * - `render.COMPARE_FUNC_NOTEQUAL` (passes if (ref &amp; mask) != (stencil &amp; mask))
	 * - `render.COMPARE_FUNC_ALWAYS` (always passes)
	 *
	 * @param func  stencil test function, see the description for available values
	 * @param ref  reference value for the stencil test
	 * @param mask  mask that is ANDed with both the reference value and the stored stencil value when the test is done
	 */
	export function set_stencil_func(
		func:
			typeof render.COMPARE_FUNC_ALWAYS | typeof render.COMPARE_FUNC_EQUAL | typeof render.COMPARE_FUNC_GEQUAL | typeof render.COMPARE_FUNC_GREATER | typeof render.COMPARE_FUNC_LEQUAL | typeof render.COMPARE_FUNC_LESS | typeof render.COMPARE_FUNC_NEVER | typeof render.COMPARE_FUNC_NOTEQUAL,
		ref: number,
		mask: number,
	): void;

	/**
	 * The stencil mask controls the writing of individual bits in the stencil buffer.
	 * The least significant `n` bits of the parameter `mask`, where `n` is the number of
	 * bits in the stencil buffer, specify the mask.
	 * Where a `1` bit appears in the mask, the corresponding
	 * bit in the stencil buffer can be written. Where a `0` bit appears in the mask,
	 * the corresponding bit in the stencil buffer is never written.
	 * The mask is initially all `1`'s.
	 * @param mask  stencil mask
	 */
	export function set_stencil_mask(mask: number): void;

	/**
	 * The stencil test discards a pixel based on the outcome of a comparison between the
	 * reference value `ref` and the corresponding value in the stencil buffer.
	 * To control the test, call render.set_stencil_func.
	 * This function takes three arguments that control what happens to the stored stencil
	 * value while stenciling is enabled. If the stencil test fails, no change is made to the
	 * pixel's color or depth buffers, and `sfail` specifies what happens to the stencil buffer
	 * contents.
	 * Operator constants:
	 *
	 * - `render.STENCIL_OP_KEEP` (keeps the current value)
	 * - `render.STENCIL_OP_ZERO` (sets the stencil buffer value to 0)
	 * - `render.STENCIL_OP_REPLACE` (sets the stencil buffer value to `ref`, as specified by render.set_stencil_func)
	 * - `render.STENCIL_OP_INCR` (increments the stencil buffer value and clamp to the maximum representable unsigned value)
	 * - `render.STENCIL_OP_INCR_WRAP` (increments the stencil buffer value and wrap to zero when incrementing the maximum representable unsigned value)
	 * - `render.STENCIL_OP_DECR` (decrements the current stencil buffer value and clamp to 0)
	 * - `render.STENCIL_OP_DECR_WRAP` (decrements the current stencil buffer value and wrap to the maximum representable unsigned value when decrementing zero)
	 * - `render.STENCIL_OP_INVERT` (bitwise inverts the current stencil buffer value)
	 *
	 * `dppass` and `dpfail` specify the stencil buffer actions depending on whether subsequent
	 * depth buffer tests succeed (dppass) or fail (dpfail).
	 * The initial value for all operators is `render.STENCIL_OP_KEEP`.
	 * @param sfail  action to take when the stencil test fails
	 * @param dpfail  the stencil action when the stencil test passes
	 * @param dppass  the stencil action when both the stencil test and the depth test pass, or when the stencil test passes and either there is no depth buffer or depth testing is not enabled
	 */
	export function set_stencil_op(
		sfail:
			typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_INVERT | typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_ZERO,
		dpfail:
			typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_INVERT | typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_ZERO,
		dppass:
			typeof render.STENCIL_OP_DECR | typeof render.STENCIL_OP_DECR_WRAP | typeof render.STENCIL_OP_INCR | typeof render.STENCIL_OP_INCR_WRAP | typeof render.STENCIL_OP_INVERT | typeof render.STENCIL_OP_KEEP | typeof render.STENCIL_OP_REPLACE | typeof render.STENCIL_OP_ZERO,
	): void;

	/**
	 * Sets the view matrix to use when rendering.
	 * @param matrix  view matrix to set
	 */
	export function set_view(matrix: vmath.matrix4): void;

	/**
	 * Set the render viewport to the specified rectangle.
	 * @param x  left corner
	 * @param y  bottom corner
	 * @param width  viewport width
	 * @param height  viewport height
	 */
	export function set_viewport(
		x: number,
		y: number,
		width: number,
		height: number,
	): void;

	/**
	 * Set the size of the game window. Only works on desktop platforms.
	 */
	export type resize = 'resize';
	export type resize_message = { height: number; width: number };

	/**
	 * Reports a change in window size. This is initiated on window resize on desktop or by orientation changes
	 * on mobile devices.
	 */
	export type window_resized = 'window_resized';
	export type window_resized_message = { height: number; width: number };
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/resource/|Documentation} */
declare namespace resource {
	/**
	 * BASIS_UASTC compression type
	 */
	export const COMPRESSION_TYPE_BASIS_UASTC: number & {
		readonly _COMPRESSION_: unique symbol;
	};

	/**
	 * COMPRESSION_TYPE_DEFAULT compression type
	 */
	export const COMPRESSION_TYPE_DEFAULT: number & {
		readonly _COMPRESSION_: unique symbol;
	};

	/**
	 * luminance type texture format
	 */
	export const TEXTURE_FORMAT_LUMINANCE: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * R16F type texture format
	 */
	export const TEXTURE_FORMAT_R16F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * R32F type texture format
	 */
	export const TEXTURE_FORMAT_R32F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RG16F type texture format
	 */
	export const TEXTURE_FORMAT_RG16F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RG32F type texture format
	 */
	export const TEXTURE_FORMAT_RG32F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB type texture format
	 */
	export const TEXTURE_FORMAT_RGB: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB16F type texture format
	 */
	export const TEXTURE_FORMAT_RGB16F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB32F type texture format
	 */
	export const TEXTURE_FORMAT_RGB32F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA type texture format
	 */
	export const TEXTURE_FORMAT_RGBA: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA16F type texture format
	 */
	export const TEXTURE_FORMAT_RGBA16F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA32F type texture format
	 */
	export const TEXTURE_FORMAT_RGBA32F: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA_ASTC_4x4 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_ASTC_4x4: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA_BC3 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_BC3: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA_BC7 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_BC7: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA_ETC2 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_ETC2: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA_PVRTC_2BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGBA_PVRTC_4BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB_BC1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_BC1: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB_ETC1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_ETC1: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB_PVRTC_2BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RGB_PVRTC_4BPPV1 type texture format
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * RG_BC5 type texture format
	 */
	export const TEXTURE_FORMAT_RG_BC5: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * R_BC4 type texture format
	 */
	export const TEXTURE_FORMAT_R_BC4: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * 2D texture type
	 */
	export const TEXTURE_TYPE_2D: number & { readonly _TEXTURE_: unique symbol };

	/**
	 * 2D Array texture type
	 */
	export const TEXTURE_TYPE_2D_ARRAY: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * Cube map texture type
	 */
	export const TEXTURE_TYPE_CUBE_MAP: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * Usage hint for creating textures that uses temporary memory
	 */
	export const TEXTURE_USAGE_FLAG_MEMORYLESS: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * Usage hint for creating textures that can be sampled in a shader
	 */
	export const TEXTURE_USAGE_FLAG_SAMPLE: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * Usage hint for creating textures that can be used for writing in a shader
	 */
	export const TEXTURE_USAGE_FLAG_STORAGE: number & {
		readonly _TEXTURE_: unique symbol;
	};

	/**
	 * Constructor-like function with two purposes:
	 *
	 * - Load the specified resource as part of loading the script
	 * - Return a hash to the run-time version of the resource
	 *
	 * ⚠ This function can only be called within go.property function calls.
	 * @param path  optional resource path string to the resource
	 * @returns path  a path hash to the binary version of the resource
	 */
	export function atlas(path?: string): hash;

	/**
	 * Constructor-like function with two purposes:
	 *
	 * - Load the specified resource as part of loading the script
	 * - Return a hash to the run-time version of the resource
	 *
	 * ⚠ This function can only be called within go.property function calls.
	 * @param path  optional resource path string to the resource
	 * @returns path  a path hash to the binary version of the resource
	 */
	export function buffer(path?: string): hash;

	/**
	* This function creates a new atlas resource that can be used in the same way as any atlas created during build time.
	* The path used for creating the atlas must be unique, trying to create a resource at a path that is already
	* registered will trigger an error. If the intention is to instead modify an existing atlas, use the resource.set_atlas
	* function. Also note that the path to the new atlas resource must have a '.texturesetc' extension,
	* meaning "/path/my_atlas" is not a valid path but "/path/my_atlas.texturesetc" is.
	* When creating the atlas, at least one geometry and one animation is required, and an error will be
	* raised if these requirements are not met. A reference to the resource will be held by the collection
	* that created the resource and will automatically be released when that collection is destroyed.
	* Note that releasing a resource essentially means decreasing the reference count of that resource,
	* and not necessarily that it will be deleted.
	* @param path  The path to the resource.
	* @param table  A table containing info about how to create the atlas. Supported entries:



`texture`
the path to the texture resource, e.g "/main/my_texture.texturec"




`animations`
a list of the animations in the atlas. Supports the following fields:




`id`
the id of the animation, used in e.g sprite.play_animation




`width`
the width of the animation




`height`
the height of the animation




`frame_start`
index to the first geometry of the animation. Indices are lua based and must be in the range of 1 ..  in atlas.




`frame_end`
index to the last geometry of the animation (non-inclusive). Indices are lua based and must be in the range of 1 ..  in atlas.




`playback`
optional playback mode of the animation, the default value is go.PLAYBACK_ONCE_FORWARD




`fps`
optional fps of the animation, the default value is 30




`flip_vertical`
optional flip the animation vertically, the default value is false




`flip_horizontal`
optional flip the animation horizontally, the default value is false




`geometries`
A list of the geometries that should map to the texture data. Supports the following fields:




`id`
The name of the geometry. Used when matching animations between multiple atlases




`vertices`
a list of the vertices in texture space of the geometry in the form {px0, py0, px1, py1, ..., pxn, pyn}




`uvs`
a list of the uv coordinates in texture space of the geometry in the form of {u0, v0, u1, v1, ..., un, vn}




`indices`
a list of the indices of the geometry in the form {i0, i1, i2, ..., in}. Each tripe in the list represents a triangle.



	* @returns path  Returns the atlas resource path
	*/
	export function create_atlas(
		path: string,
		table: {
			texture: hash | string;
			animations: [
				{
					id: string;
					width: number;
					height: number;
					frame_start: number;
					frame_end: number;
					playback?:
						typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_PINGPONG | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG;
					fps?: number;
					flip_vertical?: boolean;
					flip_horizontal?: boolean;
				},
			];
			geometries: {
				id: string;
				vertices: number[];
				uvs: number[];
				indices: number[];
			}[];
		},
	): hash;

	/**
	* This function creates a new buffer resource that can be used in the same way as any buffer created during build time.
	* The function requires a valid buffer created from either buffer.create or another pre-existing buffer resource.
	* By default, the new resource will take ownership of the buffer lua reference, meaning the buffer will not automatically be removed
	* when the lua reference to the buffer is garbage collected. This behaviour can be overruled by specifying 'transfer_ownership = false'
	* in the argument table. If the new buffer resource is created from a buffer object that is created by another resource,
	* the buffer object will be copied and the new resource will effectively own a copy of the buffer instead.
	* Note that the path to the new resource must have the '.bufferc' extension, "/path/my_buffer" is not a valid path but "/path/my_buffer.bufferc" is.
	* The path must also be unique, attempting to create a buffer with the same name as an existing resource will raise an error.
	* @param path  The path to the resource.
	* @param table  A table containing info about how to create the buffer. Supported entries:



`buffer`
the buffer to bind to this resource




`transfer_ownership`
optional flag to determine wether or not the resource should take over ownership of the buffer object (default true)



	* @returns path  Returns the buffer resource path
	*/
	export function create_buffer(
		path: string,
		table: { buffer: buffer; transfer_ownership?: boolean },
	): hash;

	/**
	* Creates a new texture resource that can be used in the same way as any texture created during build time.
	* The path used for creating the texture must be unique, trying to create a resource at a path that is already
	* registered will trigger an error. If the intention is to instead modify an existing texture, use the resource.set_texture
	* function. Also note that the path to the new texture resource must have a '.texturec' extension,
	* meaning "/path/my_texture" is not a valid path but "/path/my_texture.texturec" is.
	* If the texture is created without a buffer, the pixel data will be blank.
	* @param path  The path to the resource.
	* @param table  A table containing info about how to create the texture. Supported entries:

`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`
- `resource.TEXTURE_TYPE_IMAGE_2D`


`width`
The width of the texture (in pixels). Must be larger than 0.
`height`
The width of the texture (in pixels). Must be larger than 0.
`format`
The texture format, note that some of these formats might not be supported by the running device. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:

- `resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGB_ETC1`
- `resource.TEXTURE_FORMAT_RGBA_ETC2`
- `resource.TEXTURE_FORMAT_RGBA_ASTC_4x4`
- `resource.TEXTURE_FORMAT_RGB_BC1`
- `resource.TEXTURE_FORMAT_RGBA_BC3`
- `resource.TEXTURE_FORMAT_R_BC4`
- `resource.TEXTURE_FORMAT_RG_BC5`
- `resource.TEXTURE_FORMAT_RGBA_BC7`
- `resource.TEXTURE_FORMAT_RGB16F`
- `resource.TEXTURE_FORMAT_RGB32F`
- `resource.TEXTURE_FORMAT_RGBA16F`
- `resource.TEXTURE_FORMAT_RGBA32F`
- `resource.TEXTURE_FORMAT_R16F`
- `resource.TEXTURE_FORMAT_RG16F`
- `resource.TEXTURE_FORMAT_R32F`
- `resource.TEXTURE_FORMAT_RG32F`

You can test if the device supports these values by checking if a specific enum is undefined or not:
`if resource.TEXTURE_FORMAT_RGBA16F !== undefined then
    -- it is safe to use this format
end
`


`flags`
Texture creation flags that can be used to dictate how the texture is created. The default value is resource.TEXTURE_USAGE_FLAG_SAMPLE, which means that the texture can be sampled from a shader.
These flags may or may not be supported on the running device and/or the underlying graphics API and is simply used internally as a 'hint' when creating the texture. There is no guarantee that any of these will have any effect. Supported values:


- `resource.TEXTURE_USAGE_FLAG_SAMPLE` - The texture can be sampled from a shader (default)
- `resource.TEXTURE_USAGE_FLAG_MEMORYLESS` - The texture can be used as a memoryless texture, i.e only transient memory for the texture is used during rendering
- `resource.TEXTURE_USAGE_FLAG_STORAGE` - The texture can be used as a storage texture, which is required for a shader to write to the texture


`max_mipmaps`
optional max number of mipmaps. Defaults to zero, i.e no mipmap support
`compression_type`
optional specify the compression type for the data in the buffer object that holds the texture data. Will only be used when a compressed buffer has been passed into the function.
Creating an empty texture with no buffer data is not supported as a core feature. Defaults to resource.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


- `COMPRESSION_TYPE_DEFAULT`
- `COMPRESSION_TYPE_BASIS_UASTC`

	* @param buffer  optional buffer of precreated pixel data
	* @returns path  The path to the resource.
	*/
	export function create_texture(
		path: string,
		table: {
			type:
				| typeof resource.TEXTURE_TYPE_2D
				| typeof resource.TEXTURE_TYPE_CUBE_MAP;
			width: number;
			height: number;
			format:
				typeof resource.TEXTURE_FORMAT_LUMINANCE | typeof resource.TEXTURE_FORMAT_R_BC4 | typeof resource.TEXTURE_FORMAT_R16F | typeof resource.TEXTURE_FORMAT_R32F | typeof resource.TEXTURE_FORMAT_RG_BC5 | typeof resource.TEXTURE_FORMAT_RG16F | typeof resource.TEXTURE_FORMAT_RG32F | typeof resource.TEXTURE_FORMAT_RGB | typeof resource.TEXTURE_FORMAT_RGB_BC1 | typeof resource.TEXTURE_FORMAT_RGB_ETC1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGB16F | typeof resource.TEXTURE_FORMAT_RGB32F | typeof resource.TEXTURE_FORMAT_RGBA | typeof resource.TEXTURE_FORMAT_RGBA_ASTC_4x4 | typeof resource.TEXTURE_FORMAT_RGBA_BC3 | typeof resource.TEXTURE_FORMAT_RGBA_BC7 | typeof resource.TEXTURE_FORMAT_RGBA_ETC2 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA16F | typeof resource.TEXTURE_FORMAT_RGBA32F;
			max_mipmaps?: number;
			compression_type?:
				typeof resource.COMPRESSION_TYPE_BASIS_UASTC | typeof resource.COMPRESSION_TYPE_DEFAULT;
		},
		buffer?: buffer,
	): hash;

	/**
	* Creates a new texture resource that can be used in the same way as any texture created during build time.
	* The path used for creating the texture must be unique, trying to create a resource at a path that is already
	* registered will trigger an error. If the intention is to instead modify an existing texture, use the resource.set_texture
	* function. Also note that the path to the new texture resource must have a '.texturec' extension,
	* meaning "/path/my_texture" is not a valid path but "/path/my_texture.texturec" is.
	* If the texture is created without a buffer, the pixel data will be blank.
	* The difference between the async version and resource.create_texture is that the texture data will be uploaded
	* in a graphics worker thread. The function will return a resource immediately that contains a 1x1 blank texture which can be used
	* immediately after the function call. When the new texture has been uploaded, the initial blank texture will be deleted and replaced with the
	* new texture. Be careful when using the initial texture handle handle as it will not be valid after the upload has finished.
	* @param path  The path to the resource.
	* @param table  
A table containing info about how to create the texture. Supported entries:
`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`


`width`
The width of the texture (in pixels). Must be larger than 0.
`height`
The width of the texture (in pixels). Must be larger than 0.
`format`
The texture format, note that some of these formats might not be supported by the running device. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:

- `resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGB_ETC1`
- `resource.TEXTURE_FORMAT_RGBA_ETC2`
- `resource.TEXTURE_FORMAT_RGBA_ASTC_4x4`
- `resource.TEXTURE_FORMAT_RGB_BC1`
- `resource.TEXTURE_FORMAT_RGBA_BC3`
- `resource.TEXTURE_FORMAT_R_BC4`
- `resource.TEXTURE_FORMAT_RG_BC5`
- `resource.TEXTURE_FORMAT_RGBA_BC7`
- `resource.TEXTURE_FORMAT_RGB16F`
- `resource.TEXTURE_FORMAT_RGB32F`
- `resource.TEXTURE_FORMAT_RGBA16F`
- `resource.TEXTURE_FORMAT_RGBA32F`
- `resource.TEXTURE_FORMAT_R16F`
- `resource.TEXTURE_FORMAT_RG16F`
- `resource.TEXTURE_FORMAT_R32F`
- `resource.TEXTURE_FORMAT_RG32F`


`flags`
Texture creation flags that can be used to dictate how the texture is created. Supported values:


- `resource.TEXTURE_USAGE_FLAG_SAMPLE` - The texture can be sampled from a shader (default)
- `resource.TEXTURE_USAGE_FLAG_MEMORYLESS` - The texture can be used as a memoryless texture, i.e only transient memory for the texture is used during rendering
- `resource.TEXTURE_USAGE_FLAG_STORAGE` - The texture can be used as a storage texture, which is required for a shader to write to the texture

You can test if the device supports these values by checking if a specific enum is undefined or not:
`if resource.TEXTURE_FORMAT_RGBA16F !== undefined then
    -- it is safe to use this format
end
`


`max_mipmaps`
optional max number of mipmaps. Defaults to zero, i.e no mipmap support
`compression_type`
optional specify the compression type for the data in the buffer object that holds the texture data. Will only be used when a compressed buffer has been passed into the function.
Creating an empty texture with no buffer data is not supported as a core feature. Defaults to resource.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


- `COMPRESSION_TYPE_DEFAULT`
- `COMPRESSION_TYPE_BASIS_UASTC`

	* @param buffer  optional buffer of precreated pixel data
	* @returns path  The path to the resource.
	* @returns request_id  The request id for the async request.
	*/
	export function create_texture_async(
		path: string,
		table: AnyNotNil,
		buffer?: buffer,
	): LuaMultiReturn<[hash, any]>;

	/**
	 * Constructor-like function with two purposes:
	 *
	 * - Load the specified resource as part of loading the script
	 * - Return a hash to the run-time version of the resource
	 *
	 * ⚠ This function can only be called within go.property function calls.
	 * @param path  optional resource path string to the resource
	 * @returns path  a path hash to the binary version of the resource
	 */
	export function font(path?: string): hash;

	/**
	* Returns the atlas data for an atlas
	* @param path  The path to the atlas resource
	* @returns data  A table with the following entries:

- texture
- geometries
- animations

See resource.set_atlas for a detailed description of each field
	*/
	export function get_atlas(path: hash | string): {
		texture: hash | string;
		animations: [
			{
				id: string;
				width: number;
				height: number;
				frame_start: number;
				frame_end: number;
				playback?:
					typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_PINGPONG | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG;
				fps?: number;
				flip_vertical?: boolean;
				flip_horizontal?: boolean;
			},
		];
		geometries: [{ vertices: number[]; uvs: number[]; indices: number[] }];
	};

	/**
	 * gets the buffer from a resource
	 * @param path  The path to the resource
	 * @returns buffer  The resource buffer
	 */
	export function get_buffer(path: hash | string): buffer;

	/**
	* Gets render target info from a render target resource path or a render target handle
	* @param path  The path to the resource or a render target handle
	* @returns table  A table containing info about the render target:

`handle`
the opaque handle to the texture resource
'attachments'
a table of attachments, where each attachment contains the following entries:
`handle`
the opaque handle to the texture resource
`width`
width of the texture
`height`
height of the texture
`depth`
depth of the texture (i.e 1 for a 2D texture and 6 for a cube map)
`mipmaps`
number of mipmaps of the texture
`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`
- `resource.TEXTURE_TYPE_2D_ARRAY`


`buffer_type`
The attachment buffer type. Supported values:


- `resource.BUFFER_TYPE_COLOR0`
- `resource.BUFFER_TYPE_COLOR1`
- `resource.BUFFER_TYPE_COLOR2`
- `resource.BUFFER_TYPE_COLOR3`
- `resource.BUFFER_TYPE_DEPTH`
- `resource.BUFFER_TYPE_STENCIL`

	*/
	export function get_render_target_info(path: string): {
		handle: unknown;
		attachments: {
			handle: unknown;
			width: number;
			height: number;
			depth: number;
			mipmaps: number;
			type:
				typeof TEXTURE_TYPE_2D | typeof TEXTURE_TYPE_2D_ARRAY | typeof TEXTURE_TYPE_CUBE_MAP;
			buffer_type:
				| typeof BUFFER_TYPE_COLOR0
				| typeof BUFFER_TYPE_COLOR1
				| typeof BUFFER_TYPE_COLOR2
				| typeof BUFFER_TYPE_COLOR3
				| typeof BUFFER_TYPE_DEPTH
				| typeof BUFFER_TYPE_STENCIL;
		}[];
	};
	export const BUFFER_TYPE_COLOR0: number & {
		readonly _BUFFER_: unique symbol;
	};
	export const BUFFER_TYPE_COLOR1: number & {
		readonly _BUFFER_: unique symbol;
	};
	export const BUFFER_TYPE_COLOR2: number & {
		readonly _BUFFER_: unique symbol;
	};
	export const BUFFER_TYPE_COLOR3: number & {
		readonly _BUFFER_: unique symbol;
	};
	export const BUFFER_TYPE_DEPTH: number & { readonly _BUFFER_: unique symbol };
	export const BUFFER_TYPE_STENCIL: number & {
		readonly _BUFFER_: unique symbol;
	};

	/**
	* Gets the text metrics from a font
	* @param url  the font to get the (unscaled) metrics from
	* @param text  text to measure
	* @param options  A table containing parameters for the text. Supported entries:

`width`
The width of the text field. Not used if `line_break` is false.
`leading`
The leading (default 1.0)
`tracking`
The tracking (default 0.0)
`line_break`
If the calculation should consider line breaks (default false)

	* @returns metrics  a table with the following fields:

- width
- height
- max_ascent
- max_descent

	*/
	export function get_text_metrics(
		url: hash,
		text: string,
		options?: {
			width?: number;
			leading?: number;
			tracking?: number;
			line_break?: boolean;
		},
	): { width: number; height: number; max_ascent: number; max_descent: number };

	/**
	* Gets texture info from a texture resource path or a texture handle
	* @param path  The path to the resource or a texture handle
	* @returns table  A table containing info about the texture:

`handle`
the opaque handle to the texture resource
`width`
width of the texture
`height`
height of the texture
`depth`
depth of the texture (i.e 1 for a 2D texture and 6 for a cube map)
`mipmaps`
number of mipmaps of the texture
`flags`
usage hints of the texture.
`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_IMAGE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`
- `resource.TEXTURE_TYPE_2D_ARRAY`

	*/
	export function get_texture_info(path: hash | string): {
		handle: hash;
		width: number;
		height: number;
		depth: number;
		mipmaps: number;
		type:
			typeof resource.TEXTURE_TYPE_2D | typeof resource.TEXTURE_TYPE_2D_ARRAY | typeof resource.TEXTURE_TYPE_CUBE_MAP;
	};

	/**
	 * Loads the resource data for a specific resource.
	 * @param path  The path to the resource
	 * @returns buffer  Returns the buffer stored on disc
	 */
	export function load(path: string): buffer;

	/**
	 * Constructor-like function with two purposes:
	 *
	 * - Load the specified resource as part of loading the script
	 * - Return a hash to the run-time version of the resource
	 *
	 * ⚠ This function can only be called within go.property function calls.
	 * @param path  optional resource path string to the resource
	 * @returns path  a path hash to the binary version of the resource
	 */
	export function material(path?: string): hash;

	/**
	 * Release a resource.
	 * ⚠ This is a potentially dangerous operation, releasing resources currently being used can cause unexpected behaviour.
	 * @param path  The path to the resource.
	 */
	export function release(path: hash | string): void;

	/**
	 * Sets the resource data for a specific resource
	 * @param path  The path to the resource
	 * @param buffer  The buffer of precreated data, suitable for the intended resource type
	 */
	export function set(path: hash | string, buffer: buffer): void;

	/**
	* Sets the data for a specific atlas resource. Setting new atlas data is specified by passing in
	* a texture path for the backing texture of the atlas, a list of geometries and a list of animations
	* that map to the entries in the geometry list. The geometry entries are represented by three lists:
	* vertices, uvs and indices that together represent triangles that are used in other parts of the
	* engine to produce render objects from.
	* Vertex and uv coordinates for the geometries are expected to be
	* in pixel coordinates where 0,0 is the top left corner of the texture.
	* There is no automatic padding or margin support when setting custom data,
	* which could potentially cause filtering artifacts if used with a material sampler that has linear filtering.
	* If that is an issue, you need to calculate padding and margins manually before passing in the geometry data to
	* this function.
	* @param path  The path to the atlas resource
	* @param table  A table containing info about the atlas. Supported entries:



`texture`
the path to the texture resource, e.g "/main/my_texture.texturec"




`animations`
a list of the animations in the atlas. Supports the following fields:




`id`
the id of the animation, used in e.g sprite.play_animation




`width`
the width of the animation




`height`
the height of the animation




`frame_start`
index to the first geometry of the animation. Indices are lua based and must be in the range of 1 ..  in atlas.




`frame_end`
index to the last geometry of the animation (non-inclusive). Indices are lua based and must be in the range of 1 ..  in atlas.




`playback`
optional playback mode of the animation, the default value is go.PLAYBACK_ONCE_FORWARD




`fps`
optional fps of the animation, the default value is 30




`flip_vertical`
optional flip the animation vertically, the default value is false




`flip_horizontal`
optional flip the animation horizontally, the default value is false




`geometries`
A list of the geometries that should map to the texture data. Supports the following fields:




`vertices`
a list of the vertices in texture space of the geometry in the form {px0, py0, px1, py1, ..., pxn, pyn}




`uvs`
a list of the uv coordinates in texture space of the geometry in the form of {u0, v0, u1, v1, ..., un, vn}




`indices`
a list of the indices of the geometry in the form {i0, i1, i2, ..., in}. Each tripe in the list represents a triangle.



	*/
	export function set_atlas(
		path: hash | string,
		table: {
			texture: hash | string;
			animations: [
				{
					id: string;
					width: number;
					height: number;
					frame_start: number;
					frame_end: number;
					playback?:
						typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_PINGPONG | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG;
					fps?: number;
					flip_vertical?: boolean;
					flip_horizontal?: boolean;
				},
			];
			geometries: [{ vertices: number[]; uvs: number[]; indices: number[] }];
		},
	): void;

	/**
	* Sets the buffer of a resource. By default, setting the resource buffer will either copy the data from the incoming buffer object
	* to the buffer stored in the destination resource, or make a new buffer object if the sizes between the source buffer and the destination buffer
	* stored in the resource differs. In some cases, e.g performance reasons, it might be beneficial to just set the buffer object on the resource without copying or cloning.
	* To achieve this, set the `transfer_ownership` flag to true in the argument table. Transferring ownership from a lua buffer to a resource with this function
	* works exactly the same as resource.create_buffer: the destination resource will take ownership of the buffer held by the lua reference, i.e the buffer will not automatically be removed
	* when the lua reference to the buffer is garbage collected.
	* Note: When setting a buffer with `transfer_ownership = true`, the currently bound buffer in the resource will be destroyed.
	* @param path  The path to the resource
	* @param buffer  The resource buffer
	* @param table  A table containing info about how to set the buffer. Supported entries:



`transfer_ownership`
optional flag to determine wether or not the resource should take over ownership of the buffer object (default false)



	*/
	export function set_buffer(
		path: hash | string,
		buffer: buffer,
		table?: { transfer_ownership: boolean },
	): void;

	/**
	 * Update internal sound resource (wavc/oggc) with new data
	 * @param path  The path to the resource
	 * @param buffer  A lua string containing the binary sound data
	 */
	export function set_sound(path: hash | string, buffer: string): void;

	/**
	* Sets the pixel data for a specific texture.
	* @param path  The path to the resource
	* @param table  A table containing info about the texture. Supported entries:

`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`


`width`
The width of the texture (in pixels)
`height`
The width of the texture (in pixels)
`format`
The texture format, note that some of these formats are platform specific. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:
- `resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGB_ETC1`
- `resource.TEXTURE_FORMAT_RGBA_ETC2`
- `resource.TEXTURE_FORMAT_RGBA_ASTC_4x4`
- `resource.TEXTURE_FORMAT_RGB_BC1`
- `resource.TEXTURE_FORMAT_RGBA_BC3`
- `resource.TEXTURE_FORMAT_R_BC4`
- `resource.TEXTURE_FORMAT_RG_BC5`
- `resource.TEXTURE_FORMAT_RGBA_BC7`
- `resource.TEXTURE_FORMAT_RGB16F`
- `resource.TEXTURE_FORMAT_RGB32F`
- `resource.TEXTURE_FORMAT_RGBA16F`
- `resource.TEXTURE_FORMAT_RGBA32F`
- `resource.TEXTURE_FORMAT_R16F`
- `resource.TEXTURE_FORMAT_RG16F`
- `resource.TEXTURE_FORMAT_R32F`
- `resource.TEXTURE_FORMAT_RG32F`
You can test if the device supports these values by checking if a specific enum is undefined or not:
`if resource.TEXTURE_FORMAT_RGBA16F !== undefined then
    -- it is safe to use this format
end
`


`x`
optional x offset of the texture (in pixels)
`y`
optional y offset of the texture (in pixels)
`mipmap`
optional mipmap to upload the data to
`compression_type`
optional specify the compression type for the data in the buffer object that holds the texture data. Defaults to resource.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


- `COMPRESSION_TYPE_DEFAULT`
- `COMPRESSION_TYPE_BASIS_UASTC`

	* @param buffer  The buffer of precreated pixel data
⚠ To update a cube map texture you need to pass in six times the amount of data via the buffer, since a cube map has six sides!
	*/
	export function set_texture(
		path: hash | string,
		table: {
			type:
				| typeof resource.TEXTURE_TYPE_2D
				| typeof resource.TEXTURE_TYPE_CUBE_MAP;
			width: number;
			height: number;
			format:
				typeof resource.TEXTURE_FORMAT_LUMINANCE | typeof resource.TEXTURE_FORMAT_R_BC4 | typeof resource.TEXTURE_FORMAT_R16F | typeof resource.TEXTURE_FORMAT_R32F | typeof resource.TEXTURE_FORMAT_RG_BC5 | typeof resource.TEXTURE_FORMAT_RG16F | typeof resource.TEXTURE_FORMAT_RG32F | typeof resource.TEXTURE_FORMAT_RGB | typeof resource.TEXTURE_FORMAT_RGB_BC1 | typeof resource.TEXTURE_FORMAT_RGB_ETC1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGB16F | typeof resource.TEXTURE_FORMAT_RGB32F | typeof resource.TEXTURE_FORMAT_RGBA | typeof resource.TEXTURE_FORMAT_RGBA_ASTC_4x4 | typeof resource.TEXTURE_FORMAT_RGBA_BC3 | typeof resource.TEXTURE_FORMAT_RGBA_BC7 | typeof resource.TEXTURE_FORMAT_RGBA_ETC2 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1 | typeof resource.TEXTURE_FORMAT_RGBA16F | typeof resource.TEXTURE_FORMAT_RGBA32F;
			x?: number;
			y?: number;
			mipmap?: number;
			compression_type?:
				typeof resource.COMPRESSION_TYPE_BASIS_UASTC | typeof resource.COMPRESSION_TYPE_DEFAULT;
		},
		buffer: buffer,
	): void;

	/**
	 * Constructor-like function with two purposes:
	 *
	 * - Load the specified resource as part of loading the script
	 * - Return a hash to the run-time version of the resource
	 *
	 * ⚠ This function can only be called within go.property function calls.
	 * @param path  optional resource path string to the resource
	 * @returns path  a path hash to the binary version of the resource
	 */
	export function texture(path?: string): hash;

	/**
	 * Constructor-like function with two purposes:
	 *
	 * - Load the specified resource as part of loading the script
	 * - Return a hash to the run-time version of the resource
	 *
	 * ⚠ This function can only be called within go.property function calls.
	 * @param path  optional resource path string to the resource
	 * @returns path  a path hash to the binary version of the resource
	 */
	export function tile_source(path?: string): hash;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/sys/|Documentation} */
declare namespace sys {
	/**
	 * Terminates the game application and reports the specified `code` to the OS.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type exit = 'exit';
	export type exit_message = { code: number };

	/**
	 * Reboots the game engine with a specified set of arguments.
	 * Arguments will be translated into command line arguments. Sending the reboot
	 * command is equivalent to starting the engine with the same arguments.
	 * On startup the engine reads configuration from "game.project" in the
	 * project root.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type reboot = 'reboot';
	export type reboot_message = {
		arg1?: string;
		arg2?: string;
		arg3?: string;
		arg4?: string;
		arg5?: string;
		arg6?: string;
	};

	/**
	 * Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
	 * the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
	 * be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
	 * unchecked the engine will try to respect the rate in software using timers. There is no
	 * guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type set_update_frequency = 'set_update_frequency';
	export type set_update_frequency_message = { frequency: number };

	/**
	 * Set the vsync swap interval. The interval with which to swap the front and back buffers
	 * in sync with vertical blanks (v-blank), the hardware event where the screen image is updated
	 * with data from the front buffer. A value of 1 swaps the buffers at every v-blank, a value of
	 * 2 swaps the buffers every other v-blank and so on. A value of 0 disables waiting for v-blank
	 * before swapping the buffers. Default value is 1.
	 * When setting the swap interval to 0 and having `vsync` disabled in
	 * "game.project", the engine will try to respect the set frame cap value from
	 * "game.project" in software instead.
	 * This setting may be overridden by driver settings.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type set_vsync = 'set_vsync';
	export type set_vsync_message = { swap_interval: number };

	/**
	 * Starts video recording of the game frame-buffer to file. Current video format is the
	 * open vp8 codec in the ivf container. It's possible to upload this format directly
	 * to YouTube. The VLC video player has native support but with the known issue that
	 * not the entire file is played back. It's probably an issue with VLC.
	 * The Miro Video Converter has support for vp8/ivf.
	 * 🐧 Video recording is only supported on desktop platforms.
	 * 🐧 Audio is currently not supported
	 * 🐧 Window width and height must be a multiple of 8 to be able to record video.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type start_record = 'start_record';
	export type start_record_message = {
		file_name: string;
		frame_period?: number;
		fps?: number;
	};

	/**
	 * Stops the currently active video recording.
	 * 🐧 Video recording is only supported on desktop platforms.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type stop_record = 'stop_record';

	/**
	 * network connected through other, non cellular, connection
	 */
	export const NETWORK_CONNECTED: number & {
		readonly _NETWORK_: unique symbol;
	};

	/**
	 * network connected through mobile cellular
	 */
	export const NETWORK_CONNECTED_CELLULAR: number & {
		readonly _NETWORK_: unique symbol;
	};

	/**
	 * no network connection found
	 */
	export const NETWORK_DISCONNECTED: number & {
		readonly _NETWORK_: unique symbol;
	};

	/**
	 * an asyncronous request is unable to read the resource
	 */
	export const REQUEST_STATUS_ERROR_IO_ERROR: number & {
		readonly _REQUEST_: unique symbol;
	};

	/**
	 * an asyncronous request is unable to locate the resource
	 */
	export const REQUEST_STATUS_ERROR_NOT_FOUND: number & {
		readonly _REQUEST_: unique symbol;
	};

	/**
	 * an asyncronous request has finished successfully
	 */
	export const REQUEST_STATUS_FINISHED: number & {
		readonly _REQUEST_: unique symbol;
	};

	/**
	 * deserializes buffer into a lua table
	 * @param buffer  buffer to deserialize from
	 * @returns table  lua table with deserialized data
	 */
	export function deserialize(buffer: string): AnyNotNil | undefined;

	/**
	 * Check if a path exists
	 * Good for checking if a file exists before loading a large file
	 * @param path  path to check
	 * @returns result  `true` if the path exists, `false` otherwise
	 */
	export function exists(path: string): boolean;

	/**
	 * Terminates the game application and reports the specified `code` to the OS.
	 * @param code  exit code to report to the OS, 0 means clean exit
	 */
	export function exit(code: number): void;

	/**
	* Returns a table with application information for the requested app.
	* 📱 On iOS, the `app_string` is an url scheme for the app that is queried. Your
	* game needs to list the schemes that are queried in an `LSApplicationQueriesSchemes` array
	* in a custom "Info.plist".
	* 📱 On Android, the `app_string` is the package identifier for the app.
	* @param app_string  platform specific string with application package or query, see above for details.
	* @returns app_info  table with application information in the following fields:

`installed`
`true` if the application is installed, `false` otherwise.

	*/
	export function get_application_info(app_string: string): {
		installed: boolean;
	};

	/**
	 * The path from which the application is run.
	 * @returns path  path to application executable
	 */
	export function get_application_path(): string;

	/**
	 * Get integer config value from the game.project configuration file with optional default value
	 * @param key  key to get value for. The syntax is SECTION.KEY
	 * @param default_value  (optional) default value to return if the value does not exist
	 * @returns value  config value as an integer. default_value if the config key does not exist. 0 if no default value was supplied.
	 */
	export function get_config_int(key: string, default_value?: number): number;

	/**
	 * Get number config value from the game.project configuration file with optional default value
	 * @param key  key to get value for. The syntax is SECTION.KEY
	 * @param default_value  (optional) default value to return if the value does not exist
	 * @returns value  config value as an number. default_value if the config key does not exist. 0 if no default value was supplied.
	 */
	export function get_config_number(
		key: string,
		default_value?: number,
	): number;

	/**
	 * Get string config value from the game.project configuration file with optional default value
	 * @param key  key to get value for. The syntax is SECTION.KEY
	 * @param default_value  (optional) default value to return if the value does not exist
	 * @returns value  config value as a string. default_value if the config key does not exist. undefined if no default value was supplied.
	 */
	export function get_config_string(
		key: string,
		default_value?: string,
	): string;

	/**
	* 🤖 Returns the current network connectivity status
	* on mobile platforms.
	* On desktop, this function always return `sys.NETWORK_CONNECTED`.
	* @returns status  network connectivity status:

- `sys.NETWORK_DISCONNECTED` (no network connection is found)
- `sys.NETWORK_CONNECTED_CELLULAR` (connected through mobile cellular)
- `sys.NETWORK_CONNECTED` (otherwise, Wifi)

	*/
	export function get_connectivity():
		typeof sys.NETWORK_CONNECTED | typeof sys.NETWORK_CONNECTED_CELLULAR | typeof sys.NETWORK_DISCONNECTED;

	/**
	* Returns a table with engine information.
	* @returns engine_info  table with engine information in the following fields:

`version`
The current Defold engine version, i.e. "1.2.96"
`version_sha1`
The SHA1 for the current engine build, i.e. "0060183cce2e29dbd09c85ece83cbb72068ee050"
`is_debug`
If the engine is a debug or release version

	*/
	export function get_engine_info(): {
		version: string;
		version_sha1: string;
		is_debug: boolean;
	};

	/**
	 * Create a path to the host device for unit testing
	 * Useful for saving logs etc during development
	 * @param filename  file to read from
	 * @returns host_path  the path prefixed with the proper host mount
	 */
	export function get_host_path(filename: string): string;

	/**
	* Returns an array of tables with information on network interfaces.
	* @returns ifaddrs  an array of tables. Each table entry contain the following fields:

`name`
Interface name
`address`
might be `undefined` if not available.
`mac`
might be undefined if not available.
`up`
`true` if the interface is up (available to transmit and receive data), `false` otherwise.
`running`
`true` if the interface is running, `false` otherwise.

	*/
	export function get_ifaddrs(): {
		name: string;
		address: string | undefined;
		mac: string | undefined;
		up: boolean;
		running: boolean;
	}[];

	/**
	 * The save-file path is operating system specific and is typically located under the user's home directory.
	 * @param application_id  user defined id of the application, which helps define the location of the save-file
	 * @param file_name  file-name to get path for
	 * @returns path  path to save-file
	 */
	export function get_save_file(
		application_id: string,
		file_name: string,
	): string;

	/**
	* Returns a table with system information.
	* @param options  optional options table
this flag ignores values might be secured by OS e.g. `device_ident`
	* @returns sys_info  table with system information in the following fields:

`device_model`
Only available on iOS and Android.
`manufacturer`
Only available on iOS and Android.
`system_name`
The system name: "Darwin", "Linux", "Windows", "HTML5", "Android" or "iPhone OS"
`system_version`
The system OS version.
`api_version`
The API version on the system.
`language`
Two character ISO-639 format, i.e. "en".
`device_language`
Two character ISO-639 format (i.e. "sr") and, if applicable, followed by a dash (-) and an ISO 15924 script code (i.e. "sr-Cyrl" or "sr-Latn"). Reflects the device preferred language.
`territory`
Two character ISO-3166 format, i.e. "US".
`gmt_offset`
The current offset from GMT (Greenwich Mean Time), in minutes.
`device_ident`
"android_id" on Android. On Android, you need to add `READ_PHONE_STATE` permission to be able to get this data. We don't use this permission in Defold.
`user_agent`
The HTTP user agent, i.e. "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8"

	*/
	export function get_sys_info(options?: { ignore_secure: boolean }): {
		device_model?: string;
		manufacturer?: string;
		system_name: string;
		system_version: string;
		api_version: string;
		language: string;
		device_language: string;
		territory: string;
		gmt_offset: number;
		device_ident?: string;
		user_agent: string;
	};

	/**
	 * If the file exists, it must have been created by `sys.save` to be loaded.
	 * @param filename  file to read from
	 * @returns loaded  lua table, which is empty if the file could not be found
	 */
	export function load(filename: string): LuaMap<AnyNotNil, unknown>;

	/**
	 * The sys.load_buffer function will first try to load the resource
	 * from any of the mounted resource locations and return the data if
	 * any matching entries found. If not, the path will be tried
	 * as is from the primary disk on the device.
	 * In order for the engine to include custom resources in the build process, you need
	 * to specify them in the "custom_resources" key in your "game.project" settings file.
	 * You can specify single resource files or directories. If a directory is included
	 * in the resource list, all files and directories in that directory is recursively
	 * included:
	 * For example "main/data/,assets/level_data.json".
	 * @param path  the path to load the buffer from
	 * @returns buffer  the buffer with data
	 */
	export function load_buffer(path: string): buffer;

	/**
	* The sys.load_buffer function will first try to load the resource
	* from any of the mounted resource locations and return the data if
	* any matching entries found. If not, the path will be tried
	* as is from the primary disk on the device.
	* In order for the engine to include custom resources in the build process, you need
	* to specify them in the "custom_resources" key in your "game.project" settings file.
	* You can specify single resource files or directories. If a directory is included
	* in the resource list, all files and directories in that directory is recursively
	* included:
	* For example "main/data/,assets/level_data.json".
	* Note that issuing multiple requests of the same resource will yield
	* individual buffers per request. There is no implic caching of the buffers
	* based on request path.
	* @param path  the path to load the buffer from
	* @param status_callback  A status callback that will be invoked when a request has been handled, or an error occured. The result is a table containing:

`status`
The status of the request, supported values are:


- `resource.REQUEST_STATUS_FINISHED`
- `resource.REQUEST_STATUS_ERROR_IO_ERROR`
- `resource.REQUEST_STATUS_ERROR_NOT_FOUND`


`buffer`
If the request was successfull, this will contain the request payload in a buffer object, and undefined otherwise. Make sure to check the status before doing anything with the buffer value!

	* @returns handle  a handle to the request
	*/
	export function load_buffer_async(
		path: string,
		status_callback: (
			this: any,
			request_id: unknown,
			result: {
				status:
					typeof REQUEST_STATUS_ERROR_IO_ERROR | typeof REQUEST_STATUS_ERROR_NOT_FOUND | typeof REQUEST_STATUS_FINISHED;
				buffer: buffer | undefined;
			},
		) => void,
	): AnyNotNil | undefined;

	/**
	 * Loads a custom resource. Specify the full filename of the resource that you want
	 * to load. When loaded, the file data is returned as a string.
	 * If loading fails, the function returns `undefined` plus the error message.
	 * In order for the engine to include custom resources in the build process, you need
	 * to specify them in the "custom_resources" key in your "game.project" settings file.
	 * You can specify single resource files or directories. If a directory is included
	 * in the resource list, all files and directories in that directory is recursively
	 * included:
	 * For example "main/data/,assets/level_data.json".
	 * @param filename  resource to load, full path
	 * @returns data  loaded data, or `undefined` if the resource could not be loaded
	 * @returns error  the error message, or `undefined` if no error occurred
	 */
	export function load_resource(
		filename: string,
	): LuaMultiReturn<[string | undefined, string | undefined]>;

	/**
	* Open URL in default application, typically a browser
	* @param url  url to open
	* @param attributes  table with attributes
`target`
: Optional. Specifies the target attribute or the name of the window. The following values are supported:
- `_self` - (default value) URL replaces the current page.
- `_blank` - URL is loaded into a new window, or tab.
- `_parent` - URL is loaded into the parent frame.
- `_top` - URL replaces any framesets that may be loaded.
- `name` - The name of the window (Note: the name does not specify the title of the new window).
	* @returns success  a boolean indicating if the url could be opened or not
	*/
	export function open_url(
		url: string,
		attributes?: { target?: string | '_blank' | '_parent' | '_self' | '_top' },
	): boolean;

	/**
	 * Reboots the game engine with a specified set of arguments.
	 * Arguments will be translated into command line arguments. Calling reboot
	 * function is equivalent to starting the engine with the same arguments.
	 * On startup the engine reads configuration from "game.project" in the
	 * project root.
	 * @param arg1  argument 1
	 * @param arg2  argument 2
	 * @param arg3  argument 3
	 * @param arg4  argument 4
	 * @param arg5  argument 5
	 * @param arg6  argument 6
	 */
	export function reboot(
		arg1?: string,
		arg2?: string,
		arg3?: string,
		arg4?: string,
		arg5?: string,
		arg6?: string,
	): void;

	/**
	 * The table can later be loaded by `sys.load`.
	 * Use `sys.get_save_file` to obtain a valid location for the file.
	 * Internally, this function uses a workspace buffer sized output file sized 512kb.
	 * This size reflects the output file size which must not exceed this limit.
	 * Additionally, the total number of rows that any one table may contain is limited to 65536
	 * (i.e. a 16 bit range). When tables are used to represent arrays, the values of
	 * keys are permitted to fall within a 32 bit range, supporting sparse arrays, however
	 * the limit on the total number of rows remains in effect.
	 * @param filename  file to write to
	 * @param table  lua table to save
	 * @returns success  a boolean indicating if the table could be saved or not
	 */
	export function save(filename: string, table: AnyNotNil): boolean;

	/**
	 * The buffer can later deserialized by `sys.deserialize`.
	 * This method has all the same limitations as `sys.save`.
	 * @param table  lua table to serialize
	 * @returns buffer  serialized data buffer
	 */
	export function serialize(table: AnyNotNil): string;

	/**
	 * Sets the host that is used to check for network connectivity against.
	 * @param host  hostname to check against
	 */
	export function set_connectivity_host(host: string): void;

	/**
	* Set the Lua error handler function.
	* The error handler is a function which is called whenever a lua runtime error occurs.
	* @param error_handler  the function to be called on error

`source`
The runtime context of the error. Currently, this is always `"lua"`.
`message`
The source file, line number and error message.
`traceback`
The stack traceback.

	*/
	export function set_error_handler(
		error_handler: (source: string, message: string, traceback: string) => void,
	): void;

	/**
	 * Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
	 * the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
	 * be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
	 * unchecked the engine will try to respect the rate in software using timers. There is no
	 * guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
	 * @param frequency  target frequency. 60 for 60 fps
	 */
	export function set_update_frequency(frequency: number): void;

	/**
	 * Set the vsync swap interval. The interval with which to swap the front and back buffers
	 * in sync with vertical blanks (v-blank), the hardware event where the screen image is updated
	 * with data from the front buffer. A value of 1 swaps the buffers at every v-blank, a value of
	 * 2 swaps the buffers every other v-blank and so on. A value of 0 disables waiting for v-blank
	 * before swapping the buffers. Default value is 1.
	 * When setting the swap interval to 0 and having `vsync` disabled in
	 * "game.project", the engine will try to respect the set frame cap value from
	 * "game.project" in software instead.
	 * This setting may be overridden by driver settings.
	 * @param swap_interval  target swap interval.
	 */
	export function set_vsync_swap_interval(swap_interval: number): void;

	/**
	 * Toggles the on-screen physics visual debugging mode which is very useful for
	 * tracking down issues related to physics. This mode visualizes
	 * all collision object shapes and normals at detected contact points. Toggling
	 * this mode on is equal to setting `physics.debug` in the "game.project" settings,
	 * but set in run-time.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type toggle_physics_debug = 'toggle_physics_debug';

	/**
	 * Toggles the on-screen profiler.
	 * The profiler is a real-time tool that shows the numbers of milliseconds spent
	 * in each scope per frame as well as counters. The profiler is very useful for
	 * tracking down performance and resource problems.
	 * In addition to the on-screen profiler, Defold includes a web-based profiler that
	 * allows you to sample a series of data points and then analyze them in detail.
	 * The web profiler is available at `http://&lt;device IP&gt;:8002` where  is
	 * the IP address of the device you are running your game on.
	 * This message can only be sent to the designated `@system` socket.
	 */
	export type toggle_profile = 'toggle_profile';
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/window/|Documentation} */
declare namespace window {
	/**
	 * dimming mode off
	 */
	export const DIMMING_OFF: number & { readonly _DIMMING_: unique symbol };

	/**
	 * dimming mode on
	 */
	export const DIMMING_ON: number & { readonly _DIMMING_: unique symbol };

	/**
	 * dimming mode unknown
	 */
	export const DIMMING_UNKNOWN: number & { readonly _DIMMING_: unique symbol };

	/**
	 * deiconified window event
	 */
	export const WINDOW_EVENT_DEICONIFIED: number & {
		readonly _WINDOW_EVENT_: unique symbol;
	};

	/**
	 * focus gained window event
	 */
	export const WINDOW_EVENT_FOCUS_GAINED: number & {
		readonly _WINDOW_EVENT_: unique symbol;
	};

	/**
	 * focus lost window event
	 */
	export const WINDOW_EVENT_FOCUS_LOST: number & {
		readonly _WINDOW_EVENT_: unique symbol;
	};

	/**
	 * iconify window event
	 */
	export const WINDOW_EVENT_ICONFIED: number & {
		readonly _WINDOW_EVENT_: unique symbol;
	};

	/**
	 * resized window event
	 */
	export const WINDOW_EVENT_RESIZED: number & {
		readonly _WINDOW_EVENT_: unique symbol;
	};

	/**
	* 🤖 Returns the current dimming mode set on a mobile device.
	* The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction.
	* On platforms that does not support dimming, `window.DIMMING_UNKNOWN` is always returned.
	* @returns mode  The mode for screen dimming

- `window.DIMMING_UNKNOWN`
- `window.DIMMING_ON`
- `window.DIMMING_OFF`

	*/
	export function get_dim_mode():
		typeof window.DIMMING_OFF | typeof window.DIMMING_ON | typeof window.DIMMING_UNKNOWN;

	/**
	 * This returns the current lock state of the mouse cursor
	 * @returns state  The lock state
	 */
	export function get_mouse_lock(): boolean;

	/**
	 * This returns the current window size (width and height).
	 * @returns width  The window width
	 * @returns height  The window height
	 */
	export function get_size(): LuaMultiReturn<[number, number]>;

	/**
	* 🤖 Sets the dimming mode on a mobile device.
	* The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction. The dimming mode will only affect the mobile device while the game is in focus on the device, but not when the game is running in the background.
	* This function has no effect on platforms that does not support dimming.
	* @param mode  The mode for screen dimming

- `window.DIMMING_ON`
- `window.DIMMING_OFF`

	*/
	export function set_dim_mode(
		mode: typeof window.DIMMING_OFF | typeof window.DIMMING_ON,
	): void;

	/**
	* Sets a window event listener.
	* @param callback  A callback which receives info about window events. Pass an empty function or `undefined` if you no longer wish to receive callbacks.

`this`
The calling script
`event`
The type of event. Can be one of these:


- `window.WINDOW_EVENT_FOCUS_LOST`
- `window.WINDOW_EVENT_FOCUS_GAINED`
- `window.WINDOW_EVENT_RESIZED`
- `window.WINDOW_EVENT_ICONIFIED`
- `window.WINDOW_EVENT_DEICONIFIED`


`data`
The callback value `data` is a table which currently holds these values


`width`: The width of a resize event. undefined otherwise.
`height`: The height of a resize event. undefined otherwise.

	*/
	export function set_listener(
		callback:
			((
					this: any,
					event:
						typeof window.WINDOW_EVENT_DEICONIFIED | typeof window.WINDOW_EVENT_FOCUS_GAINED | typeof window.WINDOW_EVENT_FOCUS_LOST | typeof window.WINDOW_EVENT_ICONFIED | typeof window.WINDOW_EVENT_RESIZED,
					data: { width: number | undefined; height: number | undefined },
			  ) => void) | undefined,
	): void;

	/**
	 * Set the locking state for current mouse cursor on a PC platform.
	 * This function locks or unlocks the mouse cursor to the center point of the window. While the cursor is locked,
	 * mouse position updates will still be sent to the scripts as usual.
	 * @param flag  The lock state for the mouse cursor
	 */
	export function set_mouse_lock(flag: boolean): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/buffer/|Documentation} */
declare namespace buffer {
	/**
	 * float32
	 */
	export const VALUE_TYPE_FLOAT32: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * int16
	 */
	export const VALUE_TYPE_INT16: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * int32
	 */
	export const VALUE_TYPE_INT32: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * int64
	 */
	export const VALUE_TYPE_INT64: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * int8
	 */
	export const VALUE_TYPE_INT8: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * uint16
	 */
	export const VALUE_TYPE_UINT16: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * uint32
	 */
	export const VALUE_TYPE_UINT32: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * uint64
	 */
	export const VALUE_TYPE_UINT64: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * uint8
	 */
	export const VALUE_TYPE_UINT8: number & {
		readonly _VALUE_TYPE_: unique symbol;
	};

	/**
	 * Copy all data streams from one buffer to another, element wise.
	 * ⚠ Each of the source streams must have a matching stream in the
	 * destination buffer. The streams must match in both type and size.
	 * The source and destination buffer can be the same.
	 * @param dst  the destination buffer
	 * @param dstoffset  the offset to start copying data to
	 * @param src  the source data buffer
	 * @param srcoffset  the offset to start copying data from
	 * @param count  the number of elements to copy
	 */
	export function copy_buffer(
		dst: buffer,
		dstoffset: number,
		src: buffer,
		srcoffset: number,
		count: number,
	): void;

	/**
	 * Copy a specified amount of data from one stream to another.
	 * ⚠ The value type and size must match between source and destination streams.
	 * The source and destination streams can be the same.
	 * @param dst  the destination stream
	 * @param dstoffset  the offset to start copying data to (measured in value type)
	 * @param src  the source data stream
	 * @param srcoffset  the offset to start copying data from (measured in value type)
	 * @param count  the number of values to copy (measured in value type)
	 */
	export function copy_stream(
		dst: bufferstream,
		dstoffset: number,
		src: bufferstream,
		srcoffset: number,
		count: number,
	): void;

	/**
	* Create a new data buffer containing a specified set of streams. A data buffer
	* can contain one or more streams with typed data. This is useful for managing
	* compound data, for instance a vertex buffer could contain separate streams for
	* vertex position, color, normal etc.
	* @param element_count  The number of elements the buffer should hold
	* @param declaration  A table where each entry (table) describes a stream

`name`: The name of the stream
`type`: The data type of the stream
`count`: The number of values each element should hold

	* @returns buffer  the new buffer
	*/
	export function create(
		element_count: number,
		declaration: {
			hash: hash | string;
			type:
				typeof buffer.VALUE_TYPE_FLOAT32 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64;
			count: number;
		},
	): buffer;

	/**
	 * Get a copy of all the bytes from a specified stream as a Lua string.
	 * @param buffer  the source buffer
	 * @param stream_name  the name of the stream
	 * @returns data  the buffer data as a Lua string
	 */
	export function get_bytes(buffer: buffer, stream_name: hash): string;

	/**
	 * Get a named metadata entry from a buffer along with its type.
	 * @param buf  the buffer to get the metadata from
	 * @param metadata_name  name of the metadata entry
	 * @returns values  table of metadata values or `undefined` if the entry does not exist
	 * @returns value_type  numeric type of values or `undefined`
	 */
	export function get_metadata(
		buf: buffer,
		metadata_name: hash | string,
	): LuaMultiReturn<
		[
			unknown[] | undefined,
			(
				typeof buffer.VALUE_TYPE_FLOAT32 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64 | undefined
			),
		]
	>;

	/**
	 * Get a specified stream from a buffer.
	 * @param buffer  the buffer to get the stream from
	 * @param stream_name  the stream name
	 * @returns stream  the data stream
	 */
	export function get_stream(
		buffer: buffer,
		stream_name: hash | string,
	): bufferstream;

	/**
	 * Creates or updates a metadata array entry on a buffer.
	 * ⚠ The value type and count given when updating the entry should match those used when first creating it.
	 * @param buf  the buffer to set the metadata on
	 * @param metadata_name  name of the metadata entry
	 * @param values  actual metadata, an array of numeric values
	 * @param value_type  type of values when stored
	 */
	export function set_metadata(
		buf: buffer,
		metadata_name: hash | string,
		values: number[],
		value_type:
			typeof buffer.VALUE_TYPE_FLOAT32 | typeof buffer.VALUE_TYPE_INT8 | typeof buffer.VALUE_TYPE_INT16 | typeof buffer.VALUE_TYPE_INT32 | typeof buffer.VALUE_TYPE_INT64 | typeof buffer.VALUE_TYPE_UINT8 | typeof buffer.VALUE_TYPE_UINT16 | typeof buffer.VALUE_TYPE_UINT32 | typeof buffer.VALUE_TYPE_UINT64,
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/html5/|Documentation} */
declare namespace html5 {
	/**
	 * Executes the supplied string as JavaScript inside the browser.
	 * A call to this function is blocking, the result is returned as-is, as a string.
	 * (Internally this will execute the string using the `eval()` JavaScript function.)
	 * @param code  Javascript code to run
	 * @returns result  result as string
	 */
	export function run(code: string): string;

	/**
	* Set a JavaScript interaction listener callaback from lua that will be
	* invoked when a user interacts with the web page by clicking, touching or typing.
	* The callback can then call DOM restricted actions like requesting a pointer lock,
	* or start playing sounds the first time the callback is invoked.
	* @param callback  The interaction callback. Pass an empty function or `undefined` if you no longer wish to receive callbacks.

`this`
The calling script

	*/
	export function set_interaction_listener(
		callback: ((this: any) => void) | undefined,
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/http/|Documentation} */
declare namespace http {
	/**
	* Perform a HTTP/HTTPS request.
	* ⚠ If no timeout value is passed, the configuration value "network.http_timeout" is used. If that is not set, the timeout value is `0` (which blocks indefinitely).
	* @param url  target url
	* @param method  HTTP/HTTPS method, e.g. "GET", "PUT", "POST" etc.
	* @param callback  response callback function

`this`
The script instance
`id`
Internal message identifier. Do not use!
`response`
The response data. Contains the fields:


`status`: the status of the response
`response`: the response data (if not saved on disc)
`headers`: all the returned headers
`path`: the stored path (if saved to disc)
`error`: if any unforeseen errors occurred (e.g. file I/O)

	* @param headers  optional table with custom headers
	* @param post_data  optional data to send
	* @param options  optional table with request parameters. Supported entries:

`timeout`: timeout in seconds
Path should be absolute
Not available in HTML5 build
Not available in HTML5 build

	*/
	export function request(
		url: string,
		method: string,
		callback: (
			this: any,
			id: hash,
			response: {
				status: number;
				response?: string;
				headers: { [key: string]: string };
				path?: string;
				error?: string;
			},
		) => void,
		headers?: { [key: string]: string },
		post_data?: string,
		options?: {
			timeout?: number;
			path?: string;
			ignore_cache?: boolean;
			chunked_transfer?: boolean;
		},
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/image/|Documentation} */
declare namespace image {
	/**
	 * luminance image type
	 */
	export const TYPE_LUMINANCE: 'l';

	/**
	 * luminance image type
	 */
	export const TYPE_LUMINANCE_ALPHA: 'la';

	/**
	 * RGB image type
	 */
	export const TYPE_RGB: 'rgb';

	/**
	 * RGBA image type
	 */
	export const TYPE_RGBA: 'rgba';

	/**
	* Load image (PNG or JPEG) from buffer.
	* @param buffer  image data buffer
	* @param options  An optional table containing parameters for loading the image. Supported entries:

`premultiply_alpha`
True if alpha should be premultiplied into the color components. Defaults to `false`.
`flip_vertically`
True if the image contents should be flipped vertically. Defaults to `false`.

	* @returns image  object or `undefined` if loading fails. The object is a table with the following fields:

`width`: image width
`height`: image height
`type`: image type
- `image.TYPE_RGB`
- `image.TYPE_RGBA`
- `image.TYPE_LUMINANCE`
- `image.TYPE_LUMINANCE_ALPHA`


`buffer`: the raw image data

	*/
	export function load(
		buffer: string,
		options?: { premultiply_alpha?: boolean; flip_vertically?: boolean },
	):
		{
				width: number;
				height: number;
				type:
					typeof image.TYPE_LUMINANCE | typeof image.TYPE_LUMINANCE_ALPHA | typeof image.TYPE_RGB | typeof image.TYPE_RGBA;
				buffer: string;
		  } | undefined;

	/**
	* Load image (PNG or JPEG) from a string buffer.
	* @param buffer  image data buffer
	* @param options  An optional table containing parameters for loading the image. Supported entries:

`premultiply_alpha`
True if alpha should be premultiplied into the color components. Defaults to `false`.
`flip_vertically`
True if the image contents should be flipped vertically. Defaults to `false`.

	* @returns image  object or `undefined` if loading fails. The object is a table with the following fields:

`width`: image width
`height`: image height
`type`: image type
- `image.TYPE_RGB`
- `image.TYPE_RGBA`
- `image.TYPE_LUMINANCE`
- `image.TYPE_LUMINANCE_ALPHA`


`buffer`: the script buffer that holds the decompressed image data. See buffer.create how to use the buffer.

	*/
	export function load_buffer(
		buffer: string,
		options?: { premultiply_alpha?: boolean; flip_vertically?: boolean },
	):
		{
				width: number;
				height: number;
				type:
					typeof TYPE_LUMINANCE | typeof TYPE_LUMINANCE_ALPHA | typeof TYPE_RGB | typeof TYPE_RGBA;
				buffer: buffer;
		  } | undefined;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/json/|Documentation} */
declare namespace json {
	/**
	* Decode a string of JSON data into a Lua table.
	* A Lua error is raised for syntax errors.
	* @param json  json data
	* @param options  table with decode options

`decode_null_as_userdata`: wether to decode a JSON null value as json.null or undefined (default is undefined)

	* @returns data  decoded json
	*/
	export function decode(
		json: string,
		options?: { decode_null_as_userdata: boolean },
	): AnyNotNil | undefined;

	/**
	* Encode a lua table to a JSON string.
	* A Lua error is raised for syntax errors.
	* @param tbl  lua table to encode
	* @param options  table with encode options

`encode_empty_table_as_object`: wether to encode an empty table as an JSON object or array (default is object)

	* @returns json  encoded json
	*/
	export function encode(
		tbl: AnyNotNil,
		options?: { encode_empty_table_as_object: boolean },
	): string;

	/**
	 * null
	 */
	let null$: null;
	export { null$ as null };
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/msg/|Documentation} */
declare namespace msg {
	/**
	 * Post a message to a receiving URL. The most common case is to send messages
	 * to a component. If the component part of the receiver is omitted, the message
	 * is broadcast to all components in the game object.
	 * The following receiver shorthands are available:
	 *
	 * - `"."` the current game object
	 * - `"#"` the current component
	 *
	 * ⚠ There is a 2 kilobyte limit to the message parameter table size.
	 * @param receiver  The receiver must be a string in URL-format, a URL object or a hashed string.
	 * @param message_id  The id must be a string or a hashed string.
	 * @param message  a lua table with message parameters to send.
	 */
	export function post(
		receiver: hash | url | string,
		message_id: hash | string,
		message?: generic_message,
	): void;
	export type generic_message =
		| LuaMap<AnyNotNil, AnyNotNil>
		| { [key: number | string | symbol]: AnyNotNil };

	/**
	 * This is equivalent to `msg.url(undefined)` or `msg.url("#")`, which creates an url to the current
	 * script component.
	 * @returns url  a new URL
	 */
	export function url(): url;

	/**
	 * The format of the string must be `[socket:][path][#fragment]`, which is similar to a HTTP URL.
	 * When addressing instances:
	 *
	 * - `socket` is the name of a valid world (a collection)
	 * - `path` is the id of the instance, which can either be relative the instance of the calling script or global
	 * - `fragment` would be the id of the desired component
	 *
	 * In addition, the following shorthands are available:
	 *
	 * - `"."` the current game object
	 * - `"#"` the current component
	 *
	 * @param urlstring  string to create the url from
	 * @returns url  a new URL
	 */
	export function url(urlstring: string): url;

	/**
	 * creates a new URL from separate arguments
	 * @param socket  socket of the URL
	 * @param path  path of the URL
	 * @param fragment  fragment of the URL
	 * @returns url  a new URL
	 */
	export function url(
		socket?: hash | string,
		path?: hash | string,
		fragment?: hash | string,
	): url;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/timer/|Documentation} */
declare namespace timer {
	/**
	 * Indicates an invalid timer handle
	 */
	export const INVALID_TIMER_HANDLE: number & {
		readonly _INVALID_TIMER_: unique symbol;
	};

	/**
	 * You may cancel a timer from inside a timer callback.
	 * Cancelling a timer that is already executed or cancelled is safe.
	 * @param handle  the timer handle returned by timer.delay()
	 * @returns true  if the timer was active, false if the timer is already cancelled / complete
	 */
	export function cancel(handle: hash): boolean;

	/**
	* Adds a timer and returns a unique handle.
	* You may create more timers from inside a timer callback.
	* Using a delay of 0 will result in a timer that triggers at the next frame just before
	* script update functions.
	* If you want a timer that triggers on each frame, set delay to 0.0f and repeat to true.
	* Timers created within a script will automatically die when the script is deleted.
	* @param delay  time interval in seconds
	* @param repeat  true = repeat timer until cancel, false = one-shot timer
	* @param callback  timer callback function

`this`
The current object
`handle`
The handle of the timer
`time_elapsed`
The elapsed time - on first trigger it is time since timer.delay call, otherwise time since last trigger

	* @returns handle  identifier for the create timer, returns timer.INVALID_TIMER_HANDLE if the timer can not be created
	*/
	export function delay(
		delay: number,
		repeat: boolean,
		callback: (this: any, handle: number, time_elapsed: number) => void,
	): hash | typeof timer.INVALID_TIMER_HANDLE;

	/**
	* Get information about timer.
	* @param handle  the timer handle returned by timer.delay()
	* @returns data  table or `undefined` if timer is cancelled/completed. table with data in the following fields:

`time_remaining`
Time remaining until the next time a timer.delay() fires.
`delay`
Time interval.
`repeating`
true = repeat timer until cancel, false = one-shot timer.

	*/
	export function get_info(
		handle: hash,
	): { time_remaining: number; delay: number; repeating: boolean } | undefined;

	/**
	 * Manual triggering a callback for a timer.
	 * @param handle  the timer handle returned by timer.delay()
	 * @returns true  if the timer was active, false if the timer is already cancelled / complete
	 */
	export function trigger(handle: hash): boolean;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

declare namespace vmath {
	/**
	 * Calculates the conjugate of a quaternion. The result is a
	 * quaternion with the same magnitudes but with the sign of
	 * the imaginary (vector) parts changed:
	 * `q* = [w, -v]`
	 * @param q1  quaternion of which to calculate the conjugate
	 * @returns q  the conjugate
	 */
	export function conj(q1: vmath.quaternion): vmath.quaternion;

	/**
	 * Given two linearly independent vectors P and Q, the cross product,
	 * P &#x00D7; Q, is a vector that is perpendicular to both P and Q and
	 * therefore normal to the plane containing them.
	 * If the two vectors have the same direction (or have the exact
	 * opposite direction from one another, i.e. are not linearly independent)
	 * or if either one has zero length, then their cross product is zero.
	 * @param v1  first vector
	 * @param v2  second vector
	 * @returns v  a new vector representing the cross product
	 */
	export function cross(v1: vmath.vector3, v2: vmath.vector3): vmath.vector3;

	/**
	 * The returned value is a scalar defined as:
	 * `P &#x22C5; Q = |P| |Q| cos &#x03B8;`
	 * where &#x03B8; is the angle between the vectors P and Q.
	 *
	 * - If the dot product is positive then the angle between the vectors is below 90 degrees.
	 * - If the dot product is zero the vectors are perpendicular (at right-angles to each other).
	 * - If the dot product is negative then the angle between the vectors is more than 90 degrees.
	 *
	 * @param v1  first vector
	 * @param v2  second vector
	 * @returns n  dot product
	 */
	export function dot(
		v1: vmath.vector3 | vmath.vector4,
		v2: vmath.vector3 | vmath.vector4,
	): number;

	/**
	 * The resulting matrix is the inverse of the supplied matrix.
	 * ⚠ For ortho-normal matrices, e.g. regular object transformation,
	 * use `vmath.ortho_inv()` instead.
	 * The specialized inverse for ortho-normalized matrices is much faster
	 * than the general inverse.
	 * @param m1  matrix to invert
	 * @returns m  inverse of the supplied matrix
	 */
	export function inv(m1: vmath.matrix4): vmath.matrix4;

	/**
	 * Returns the length of the supplied vector or quaternion.
	 * If you are comparing the lengths of vectors or quaternions, you should compare
	 * the length squared instead as it is slightly more efficient to calculate
	 * (it eliminates a square root calculation).
	 * @param v  value of which to calculate the length
	 * @returns n  length
	 */
	export function length(
		v: vmath.quaternion | vmath.vector3 | vmath.vector4,
	): number;

	/**
	 * Returns the squared length of the supplied vector or quaternion.
	 * @param v  value of which to calculate the squared length
	 * @returns n  squared length
	 */
	export function length_sqr(
		v: vmath.quaternion | vmath.vector3 | vmath.vector4,
	): number;

	/**
	 * Linearly interpolate between two vectors. The function
	 * treats the vectors as positions and interpolates between
	 * the positions in a straight line. Lerp is useful to describe
	 * transitions from one place to another over time.
	 * ⚠ The function does not clamp t between 0 and 1.
	 * @param t  interpolation parameter, 0-1
	 * @param v1  vector to lerp from
	 * @param v2  vector to lerp to
	 * @returns v  the lerped vector
	 */
	export function lerp(
		t: number,
		v1: vmath.vector3,
		v2: vmath.vector3,
	): vmath.vector3;
	export function lerp(
		t: number,
		v1: vmath.vector4,
		v2: vmath.vector4,
	): vmath.vector4;

	/**
	 * Linearly interpolate between two quaternions. Linear
	 * interpolation of rotations are only useful for small
	 * rotations. For interpolations of arbitrary rotations,
	 * vmath.slerp yields much better results.
	 * ⚠ The function does not clamp t between 0 and 1.
	 * @param t  interpolation parameter, 0-1
	 * @param q1  quaternion to lerp from
	 * @param q2  quaternion to lerp to
	 * @returns q  the lerped quaternion
	 */
	export function lerp(
		t: number,
		q1: vmath.quaternion,
		q2: vmath.quaternion,
	): vmath.quaternion;

	/**
	 * Linearly interpolate between two values. Lerp is useful
	 * to describe transitions from one value to another over time.
	 * ⚠ The function does not clamp t between 0 and 1.
	 * @param t  interpolation parameter, 0-1
	 * @param n1  number to lerp from
	 * @param n2  number to lerp to
	 * @returns n  the lerped number
	 */
	export function lerp(t: number, n1: number, n2: number): number;

	/**
	 * The resulting identity matrix describes a transform with
	 * no translation or rotation.
	 * @returns m  identity matrix
	 */
	export function matrix4(): vmath.matrix4;

	/**
	 * Creates a new matrix with all components set to the
	 * corresponding values from the supplied matrix. I.e.
	 * the function creates a copy of the given matrix.
	 * @param m1  existing matrix
	 * @returns m  matrix which is a copy of the specified matrix
	 */
	export function matrix4(m1: vmath.matrix4): vmath.matrix4;

	/**
	 * The resulting matrix describes a rotation around the axis by the specified angle.
	 * @param v  axis
	 * @param angle  angle in radians
	 * @returns m  matrix represented by axis and angle
	 */
	export function matrix4_axis_angle(
		v: vmath.vector3,
		angle: number,
	): vmath.matrix4;

	/**
	 * The resulting matrix describes the same rotation as the quaternion, but does not have any translation (also like the quaternion).
	 * @param q  quaternion to create matrix from
	 * @returns m  matrix represented by quaternion
	 */
	export function matrix4_from_quat(q: vmath.quaternion): vmath.matrix4;

	/**
	 * Constructs a frustum matrix from the given values. The left, right,
	 * top and bottom coordinates of the view cone are expressed as distances
	 * from the center of the near clipping plane. The near and far coordinates
	 * are expressed as distances from the tip of the view frustum cone.
	 * @param left  coordinate for left clipping plane
	 * @param right  coordinate for right clipping plane
	 * @param bottom  coordinate for bottom clipping plane
	 * @param top  coordinate for top clipping plane
	 * @param near  coordinate for near clipping plane
	 * @param far  coordinate for far clipping plane
	 * @returns m  matrix representing the frustum
	 */
	export function matrix4_frustum(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
	): vmath.matrix4;

	/**
	 * The resulting matrix is created from the supplied look-at parameters.
	 * This is useful for constructing a view matrix for a camera or
	 * rendering in general.
	 * @param eye  eye position
	 * @param look_at  look-at position
	 * @param up  up vector
	 * @returns m  look-at matrix
	 */
	export function matrix4_look_at(
		eye: vmath.vector3,
		look_at: vmath.vector3,
		up: vmath.vector3,
	): vmath.matrix4;

	/**
	 * Creates an orthographic projection matrix.
	 * This is useful to construct a projection matrix for a camera or rendering in general.
	 * @param left  coordinate for left clipping plane
	 * @param right  coordinate for right clipping plane
	 * @param bottom  coordinate for bottom clipping plane
	 * @param top  coordinate for top clipping plane
	 * @param near  coordinate for near clipping plane
	 * @param far  coordinate for far clipping plane
	 * @returns m  orthographic projection matrix
	 */
	export function matrix4_orthographic(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
	): vmath.matrix4;

	/**
	 * Creates a perspective projection matrix.
	 * This is useful to construct a projection matrix for a camera or rendering in general.
	 * @param fov  angle of the full vertical field of view in radians
	 * @param aspect  aspect ratio
	 * @param near  coordinate for near clipping plane
	 * @param far  coordinate for far clipping plane
	 * @returns m  perspective projection matrix
	 */
	export function matrix4_perspective(
		fov: number,
		aspect: number,
		near: number,
		far: number,
	): vmath.matrix4;

	/**
	 * The resulting matrix describes a rotation around the x-axis
	 * by the specified angle.
	 * @param angle  angle in radians around x-axis
	 * @returns m  matrix from rotation around x-axis
	 */
	export function matrix4_rotation_x(angle: number): vmath.matrix4;

	/**
	 * The resulting matrix describes a rotation around the y-axis
	 * by the specified angle.
	 * @param angle  angle in radians around y-axis
	 * @returns m  matrix from rotation around y-axis
	 */
	export function matrix4_rotation_y(angle: number): vmath.matrix4;

	/**
	 * The resulting matrix describes a rotation around the z-axis
	 * by the specified angle.
	 * @param angle  angle in radians around z-axis
	 * @returns m  matrix from rotation around z-axis
	 */
	export function matrix4_rotation_z(angle: number): vmath.matrix4;

	/**
	 * The resulting matrix describes a translation of a point
	 * in euclidean space.
	 * @param position  position vector to create matrix from
	 * @returns m  matrix from the supplied position vector
	 */
	export function matrix4_translation(
		position: vmath.vector3 | vmath.vector4,
	): vmath.matrix4;

	/**
	 * Performs an element wise multiplication between two vectors of the same type
	 * The returned value is a vector defined as (e.g. for a vector3):
	 * `v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
	 * @param v1  first vector
	 * @param v2  second vector
	 * @returns v  multiplied vector
	 */
	export function mul_per_elem(
		v1: vmath.vector3,
		v2: vmath.vector3,
	): vmath.vector3;
	export function mul_per_elem(
		v1: vmath.vector4,
		v2: vmath.vector4,
	): vmath.vector4;

	/**
	 * Normalizes a vector, i.e. returns a new vector with the same
	 * direction as the input vector, but with length 1.
	 * ⚠ The length of the vector must be above 0, otherwise a
	 * division-by-zero will occur.
	 * @param v1  vector to normalize
	 * @returns v  new normalized vector
	 */
	export function normalize(v1: vmath.vector3): vmath.vector3;
	export function normalize(v1: vmath.vector4): vmath.vector4;
	export function normalize(v1: vmath.quaternion): vmath.quaternion;

	/**
	 * The resulting matrix is the inverse of the supplied matrix.
	 * The supplied matrix has to be an ortho-normal matrix, e.g.
	 * describe a regular object transformation.
	 * ⚠ For matrices that are not ortho-normal
	 * use the general inverse `vmath.inv()` instead.
	 * @param m1  ortho-normalized matrix to invert
	 * @returns m  inverse of the supplied matrix
	 */
	export function ortho_inv(m1: vmath.matrix4): vmath.matrix4;

	/**
	 * Calculates the extent the projection of the first vector onto the second.
	 * The returned value is a scalar p defined as:
	 * `p = |P| cos &#x03B8; / |Q|`
	 * where &#x03B8; is the angle between the vectors P and Q.
	 * @param v1  vector to be projected on the second
	 * @param v2  vector onto which the first will be projected, must not have zero length
	 * @returns n  the projected extent of the first vector onto the second
	 */
	export function project(v1: vmath.vector3, v2: vmath.vector3): number;

	/**
	 * Creates a new identity quaternion. The identity
	 * quaternion is equal to:
	 * `vmath.quat(0, 0, 0, 1)`
	 * @returns q  new identity quaternion
	 */
	export function quat(): vmath.quaternion;

	/**
	 * Creates a new quaternion with all components set to the
	 * corresponding values from the supplied quaternion. I.e.
	 * This function creates a copy of the given quaternion.
	 * @param q1  existing quaternion
	 * @returns q  new quaternion
	 */
	export function quat(q1: vmath.quaternion): vmath.quaternion;

	/**
	 * Creates a new quaternion with the components set
	 * according to the supplied parameter values.
	 * @param x  x coordinate
	 * @param y  y coordinate
	 * @param z  z coordinate
	 * @param w  w coordinate
	 * @returns q  new quaternion
	 */
	export function quat(
		x: number,
		y: number,
		z: number,
		w: number,
	): vmath.quaternion;

	/**
	 * The resulting quaternion describes a rotation of `angle`
	 * radians around the axis described by the unit vector `v`.
	 * @param v  axis
	 * @param angle  angle
	 * @returns q  quaternion representing the axis-angle rotation
	 */
	export function quat_axis_angle(
		v: vmath.vector3,
		angle: number,
	): vmath.quaternion;

	/**
	 * The resulting quaternion describes the rotation from the
	 * identity quaternion (no rotation) to the coordinate system
	 * as described by the given x, y and z base unit vectors.
	 * @param x  x base vector
	 * @param y  y base vector
	 * @param z  z base vector
	 * @returns q  quaternion representing the rotation of the specified base vectors
	 */
	export function quat_basis(
		x: vmath.vector3,
		y: vmath.vector3,
		z: vmath.vector3,
	): vmath.quaternion;

	/**
	 * The resulting quaternion describes the rotation that,
	 * if applied to the first vector, would rotate the first
	 * vector to the second. The two vectors must be unit
	 * vectors (of length 1).
	 * ⚠ The result is undefined if the two vectors point in opposite directions
	 * @param v1  first unit vector, before rotation
	 * @param v2  second unit vector, after rotation
	 * @returns q  quaternion representing the rotation from first to second vector
	 */
	export function quat_from_to(
		v1: vmath.vector3,
		v2: vmath.vector3,
	): vmath.quaternion;

	/**
	 * The resulting quaternion describes a rotation of `angle`
	 * radians around the x-axis.
	 * @param angle  angle in radians around x-axis
	 * @returns q  quaternion representing the rotation around the x-axis
	 */
	export function quat_rotation_x(angle: number): vmath.quaternion;

	/**
	 * The resulting quaternion describes a rotation of `angle`
	 * radians around the y-axis.
	 * @param angle  angle in radians around y-axis
	 * @returns q  quaternion representing the rotation around the y-axis
	 */
	export function quat_rotation_y(angle: number): vmath.quaternion;

	/**
	 * The resulting quaternion describes a rotation of `angle`
	 * radians around the z-axis.
	 * @param angle  angle in radians around z-axis
	 * @returns q  quaternion representing the rotation around the z-axis
	 */
	export function quat_rotation_z(angle: number): vmath.quaternion;

	/**
	 * Returns a new vector from the supplied vector that is
	 * rotated by the rotation described by the supplied
	 * quaternion.
	 * @param q  quaternion
	 * @param v1  vector to rotate
	 * @returns v  the rotated vector
	 */
	export function rotate(q: vmath.quaternion, v1: vmath.vector3): vmath.vector3;

	/**
	 * Spherically interpolates between two vectors. The difference to
	 * lerp is that slerp treats the vectors as directions instead of
	 * positions in space.
	 * The direction of the returned vector is interpolated by the angle
	 * and the magnitude is interpolated between the magnitudes of the
	 * from and to vectors.
	 * ⚠ Slerp is computationally more expensive than lerp.
	 * The function does not clamp t between 0 and 1.
	 * @param t  interpolation parameter, 0-1
	 * @param v1  vector to slerp from
	 * @param v2  vector to slerp to
	 * @returns v  the slerped vector
	 */
	export function slerp(
		t: number,
		v1: vmath.vector3,
		v2: vmath.vector3,
	): vmath.vector3;
	export function slerp(
		t: number,
		v1: vmath.vector4,
		v2: vmath.vector4,
	): vmath.vector4;

	/**
	 * Slerp travels the torque-minimal path maintaining constant
	 * velocity, which means it travels along the straightest path along
	 * the rounded surface of a sphere. Slerp is useful for interpolation
	 * of rotations.
	 * Slerp travels the torque-minimal path, which means it travels
	 * along the straightest path the rounded surface of a sphere.
	 * ⚠ The function does not clamp t between 0 and 1.
	 * @param t  interpolation parameter, 0-1
	 * @param q1  quaternion to slerp from
	 * @param q2  quaternion to slerp to
	 * @returns q  the slerped quaternion
	 */
	export function slerp(
		t: number,
		q1: vmath.quaternion,
		q2: vmath.quaternion,
	): vmath.quaternion;

	/**
	 * Creates a vector of arbitrary size. The vector is initialized
	 * with numeric values from a table.
	 * ⚠ The table values are converted to floating point
	 * values. If a value cannot be converted, a 0 is stored in that
	 * value position in the vector.
	 * @param t  table of numbers
	 * @returns v  new vector
	 */
	export function vector(t: number[]): number & { [key: number]: number };

	/**
	 * Creates a new zero vector with all components set to 0.
	 * @returns v  new zero vector
	 */
	export function vector3(): vmath.vector3;

	/**
	 * Creates a new vector with all components set to the
	 * supplied scalar value.
	 * @param n  scalar value to splat
	 * @returns v  new vector
	 */
	export function vector3(n: number): vmath.vector3;

	/**
	 * Creates a new vector with all components set to the
	 * corresponding values from the supplied vector. I.e.
	 * This function creates a copy of the given vector.
	 * @param v1  existing vector
	 * @returns v  new vector
	 */
	export function vector3(v1: vmath.vector3): vmath.vector3;

	/**
	 * Creates a new vector with the components set to the
	 * supplied values.
	 * @param x  x coordinate
	 * @param y  y coordinate
	 * @param z  z coordinate
	 * @returns v  new vector
	 */
	export function vector3(x: number, y: number, z: number): vmath.vector3;

	/**
	 * Creates a new zero vector with all components set to 0.
	 * @returns v  new zero vector
	 */
	export function vector4(): vmath.vector4;

	/**
	 * Creates a new vector with all components set to the
	 * supplied scalar value.
	 * @param n  scalar value to splat
	 * @returns v  new vector
	 */
	export function vector4(n: number): vmath.vector4;

	/**
	 * Creates a new vector with all components set to the
	 * corresponding values from the supplied vector. I.e.
	 * This function creates a copy of the given vector.
	 * @param v1  existing vector
	 * @returns v  new vector
	 */
	export function vector4(v1: vmath.vector4): vmath.vector4;

	/**
	 * Creates a new vector with the components set to the
	 * supplied values.
	 * @param x  x coordinate
	 * @param y  y coordinate
	 * @param z  z coordinate
	 * @param w  w coordinate
	 * @returns v  new vector
	 */
	export function vector4(
		x: number,
		y: number,
		z: number,
		w: number,
	): vmath.vector4;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/zlib/|Documentation} */
declare namespace zlib {
	/**
	 * A lua error is raised is on error
	 * @param buf  buffer to deflate
	 * @returns buf  deflated buffer
	 */
	export function deflate(buf: string): string;

	/**
	 * A lua error is raised is on error
	 * @param buf  buffer to inflate
	 * @returns buf  inflated buffer
	 */
	export function inflate(buf: string): string;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/camera/|Documentation} */
declare namespace camera {
	/**
	 * The ratio between the frustum width and height. Used when calculating the
	 * projection of a perspective camera.
	 * The type of the property is number.
	 */
	export let aspect_ratio: number;

	/**
	 * get aspect ratio
	 * @param camera  camera id
	 * @returns aspect_ratio  the aspect ratio.
	 */
	export function get_aspect_ratio(camera: any): number;

	/**
	 * This function returns a table with all the camera URLs that have been
	 * registered in the render context.
	 * @param camera  camera id
	 * @returns cameras  a table with all camera URLs
	 */
	export function get_cameras(camera: any): AnyNotNil | undefined;

	/**
	 * get far z
	 * @param camera  camera id
	 * @returns far_z  the far z.
	 */
	export function get_far_z(camera: any): number;

	/**
	 * get field of view
	 * @param camera  camera id
	 * @returns fov  the field of view.
	 */
	export function get_fov(camera: any): number;

	/**
	 * get near z
	 * @param camera  camera id
	 * @returns near_z  the near z.
	 */
	export function get_near_z(camera: any): number;

	/**
	 * get orthographic zoom
	 * @param camera  camera id
	 * @returns orthographic_zoom  true if the camera is using an orthographic projection.
	 */
	export function get_orthographic_zoom(camera: any): boolean;

	/**
	 * get projection matrix
	 * @param camera  camera id
	 * @returns projection  the projection matrix.
	 */
	export function get_projection(camera: any): vmath.matrix4;

	/**
	 * get view matrix
	 * @param camera  camera id
	 * @returns view  the view matrix.
	 */
	export function get_view(camera: any): vmath.matrix4;

	/**
	 * set aspect ratio
	 * @param camera  camera id
	 * @param aspect_ratio  the aspect ratio.
	 */
	export function set_aspect_ratio(camera: any, aspect_ratio: number): void;

	/**
	 * set far z
	 * @param camera  camera id
	 * @param far_z  the far z.
	 */
	export function set_far_z(camera: any, far_z: number): void;

	/**
	 * set field of view
	 * @param camera  camera id
	 * @param fov  the field of view.
	 */
	export function set_fov(camera: any, fov: number): void;

	/**
	 * set near z
	 * @param camera  camera id
	 * @param near_z  the near z.
	 */
	export function set_near_z(camera: any, near_z: number): void;

	/**
	 * set orthographic zoom
	 * @param camera  camera id
	 * @param orthographic_zoom  true if the camera is using an orthographic projection.
	 */
	export function set_orthographic_zoom(
		camera: any,
		orthographic_zoom: boolean,
	): void;

	/**
	 * Camera frustum far plane.
	 * The type of the property is float.
	 */
	export let far_z: number;

	/**
	 * Vertical field of view of the camera.
	 * The type of the property is float.
	 */
	export let fov: number;

	/**
	 * Camera frustum near plane.
	 * The type of the property is float.
	 */
	export let near_z: number;

	/**
	 * Zoom level when using an orthographic projection.
	 * The type of the property is float.
	 */
	export let orthographic_zoom: number;

	/**
	 * READ ONLY The calculated projection matrix of the camera.
	 * The type of the property is matrix4.
	 */
	export const projection: Readonly<vmath.matrix4>;

	/**
	 *
	 * Post this message to a camera-component to set its properties at run-time.
	 *
	 */
	export type set_camera = 'set_camera';
	export type set_camera_message = {
		aspect_ratio?: number;
		fov?: number;
		near_z?: number;
		far_z?: number;
		orthographic_projection?: boolean;
		orthographic_zoom?: number;
	};

	/**
	 * READ ONLY The calculated view matrix of the camera.
	 * The type of the property is matrix4.
	 */
	export const view: Readonly<vmath.matrix4>;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/collectionfactory/|Documentation} */
declare namespace collectionfactory {
	/**
	 * loaded
	 */
	export const STATUS_LOADED: number & { readonly _STATUS_: unique symbol };

	/**
	 * loading
	 */
	export const STATUS_LOADING: number & { readonly _STATUS_: unique symbol };

	/**
	 * unloaded
	 */
	export const STATUS_UNLOADED: number & { readonly _STATUS_: unique symbol };

	/**
	 * The URL identifies the collectionfactory component that should do the spawning.
	 * Spawning is instant, but spawned game objects get their first update calls the following frame. The supplied parameters for position, rotation and scale
	 * will be applied to the whole collection when spawned.
	 * Script properties in the created game objects can be overridden through
	 * a properties-parameter table. The table should contain game object ids
	 * (hash) as keys and property tables as values to be used when initiating each
	 * spawned game object.
	 * See go.property for more information on script properties.
	 * The function returns a table that contains a key for each game object
	 * id (hash), as addressed if the collection file was top level, and the
	 * corresponding spawned instance id (hash) as value with a unique path
	 * prefix added to each instance.
	 * ⚠ Calling collectionfactory.create create on a collection factory that is marked as dynamic without having loaded resources
	 * using collectionfactory.load will synchronously load and create resources which may affect application performance.
	 * @param url  the collection factory component to be used
	 * @param position  position to assign to the newly spawned collection
	 * @param rotation  rotation to assign to the newly spawned collection
	 * @param properties  table of script properties to propagate to any new game object instances
	 * @param scale  uniform scaling to apply to the newly spawned collection (must be greater than 0).
	 * @returns ids  a table mapping the id:s from the collection to the new instance id:s
	 */
	export function create(
		url: hash | url | string,
		position?: vmath.vector3,
		rotation?: vmath.quaternion,
		properties?: any,
		scale?: number,
	): LuaMap<hash, hash>;

	/**
	* This returns status of the collection factory.
	* Calling this function when the factory is not marked as dynamic loading always returns COMP_COLLECTION_FACTORY_STATUS_LOADED.
	* @param url  the collection factory component to get status from
	* @returns status  status of the collection factory component

- `collectionfactory.STATUS_UNLOADED`
- `collectionfactory.STATUS_LOADING`
- `collectionfactory.STATUS_LOADED`

	*/
	export function get_status(
		url?: hash | url | string,
	):
		typeof collectionfactory.STATUS_LOADED | typeof collectionfactory.STATUS_LOADING | typeof collectionfactory.STATUS_UNLOADED;

	/**
	* Resources loaded are referenced by the collection factory component until the existing (parent) collection is destroyed or collectionfactory.unload is called.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the collection factory component to load
	* @param complete_function  function to call when resources are loaded.

`this`
The current object.
`url`
url of the collection factory component
`result`
True if resource were loaded successfully

	*/
	export function load(
		url?: hash | url | string,
		complete_function?: (this: any, url: url, result: boolean) => void,
	): void;

	/**
	 * Changes the prototype for the collection factory.
	 * Setting the prototype to "undefined" will revert back to the original prototype.
	 * @param url  the collection factory component
	 * @param prototype  the path to the new prototype, or `undefined`
	 */
	export function set_prototype(
		url?: hash | url | string,
		prototype?: any,
	): void;

	/**
	 * This decreases the reference count for each resource loaded with collectionfactory.load. If reference is zero, the resource is destroyed.
	 * Calling this function when the factory is not marked as dynamic loading does nothing.
	 * @param url  the collection factory component to unload
	 */
	export function unload(url?: hash | url | string): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/collectionproxy/|Documentation} */
declare namespace collectionproxy {
	/**
	 * Post this message to a collection-proxy-component to start background loading of the referenced collection.
	 * When the loading has completed, the message proxy_loaded will be sent back to the script.
	 * A loaded collection must be initialized (message init) and enabled (message enable) in order to be simulated and drawn.
	 */
	export type async_load = 'async_load';

	/**
	* return an indexed table of resources for a collection proxy where the
	* referenced collection has been excluded using LiveUpdate. Each entry is a
	* hexadecimal string that represents the data of the specific resource.
	* This representation corresponds with the filename for each individual
	* resource that is exported when you bundle an application with LiveUpdate
	* functionality.
	* @param collectionproxy  the collectionproxy to check for resources.
	* @returns resources  the resources, or an empty list if the
collection was not excluded.
	*/
	export function get_resources(collectionproxy: url): string[];

	/**
	* return an array of missing resources for a collection proxy. Each
	* entry is a hexadecimal string that represents the data of the specific
	* resource. This representation corresponds with the filename for each
	* individual resource that is exported when you bundle an application with
	* LiveUpdate functionality. It should be considered good practise to always
	* check whether or not there are any missing resources in a collection proxy
	* before attempting to load the collection proxy.
	* @param collectionproxy  the collectionproxy to check for missing
resources.
	* @returns resources  the missing resources
	*/
	export function missing_resources(collectionproxy: url): string[];

	/**
	 * Post this message to a collection-proxy-component to disable the referenced collection, which in turn disables the contained game objects and components.
	 */
	export type disable = 'disable';

	/**
	 * Post this message to a collection-proxy-component to enable the referenced collection, which in turn enables the contained game objects and components.
	 * If the referenced collection was not initialized prior to this call, it will automatically be initialized.
	 */
	export type enable = 'enable';

	/**
	 * Post this message to a collection-proxy-component to finalize the referenced collection, which in turn finalizes the contained game objects and components.
	 */
	export type final = 'final';

	/**
	 * Post this message to a collection-proxy-component to initialize the game objects and components in the referenced collection.
	 * Sending enable to an uninitialized collection proxy automatically initializes it.
	 * The init message simply provides a higher level of control.
	 */
	export type init = 'init';

	/**
	 * Post this message to a collection-proxy-component to start the loading of the referenced collection.
	 * When the loading has completed, the message proxy_loaded will be sent back to the script.
	 * A loaded collection must be initialized (message init) and enabled (message enable) in order to be simulated and drawn.
	 */
	export type load = 'load';

	/**
	 * This message is sent back to the script that initiated a collection proxy load when the referenced
	 * collection is loaded. See documentation for load for examples how to use.
	 */
	export type proxy_loaded = 'proxy_loaded';

	/**
	 * This message is sent back to the script that initiated an unload with a collection proxy when
	 * the referenced collection is unloaded. See documentation for unload for examples how to use.
	 */
	export type proxy_unloaded = 'proxy_unloaded';

	/**
	 * Post this message to a collection-proxy-component to modify the time-step used when updating the collection controlled by the proxy.
	 * The time-step is modified by a scaling `factor` and can be incremented either continuously or in discrete steps.
	 * The continuous mode can be used for slow-motion or fast-forward effects.
	 * The discrete mode is only useful when scaling the time-step to pass slower than real time (`factor` is below 1).
	 * The time-step will then be set to 0 for as many frames as the scaling demands and then take on the full real-time-step for one frame,
	 * to simulate pulses. E.g. if `factor` is set to `0.1` the time-step would be 0 for 9 frames, then be 1/60 for one
	 * frame, 0 for 9 frames, and so on. The result in practice is that the game looks like it's updated at a much lower frequency than 60 Hz,
	 * which can be useful for debugging when each frame needs to be inspected.
	 */
	export type set_time_step = 'set_time_step';
	export type set_time_step_message = { factor: number; mode: 0 | 1 };

	/**
	 * Post this message to a collection-proxy-component to start the unloading of the referenced collection.
	 * When the unloading has completed, the message proxy_unloaded will be sent back to the script.
	 */
	export type unload = 'unload';
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/factory/|Documentation} */
declare namespace factory {
	/**
	 * loaded
	 */
	export const STATUS_LOADED: number & { readonly _STATUS_: unique symbol };

	/**
	 * loading
	 */
	export const STATUS_LOADING: number & { readonly _STATUS_: unique symbol };

	/**
	 * unloaded
	 */
	export const STATUS_UNLOADED: number & { readonly _STATUS_: unique symbol };

	/**
	 * The URL identifies which factory should create the game object.
	 * If the game object is created inside of the frame (e.g. from an update callback), the game object will be created instantly, but none of its component will be updated in the same frame.
	 * Properties defined in scripts in the created game object can be overridden through the properties-parameter below.
	 * See go.property for more information on script properties.
	 * ⚠ Calling factory.create on a factory that is marked as dynamic without having loaded resources
	 * using factory.load will synchronously load and create resources which may affect application performance.
	 * @param url  the factory that should create a game object.
	 * @param position  the position of the new game object, the position of the game object calling `factory.create()` is used by default, or if the value is `undefined`.
	 * @param rotation  the rotation of the new game object, the rotation of the game object calling `factory.create()` is used by default, or if the value is `undefined`.
	 * @param properties  the properties defined in a script attached to the new game object.
	 * @param scale  the scale of the new game object (must be greater than 0), the scale of the game object containing the factory is used by default, or if the value is `undefined`
	 * @returns id  the global id of the spawned game object
	 */
	export function create(
		url: hash | url | string,
		position?: vmath.vector3,
		rotation?: vmath.quaternion,
		properties?: any,
		scale?: vmath.vector3 | number,
	): hash;

	/**
	* This returns status of the factory.
	* Calling this function when the factory is not marked as dynamic loading always returns
	* factory.STATUS_LOADED.
	* @param url  the factory component to get status from
	* @returns status  status of the factory component

- `factory.STATUS_UNLOADED`
- `factory.STATUS_LOADING`
- `factory.STATUS_LOADED`

	*/
	export function get_status(
		url?: hash | url | string,
	):
		typeof factory.STATUS_LOADED | typeof factory.STATUS_LOADING | typeof factory.STATUS_UNLOADED;

	/**
	* Resources are referenced by the factory component until the existing (parent) collection is destroyed or factory.unload is called.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the factory component to load
	* @param complete_function  function to call when resources are loaded.

`this`
The current object.
`url`
url of the factory component
`result`
True if resources were loaded successfully

	*/
	export function load(
		url?: hash | url | string,
		complete_function?: (this: any, url: url, result: boolean) => void,
	): void;

	/**
	 * Changes the prototype for the factory.
	 * @param url  the factory component
	 * @param prototype  the path to the new prototype, or `undefined`
	 */
	export function set_prototype(
		url?: hash | url | string,
		prototype?: string,
	): void;

	/**
	 * This decreases the reference count for each resource loaded with factory.load. If reference is zero, the resource is destroyed.
	 * Calling this function when the factory is not marked as dynamic loading does nothing.
	 * @param url  the factory component to unload
	 */
	export function unload(url?: hash | url | string): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/label/|Documentation} */
declare namespace label {
	/**
	 * The color of the label. The type of the property is vector4.
	 */
	export let color: vmath.vector4;

	/**
	 * The font used when rendering the label. The type of the property is hash.
	 */
	export let font: hash;

	/**
	 * Gets the text from a label component
	 * @param url  the label to get the text from
	 * @returns metrics  the label text
	 */
	export function get_text(url: hash | url | string): string;

	/**
	 * Sets the text of a label component
	 * ⚠ This method uses the message passing that means the value will be set after `dispatch messages` step.
	 * More information is available in the Application Lifecycle manual.
	 * @param url  the label that should have a constant set
	 * @param text  the text
	 */
	export function set_text(url: hash | url | string, text: string): void;

	/**
	 * The leading of the label. This value is used to scale the line spacing of text.
	 * The type of the property is number.
	 */
	export let leading: number;

	/**
	 * The line break of the label.
	 * This value is used to adjust the vertical spacing of characters in the text.
	 * The type of the property is boolean.
	 */
	export let line_break: boolean;

	/**
	 * The material used when rendering the label. The type of the property is hash.
	 */
	export let material: hash;

	/**
	 * The outline color of the label. The type of the property is vector4.
	 */
	export let outline: vmath.vector4;

	/**
	 * The scale of the label. The type of the property is number (uniform)
	 * or vector3 (non uniform).
	 */
	export let scale: vmath.vector3 | number;

	/**
	 * The shadow color of the label. The type of the property is vector4.
	 */
	export let shadow: vmath.vector4;

	/**
	 * Returns the size of the label. The size will constrain the text if line break is enabled.
	 * The type of the property is vector3.
	 */
	export let size: vmath.vector3;

	/**
	 * The tracking of the label.
	 * This value is used to adjust the vertical spacing of characters in the text.
	 * The type of the property is number.
	 */
	export let tracking: number;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/model/|Documentation} */
declare namespace model {
	/**
	 * The current animation set on the component. The type of the property is hash.
	 */
	export let animation: hash;

	/**
	 * The normalized animation cursor. The type of the property is number.
	 * ⚠ Please note that model events may not fire as expected when the cursor is manipulated directly.
	 */
	export let cursor: number;

	/**
	 * The material used when rendering the model. The type of the property is hash.
	 */
	export let material: hash;

	/**
	 * Cancels all animation on a model component.
	 * @param url  the model for which to cancel the animation
	 */
	export function cancel(url: hash | url | string): void;

	/**
	 * Gets the id of the game object that corresponds to a model skeleton bone.
	 * The returned game object can be used for parenting and transform queries.
	 * This function has complexity `O(n)`, where `n` is the number of bones in the model skeleton.
	 * Game objects corresponding to a model skeleton bone can not be individually deleted.
	 * @param url  the model to query
	 * @param bone_id  id of the corresponding bone
	 * @returns id  id of the game object
	 */
	export function get_go(
		url: hash | url | string,
		bone_id: hash | string,
	): hash;

	/**
	 * Get the enabled state of a mesh
	 * @param url  the model
	 * @param mesh_id  the id of the mesh
	 * @returns enabled  true if the mesh is visible, false otherwise
	 */
	export function get_mesh_enabled(
		url: hash | url | string,
		mesh_id: hash | url | string,
	): boolean;

	/**
	* Plays an animation on a model component with specified playback
	* mode and parameters.
	* An optional completion callback function can be provided that will be called when
	* the animation has completed playing. If no function is provided,
	* a model_animation_done message is sent to the script that started the animation.
	* ⚠ The callback is not called (or message sent) if the animation is
	* cancelled with model.cancel. The callback is called (or message sent) only for
	* animations that play with the following playback modes:
	* 
	* - `go.PLAYBACK_ONCE_FORWARD`
	* - `go.PLAYBACK_ONCE_BACKWARD`
	* - `go.PLAYBACK_ONCE_PINGPONG`
	* 
	* @param url  the model for which to play the animation
	* @param anim_id  id of the animation to play
	* @param playback  playback mode of the animation

- `go.PLAYBACK_ONCE_FORWARD`
- `go.PLAYBACK_ONCE_BACKWARD`
- `go.PLAYBACK_ONCE_PINGPONG`
- `go.PLAYBACK_LOOP_FORWARD`
- `go.PLAYBACK_LOOP_BACKWARD`
- `go.PLAYBACK_LOOP_PINGPONG`

	* @param play_properties  optional table with properties
Play properties table:

`blend_duration`
Duration of a linear blend between the current and new animation.
`offset`
The normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
The rate with which the animation will be played. Must be positive.

	* @param complete_function  function to call when the animation has completed.

`this`
The current object.
`message_id`
The name of the completion message, `"model_animation_done"`.
`message`
Information about the completion:


`animation_id` - the animation that was completed.
`playback` - the playback mode for the animation.


`sender`
The invoker of the callback: the model component.

	*/
	export function play_anim(
		url: hash | url | string,
		anim_id: hash | string,
		playback:
			typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_PINGPONG | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG,
		play_properties?: {
			blend_duration?: number;
			offset?: number;
			playback_rate?: number;
		},
		complete_function?: (
			this: any,
			message_id: hash,
			message: {
				animation_id: hash;
				playback:
					typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_PINGPONG | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG;
			},
			sender: url,
		) => void,
	): void;

	/**
	 * Enable or disable visibility of a mesh
	 * @param url  the model
	 * @param mesh_id  the id of the mesh
	 * @param enabled  true if the mesh should be visible, false if it should be hideen
	 */
	export function set_mesh_enabled(
		url: hash | url | string,
		mesh_id: hash | url | string,
		enabled: boolean,
	): void;

	/**
	 * This message is sent when a Model animation has finished playing back to the script
	 * that started the animation.
	 * ⚠ No message is sent if a completion callback function was supplied
	 * when the animation was started. No message is sent if the animation is cancelled with
	 * model.cancel(). This message is sent only for animations that play with
	 * the following playback modes:
	 *
	 * - `go.PLAYBACK_ONCE_FORWARD`
	 * - `go.PLAYBACK_ONCE_BACKWARD`
	 * - `go.PLAYBACK_ONCE_PINGPONG`
	 *
	 */
	export type model_animation_done = 'model_animation_done';
	export type model_animation_done_message = {
		animation_id: hash;
		playback:
			typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_PINGPONG;
	};

	/**
	 * The animation playback rate. A multiplier to the animation playback rate. The type of the property is number.
	 */
	export let playback_rate: number;

	/**
	 * The texture hash id of the model. Used for getting/setting model texture for unit 0-7
	 */
	export let textureN: hash;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/particlefx/|Documentation} */
declare namespace particlefx {
	/**
	 * postspawn state
	 */
	export const EMITTER_STATE_POSTSPAWN: number & {
		readonly _EMITTER_STATE_: unique symbol;
	};

	/**
	 * prespawn state
	 */
	export const EMITTER_STATE_PRESPAWN: number & {
		readonly _EMITTER_STATE_: unique symbol;
	};

	/**
	 * sleeping state
	 */
	export const EMITTER_STATE_SLEEPING: number & {
		readonly _EMITTER_STATE_: unique symbol;
	};

	/**
	 * spawning state
	 */
	export const EMITTER_STATE_SPAWNING: number & {
		readonly _EMITTER_STATE_: unique symbol;
	};

	/**
	* Starts playing a particle FX component.
	* Particle FX started this way need to be manually stopped through `particlefx.stop()`.
	* Which particle FX to play is identified by the URL.
	* ⚠ A particle FX will continue to emit particles even if the game object the particle FX component belonged to is deleted. You can call `particlefx.stop()` to stop it from emitting more particles.
	* @param url  the particle fx that should start playing.
	* @param emitter_state_function  optional callback function that will be called when an emitter attached to this particlefx changes state.

`this`
The current object
`id`
The id of the particle fx component
`emitter`
The id of the emitter
`state`
the new state of the emitter:


- `particlefx.EMITTER_STATE_SLEEPING`
- `particlefx.EMITTER_STATE_PRESPAWN`
- `particlefx.EMITTER_STATE_SPAWNING`
- `particlefx.EMITTER_STATE_POSTSPAWN`

	*/
	export function play(
		url: hash | url | string,
		emitter_state_function?: (
			this: any,
			id: hash,
			emitter: hash,
			state:
				typeof particlefx.EMITTER_STATE_POSTSPAWN | typeof particlefx.EMITTER_STATE_PRESPAWN | typeof particlefx.EMITTER_STATE_SLEEPING | typeof particlefx.EMITTER_STATE_SPAWNING,
		) => void,
	): void;

	/**
	 * Resets a shader constant for a particle FX component emitter.
	 * The constant must be defined in the material assigned to the emitter.
	 * Resetting a constant through this function implies that the value defined in the material will be used.
	 * Which particle FX to reset a constant for is identified by the URL.
	 * @param url  the particle FX that should have a constant reset
	 * @param emitter  the id of the emitter
	 * @param constant  the name of the constant
	 */
	export function reset_constant(
		url: hash | url | string,
		emitter: hash | string,
		constant: hash | string,
	): void;

	/**
	 * Sets a shader constant for a particle FX component emitter.
	 * The constant must be defined in the material assigned to the emitter.
	 * Setting a constant through this function will override the value set for that constant in the material.
	 * The value will be overridden until particlefx.reset_constant is called.
	 * Which particle FX to set a constant for is identified by the URL.
	 * @param url  the particle FX that should have a constant set
	 * @param emitter  the id of the emitter
	 * @param constant  the name of the constant
	 * @param value  the value of the constant
	 */
	export function set_constant(
		url: hash | url | string,
		emitter: hash | string,
		constant: hash | string,
		value: vmath.vector4,
	): void;

	/**
	* Stops a particle FX component from playing.
	* Stopping a particle FX does not remove already spawned particles.
	* Which particle FX to stop is identified by the URL.
	* @param url  the particle fx that should stop playing
	* @param options  Options when stopping the particle fx. Supported options:

`clear`: instantly clear spawned particles

	*/
	export function stop(
		url: hash | url | string,
		options?: { clear: boolean },
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/sound/|Documentation} */
declare namespace sound {
	/**
	 * The gain on the sound-component. Note that gain is in linear scale,
	 * between 0 and 1.
	 */
	export let gain: number;

	/**
	 * The pan on the sound-component. The valid range is from -1.0 to 1.0,
	 * representing -45 degrees left, to +45 degrees right.
	 */
	export let pan: number;

	/**
	 * Post this message to a sound-component to make it play its sound. Multiple voices is supported. The limit is set to 32 voices per sound component.
	 * ⚠ Note that gain is in linear scale, between 0 and 1.
	 * To get the dB value from the gain, use the formula `20 * log(gain)`.
	 * Inversely, to find the linear value from a dB value, use the formula
	 * `10db/20`.
	 * ⚠ A sound will continue to play even if the game object the sound component belonged to is deleted. You can send a `stop_sound` to stop the sound.
	 * ⚠ `play_id` should be specified in case you want to receive `sound_done` or `sound_stopped` in `on_message()`.
	 */
	export type play_sound = 'play_sound';
	export type play_sound_message = {
		delay?: number;
		gain?: number;
		play_id?: number;
	};

	/**
	 * Post this message to a sound-component to set gain on all active playing voices.
	 * ⚠ Note that gain is in linear scale, between 0 and 1.
	 * To get the dB value from the gain, use the formula `20 * log(gain)`.
	 * Inversely, to find the linear value from a dB value, use the formula
	 * `10db/20`.
	 */
	export type set_gain = 'set_gain';
	export type set_gain_message = { gain: number };

	/**
	 * The sound data used when playing the sound. The type of the property is hash.
	 */
	export let sound: hash;

	/**
	 * Get mixer group gain
	 * ⚠ Note that gain is in linear scale, between 0 and 1.
	 * To get the dB value from the gain, use the formula `20 * log(gain)`.
	 * Inversely, to find the linear value from a dB value, use the formula
	 * `10db/20`.
	 * @param group  group name
	 * @returns gain  gain in linear scale
	 */
	export function get_group_gain(group: hash | string): number;

	/**
	 * Get a mixer group name as a string.
	 * ⚠ This function is to be used for debugging and
	 * development tooling only. The function does a reverse hash lookup, which does not
	 * return a proper string value when the game is built in release mode.
	 * @param group  group name
	 * @returns name  group name
	 */
	export function get_group_name(group: hash | string): string;

	/**
	 * Get a table of all mixer group names (hashes).
	 * @returns groups  table of mixer group names
	 */
	export function get_groups(): hash[];

	/**
	 * Get peak value from mixer group.
	 * ⚠ Note that gain is in linear scale, between 0 and 1.
	 * To get the dB value from the gain, use the formula `20 * log(gain)`.
	 * Inversely, to find the linear value from a dB value, use the formula
	 * `10db/20`.
	 * Also note that the returned value might be an approximation and in particular
	 * the effective window might be larger than specified.
	 * @param group  group name
	 * @param window  window length in seconds
	 * @returns peak_l  peak value for left channel
	 * @returns peak_r  peak value for right channel
	 */
	export function get_peak(
		group: hash | string,
		window: number,
	): LuaMultiReturn<[number, number]>;

	/**
	 * Get RMS (Root Mean Square) value from mixer group. This value is the
	 * square root of the mean (average) value of the squared function of
	 * the instantaneous values.
	 * For instance: for a sinewave signal with a peak gain of -1.94 dB (0.8 linear),
	 * the RMS is `0.8 &times; 1/sqrt(2)` which is about 0.566.
	 * ⚠ Note the returned value might be an approximation and in particular
	 * the effective window might be larger than specified.
	 * @param group  group name
	 * @param window  window length in seconds
	 * @returns rms_l  RMS value for left channel
	 * @returns rms_r  RMS value for right channel
	 */
	export function get_rms(
		group: hash | string,
		window: number,
	): LuaMultiReturn<[number, number]>;

	/**
	 * Checks if background music is playing, e.g. from iTunes.
	 * 🌎 On non mobile platforms,
	 * this function always return `false`.
	 * 🌎 On Android you can only get a correct reading
	 * of this state if your game is not playing any sounds itself. This is a limitation
	 * in the Android SDK. If your game is playing any sounds, *even with a gain of zero*, this
	 * function will return `false`.
	 * The best time to call this function is:
	 *
	 * - In the `init` function of your main collection script before any sounds are triggered
	 * - In a window listener callback when the window.WINDOW_EVENT_FOCUS_GAINED event is received
	 *
	 * Both those times will give you a correct reading of the state even when your application is
	 * swapped out and in while playing sounds and it works equally well on Android and iOS.
	 * @returns playing  `true` if music is playing, otherwise `false`.
	 */
	export function is_music_playing(): boolean;

	/**
	 * Checks if a phone call is active. If there is an active phone call all
	 * other sounds will be muted until the phone call is finished.
	 * 🌎 On non mobile platforms,
	 * this function always return `false`.
	 * @returns call_active  `true` if there is an active phone call, `false` otherwise.
	 */
	export function is_phone_call_active(): boolean;

	/**
	 * Pause all active voices
	 * @param url  the sound that should pause
	 * @param pause  true if the sound should pause
	 */
	export function pause(url: hash | url | string, pause?: boolean): void;

	/**
	* Make the sound component play its sound. Multiple voices are supported. The limit is set to 32 voices per sound component.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* ⚠ A sound will continue to play even if the game object the sound component belonged to is deleted. You can call `sound.stop()` to stop the sound.
	* @param url  the sound that should play
	* @param play_properties  
optional table with properties:
`delay`
delay in seconds before the sound starts playing, default is 0.
`gain`
sound gain between 0 and 1, default is 1. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
`pan`
sound pan between -1 and 1, default is 0. The final pan of the sound will be an addition of this pan and the sound pan.
`speed`
sound speed where 1.0 is normal speed, 0.5 is half speed and 2.0 is double speed. The final speed of the sound will be a multiplication of this speed and the sound speed.

	* @param complete_function  function to call when the sound has finished playing or stopped manually via sound.stop.

`this`
The current object.
`message_id`
The name of the completion message, which can be either `"sound_done"` if the sound has finished playing, or `"sound_stopped"` if it was stopped manually.
`message`
Information about the completion:


`play_id` - the sequential play identifier that was given by the sound.play function.


`sender`
The invoker of the callback: the sound component.

	* @returns play_id  The identifier for the sound voice
	*/
	export function play(
		url: hash | url | string,
		play_properties?: {
			delay?: number;
			gain?: number;
			pan?: number;
			speed?: number;
		},
		complete_function?: (
			this: any,
			message_id: hash,
			message: { play_id: number },
			sender: url,
		) => void,
	): number;

	/**
	 * Set gain on all active playing voices of a sound.
	 * ⚠ Note that gain is in linear scale, between 0 and 1.
	 * To get the dB value from the gain, use the formula `20 * log(gain)`.
	 * Inversely, to find the linear value from a dB value, use the formula
	 * `10db/20`.
	 * @param url  the sound to set the gain of
	 * @param gain  sound gain between 0 and 1. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
	 */
	export function set_gain(url: hash | url | string, gain?: number): void;

	/**
	 * Set mixer group gain
	 * ⚠ Note that gain is in linear scale, between 0 and 1.
	 * To get the dB value from the gain, use the formula `20 * log(gain)`.
	 * Inversely, to find the linear value from a dB value, use the formula
	 * `10db/20`.
	 * @param group  group name
	 * @param gain  gain in linear scale
	 */
	export function set_group_gain(group: hash | string, gain: number): void;

	/**
	 * Set panning on all active playing voices of a sound.
	 * The valid range is from -1.0 to 1.0, representing -45 degrees left, to +45 degrees right.
	 * @param url  the sound to set the panning value to
	 * @param pan  sound panning between -1.0 and 1.0
	 */
	export function set_pan(url: hash | url | string, pan?: number): void;

	/**
	* Stop playing all active voices or just one voice if `play_id` provided
	* @param url  the sound component that should stop
	* @param stop_properties  
optional table with properties:
`play_id`
the sequential play identifier that should be stopped (was given by the sound.play() function)

	*/
	export function stop(
		url: hash | url | string,
		stop_properties?: { play_id: ReturnType<typeof play> },
	): void;

	/**
	 * This message is sent back to the sender of a `play_sound` message
	 * if the sound could be played to completion and a `play_id` was provided with the `play_sound` message.
	 */
	export type sound_done = 'sound_done';
	export type sound_done_message = { play_id: number };

	/**
	 * This message is sent back to the sender of a `play_sound` message, if the sound
	 * has been manually stopped and a `play_id` was provided with the `play_sound` message.
	 */
	export type sound_stopped = 'sound_stopped';
	export type sound_stopped_message = { play_id: number };

	/**
	 * The speed on the sound-component where 1.0 is normal speed, 0.5 is half
	 * speed and 2.0 is double speed.
	 */
	export let speed: number;

	/**
	 * Post this message to a sound-component to make it stop playing all active voices
	 */
	export type stop_sound = 'stop_sound';
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/sprite/|Documentation} */
declare namespace sprite {
	/**
	 * hash.
	 */
	export let animation: hash;

	/**
	 * This message is sent to the sender of a `play_animation` message when the
	 * animation has completed.
	 * Note that this message is sent only for animations that play with the following
	 * playback modes:
	 *
	 * - Once Forward
	 * - Once Backward
	 * - Once Ping Pong
	 *
	 * See play_animation for more information and examples of how to use
	 * this message.
	 */
	export type animation_done = 'animation_done';
	export type animation_done_message = { current_tile: number; id: hash };

	/**
	 * The normalized animation cursor. The type of the property is number.
	 */
	export let cursor: number;

	/**
	 * READ ONLY The frame count of the currently playing animation.
	 */
	export const frame_count: number;

	/**
	 * The image used when rendering the sprite. The type of the property is hash.
	 */
	export let image: hash;

	/**
	 * The material used when rendering the sprite. The type of the property is hash.
	 */
	export let material: hash;

	/**
	 * Post this message to a sprite component to make it play an animation from its tile set.
	 */
	export type play_animation = 'play_animation';
	export type play_animation_message = { id: hash };

	/**
	 * number.
	 * The playback_rate is a non-negative number, a negative value will be clamped to 0.
	 */
	export let playback_rate: number;

	/**
	 * The non-uniform scale of the sprite. The type of the property is vector3.
	 */
	export let scale: vmath.vector3;

	/**
	 * The size of the sprite, not allowing for any additional scaling that may be applied.
	 * The type of the property is vector3. It is not possible to set the size if the size mode
	 * of the sprite is set to auto.
	 */
	export let size: vmath.vector3;

	/**
	 * The slice values of the sprite. The type of the property is a vector4 that corresponds to
	 * the left, top, right, bottom values of the sprite in the editor.
	 * It is not possible to set the slice property if the size mode of the sprite is set to auto.
	 */
	export let slice: vmath.vector4;

	/**
	* Play an animation on a sprite component from its tile set
	* An optional completion callback function can be provided that will be called when
	* the animation has completed playing. If no function is provided,
	* a animation_done message is sent to the script that started the animation.
	* @param url  the sprite that should play the animation
	* @param id  hashed id of the animation to play
	* @param complete_function  function to call when the animation has completed.

`this`
The current object.
`message_id`
The name of the completion message, `"animation_done"`.
`message`
Information about the completion:


`current_tile` - the current tile of the sprite.
`id` - id of the animation that was completed.


`sender`
The invoker of the callback: the sprite component.

	* @param play_properties  optional table with properties:

`offset`
the normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
the rate with which the animation will be played. Must be positive.

	*/
	export function play_flipbook(
		url: hash | url | string,
		id: hash | string,
		complete_function?: (
			this: any,
			message_id: hash,
			message: { current_tile: number; id: hash },
			sender: url,
		) => void,
		play_properties?: { offset?: number; playback_rate?: number },
	): void;

	/**
	 * Sets horizontal flipping of the provided sprite's animations.
	 * The sprite is identified by its URL.
	 * If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
	 * @param url  the sprite that should flip its animations
	 * @param flip  `true` if the sprite should flip its animations, `false` if not
	 */
	export function set_hflip(url: hash | url | string, flip: boolean): void;

	/**
	 * Sets vertical flipping of the provided sprite's animations.
	 * The sprite is identified by its URL.
	 * If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
	 * @param url  the sprite that should flip its animations
	 * @param flip  `true` if the sprite should flip its animations, `false` if not
	 */
	export function set_vflip(url: hash | url | string, flip: boolean): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/** @see {@link https://defold.com/ref/stable/tilemap/|Documentation} */
declare namespace tilemap {
	/**
	 * The material used when rendering the tile map. The type of the property is hash.
	 */
	export let material: hash;

	/**
	 * The tile source used when rendering the tile map. The type of the property is hash.
	 */
	export let tile_source: hash;

	/**
	 * flip tile horizontally
	 */
	export const H_FLIP: number & { readonly __FLIP_: unique symbol };

	/**
	 * rotate tile 180 degrees clockwise
	 */
	export const ROTATE_180: number & { readonly _ROTATE_: unique symbol };

	/**
	 * rotate tile 270 degrees clockwise
	 */
	export const ROTATE_270: number & { readonly _ROTATE_: unique symbol };

	/**
	 * rotate tile 90 degrees clockwise
	 */
	export const ROTATE_90: number & { readonly _ROTATE_: unique symbol };

	/**
	 * flip tile vertically
	 */
	export const V_FLIP: number & { readonly __FLIP_: unique symbol };

	/**
	 * Get the bounds for a tile map. This function returns multiple values:
	 * The lower left corner index x and y coordinates (1-indexed),
	 * the tile map width and the tile map height.
	 * The resulting values take all tile map layers into account, meaning that
	 * the bounds are calculated as if all layers were collapsed into one.
	 * @param url  the tile map
	 * @returns x  x coordinate of the bottom left corner
	 * @returns y  y coordinate of the bottom left corner
	 * @returns w  number of columns (width) in the tile map
	 * @returns h  number of rows (height) in the tile map
	 */
	export function get_bounds(
		url: hash | url | string,
	): LuaMultiReturn<[number, number, number, number]>;

	/**
	 * Get the tile set at the specified position in the tilemap.
	 * The position is identified by the tile index starting at origin
	 * with index 1, 1. (see tilemap.set_tile())
	 * Which tile map and layer to query is identified by the URL and the
	 * layer name parameters.
	 * @param url  the tile map
	 * @param layer  name of the layer for the tile
	 * @param x  x-coordinate of the tile
	 * @param y  y-coordinate of the tile
	 * @returns tile  index of the tile
	 */
	export function get_tile(
		url: hash | url | string,
		layer: hash | string,
		x: number,
		y: number,
	): number;

	/**
	 * Replace a tile in a tile map with a new tile.
	 * The coordinates of the tiles are indexed so that the "first" tile just
	 * above and to the right of origin has coordinates 1,1.
	 * Tiles to the left of and below origin are indexed 0, -1, -2 and so forth.
	 *
	 * +-------+-------+------+------+
	 * |  0,3  |  1,3  | 2,3  | 3,3  |
	 * +-------+-------+------+------+
	 * |  0,2  |  1,2  | 2,2  | 3,2  |
	 * +-------+-------+------+------+
	 * |  0,1  |  1,1  | 2,1  | 3,1  |
	 * +-------O-------+------+------+
	 * |  0,0  |  1,0  | 2,0  | 3,0  |
	 * +-------+-------+------+------+
	 *
	 *
	 * The coordinates must be within the bounds of the tile map as it were created.
	 * That is, it is not possible to extend the size of a tile map by setting tiles outside the edges.
	 * To clear a tile, set the tile to number 0. Which tile map and layer to manipulate is identified by the URL and the layer name parameters.
	 * Transform bitmask is arithmetic sum of one or both FLIP constants (`tilemap.H_FLIP`, `tilemap.V_FLIP`) and/or one of ROTATION constants
	 * (`tilemap.ROTATE_90`, `tilemap.ROTATE_180`, `tilemap.ROTATE_270`).
	 * Flip always applies before rotation (clockwise).
	 * @param url  the tile map
	 * @param layer  name of the layer for the tile
	 * @param x  x-coordinate of the tile
	 * @param y  y-coordinate of the tile
	 * @param tile  index of new tile to set. 0 resets the cell
	 * @param transform_bitmask  optional flip and/or rotation should be applied to the tile
	 */
	export function set_tile(
		url: hash | url | string,
		layer: hash | string,
		x: number,
		y: number,
		tile: number,
		transform_bitmask?: number,
	): void;

	/**
	 * Sets the visibility of the tilemap layer
	 * @param url  the tile map
	 * @param layer  name of the layer for the tile
	 * @param visible  should the layer be visible
	 */
	export function set_visible(
		url: hash | url | string,
		layer: hash | string,
		visible: boolean,
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //
