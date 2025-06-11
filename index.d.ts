/** @noSelfInFile */
/// <reference types="lua-types/5.1" />
/// <reference types="lua-types/special/jit-only" />
/// <reference types="@typescript-to-lua/language-extensions" />
/// <reference types="./deprecated.d.ts" />
/// <reference types="./socket.d.ts" />

// DEFOLD. stable version 1.10.2 (f56fcca509a9fa5350bf55f18d8c6087295a8cef)
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

/**
 * A unique identifier used to reference resources, messages, properties, and other entities within the game.
 * @see {@link https://defold.com/manuals/addressing/#hashed-identifiers|Addressing Manual}
 */
declare type hash = Readonly<
	LuaUserdata & {
		readonly __hash__: unique symbol;
	}
>;

/**
 * A reference to game resources, such as game objects, components, and assets.
 * @see {@link https://defold.com/manuals/addressing/|Addressing Manual}
 */
declare type url = {
	socket: hash;
	path: hash;
	fragment: hash | undefined;
};

/**
 * A representation of a GUI object.
 * @see {@link https://defold.com/manuals/gui/|GUI Manual}
 */
declare type node = Readonly<
	LuaUserdata & {
		readonly __node__: unique symbol;
	}
>;

/**
 * A block of memory that can store binary data.
 * @see {@link https://defold.com/manuals/buffer/|Buffer Manual}
 */
declare type buffer = object;

/**
 * Render pipeline predicate.
 * @see {@link https://defold.com/manuals/render/|Render Manual}
 */
declare type predicate = Readonly<
	LuaUserdata & {
		readonly __predicate__: unique symbol;
	}
>;

/**
 * Render pipeline target.
 * @see {@link https://defold.com/manuals/render/|Render Manual}
 */
declare type rendertarget = Readonly<
	LuaUserdata & {
		readonly __rendertarget__: unique symbol;
	}
>;

/**
 * A data stream derived from a buffer.
 * @see {@link https://defold.com/ref/stable/buffer/#buffer.get_stream:buffer-stream_name|API Documentation}
 */
declare type bufferstream = LuaUserdata & number[] & object;

/** @see {@link https://defold.com/ref/stable/vmath/|API Documentation} */
declare namespace vmath {
	export type vector3 = number & {
		/**
		 * Addition Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		add: LuaAdditionMethod<vmath.vector3, vmath.vector3>;
		/**
		 * Subtraction Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		sub: LuaSubtractionMethod<vmath.vector3, vmath.vector3>;
		/**
		 * Multiplication Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		mul: LuaMultiplicationMethod<number, vmath.vector3>;
		/**
		 * Division Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		div: LuaDivisionMethod<number, vmath.vector3>;
		/**
		 * Negation Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		unm: LuaNegationMethod<vmath.vector3>;

		x: number;
		y: number;
		z: number;
	};

	export type vector4 = number & {
		/**
		 * Addition Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		add: LuaAdditionMethod<vmath.vector4, vmath.vector4>;
		/**
		 * Subtraction Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		sub: LuaSubtractionMethod<vmath.vector4, vmath.vector4>;
		/**
		 * Multiplication Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		mul: LuaMultiplicationMethod<number, vmath.vector4>;
		/**
		 * Division Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		div: LuaDivisionMethod<number, vmath.vector4>;
		/**
		 * Negation Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		unm: LuaNegationMethod<vmath.vector4>;

		x: number;
		y: number;
		z: number;
		w: number;
	};

	export type matrix4 = number & {
		/**
		 * Multiplication Operator for Matrix4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		mul: LuaMultiplicationMethod<number, vmath.matrix4> & LuaMultiplicationMethod<vmath.vector4, vmath.vector4>;

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
		/**
		 * Multiplication Operator for Matrix4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		mul: LuaMultiplicationMethod<vmath.quaternion, vmath.quaternion>;

		x: number;
		y: number;
		z: number;
		w: number;
	};
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

declare namespace liveupdate {
	/**
	 * LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH
	 */
	export const LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH: any;

	/**
	 * LIVEUPDATE_ENGINE_VERSION_MISMATCH
	 */
	export const LIVEUPDATE_ENGINE_VERSION_MISMATCH: any;

	/**
	 * LIVEUPDATE_FORMAT_ERROR
	 */
	export const LIVEUPDATE_FORMAT_ERROR: any;

	/**
	 * LIVEUPDATE_INVAL
	 */
	export const LIVEUPDATE_INVAL: any;

	/**
	 * LIVEUPDATE_INVALID_HEADER
	 */
	export const LIVEUPDATE_INVALID_HEADER: any;

	/**
	 * LIVEUPDATE_INVALID_RESOURCE
	 */
	export const LIVEUPDATE_INVALID_RESOURCE: any;

	/**
	 * LIVEUPDATE_IO_ERROR
	 */
	export const LIVEUPDATE_IO_ERROR: any;

	/**
	 * LIVEUPDATE_MEM_ERROR
	 */
	export const LIVEUPDATE_MEM_ERROR: any;

	/**
	 * LIVEUPDATE_OK
	 */
	export const LIVEUPDATE_OK: any;

	/**
	 * LIVEUPDATE_SCHEME_MISMATCH
	 */
	export const LIVEUPDATE_SCHEME_MISMATCH: any;

	/**
	 * LIVEUPDATE_SIGNATURE_MISMATCH
	 */
	export const LIVEUPDATE_SIGNATURE_MISMATCH: any;

	/**
	 * LIVEUPDATE_UNKNOWN
	 */
	export const LIVEUPDATE_UNKNOWN: any;

	/**
	 * LIVEUPDATE_VERSION_MISMATCH
	 */
	export const LIVEUPDATE_VERSION_MISMATCH: any;

	/**
	 * Adds a resource mount to the resource system.
	 * The mounts are persisted between sessions.
	 * After the mount succeeded, the resources are available to load. (i.e. no reboot required)
	 * @param name  Unique name of the mount
	 * @param uri  The uri of the mount, including the scheme. Currently supported schemes are 'zip' and 'archive'.
	 * @param priority  Priority of mount. Larger priority takes prescedence
	 * @param callback  Callback after the asynchronous request completed
	 * @returns result  The result of the request
	 * @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.add_mount|API Documentation}
	 */
	export function add_mount(
		name: string,
		uri: string,
		priority: any,
		callback: any,
	): number;

	/**
	 * Return a reference to the Manifest that is currently loaded.
	 * @returns manifest_reference  reference to the Manifest that is currently loaded
	 * @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.get_current_manifest|API Documentation}
	 */
	export function get_current_manifest(): number;

	/**
	 * Get an array of the current mounts
	 * This can be used to determine if a new mount is needed or not
	 * @returns mounts  Array of mounts
	 * @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.get_mounts|API Documentation}
	 */
	export function get_mounts(): AnyNotNil | undefined;

	/**
	 * Is any liveupdate data mounted and currently in use?
	 * This can be used to determine if a new manifest or zip file should be downloaded.
	 * @returns bool  true if a liveupdate archive (any format) has been loaded
	 * @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.is_using_liveupdate_data|API Documentation}
	 */
	export function is_using_liveupdate_data(): AnyNotNil | undefined;

	/**
	 * Remove a mount the resource system.
	 * The remaining mounts are persisted between sessions.
	 * Removing a mount does not affect any loaded resources.
	 * @param name  Unique name of the mount
	 * @returns result  The result of the call
	 * @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.remove_mount|API Documentation}
	 */
	export function remove_mount(name: string): number;

	/**
	* Stores a zip file and uses it for live update content. The contents of the
	* zip file will be verified against the manifest to ensure file integrity.
	* It is possible to opt out of the resource verification using an option passed
	* to this function.
	* The path is stored in the (internal) live update location.
	* @param path  the path to the original file on disc
	* @param callback  the callback function
executed after the storage has completed

`this`
The current object.
`status`
the status of the store operation (See liveupdate.store_manifest)

	* @param options  optional table with extra parameters. Supported entries:

`verify`: if archive should be verified as well as stored (defaults to true)
* @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.store_archive|API Documentation}

	*/
	export function store_archive(
		path: string,
		callback: any,
		options?: any,
	): void;

	/**
	* Create a new manifest from a buffer. The created manifest is verified
	* by ensuring that the manifest was signed using the bundled public/private
	* key-pair during the bundle process and that the manifest supports the current
	* running engine version. Once the manifest is verified it is stored on device.
	* The next time the engine starts (or is rebooted) it will look for the stored
	* manifest before loading resources. Storing a new manifest allows the
	* developer to update the game, modify existing resources, or add new
	* resources to the game through LiveUpdate.
	* @param manifest_buffer  the binary data that represents the manifest
	* @param callback  the callback function
executed once the engine has attempted to store the manifest.

`this`
The current object.
`status`
the status of the store operation:


- `liveupdate.LIVEUPDATE_OK`
- `liveupdate.LIVEUPDATE_INVALID_RESOURCE`
- `liveupdate.LIVEUPDATE_VERSION_MISMATCH`
- `liveupdate.LIVEUPDATE_ENGINE_VERSION_MISMATCH`
- `liveupdate.LIVEUPDATE_SIGNATURE_MISMATCH`
- `liveupdate.LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH`
- `liveupdate.LIVEUPDATE_FORMAT_ERROR`
* @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.store_manifest|API Documentation}

	*/
	export function store_manifest(manifest_buffer: string, callback: any): void;

	/**
	* add a resource to the data archive and runtime index. The resource will be verified
	* internally before being added to the data archive.
	* @param manifest_reference  The manifest to check against.
	* @param data  The resource data that should be stored.
	* @param hexdigest  The expected hash for the resource,
retrieved through collectionproxy.missing_resources.
	* @param callback  The callback
function that is executed once the engine has been attempted to store
the resource.

`this`
The current object.
`hexdigest`
The hexdigest of the resource.
`status`
Whether or not the resource was successfully stored.
* @see {@link https://defold.com/ref/stable/liveupdate/#liveupdate.store_resource|API Documentation}

	*/
	export function store_resource(
		manifest_reference: number,
		data: string,
		hexdigest: string,
		callback: any,
	): void;
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //
