/** @noSelfInFile */

/** */
declare namespace physics {
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
	* @see {@link https://defold.com/ref/stable/physics/#physics.set_listener|API Documentation}
	* @deprecated since v1.9.9
	*/
	export function set_listener(
		callback: (this: any, event: any, data: object) => void,
	): void;
}

/** */
declare namespace b2d.body {
	/**
	 * Print the body representation to the log output
	 * @param body  body
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.dump|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function dump(body: typeof b2d.body): void;

	/**
	 * Get the rotational inertia of the body about the local origin.
	 * @param body  body
	 * @returns inertia  the rotational inertia, usually in kg-m^2.
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.get_inertia|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function get_inertia(body: typeof b2d.body): number;

	/**
	 * Get the local position of the center of mass.
	 * @param body  body
	 * @returns center  Get the local position of the center of mass.
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.get_local_center|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function get_local_center(body: typeof b2d.body): vmath.vector3;

	/**
	 * Get the next body in the world's body list.
	 * @param body  body
	 * @returns body  the next body
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.get_next|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function get_next(body: typeof b2d.body): typeof b2d.body | undefined;

	/**
	 * Get the angle in radians.
	 * @param body  body
	 * @returns angle  the current world rotation angle in radians.
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.get_world_center|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function get_world_center(body: typeof b2d.body): number;

	/**
	 * Is this body allowed to sleep
	 * @param body  body
	 * @returns enabled  true if the body is allowed to sleep
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.is_sleeping_allowed|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function is_sleeping_allowed(
		body: typeof b2d.body,
	): AnyNotNil | undefined;

	/**
	 * You can disable sleeping on this body. If you disable sleeping, the body will be woken.
	 * @param body  body
	 * @param enable  if false, the body will never sleep, and consume more CPU
	 * @see {@link https://defold.com/ref/stable/b2d.body/#b2d.body.set_sleeping_allowed|API Documentation}
	 * @deprecated since v1.9.9
	 */
	export function set_sleeping_allowed(
		body: typeof b2d.body,
		enable: boolean,
	): void;
}

/** */
declare namespace render {
	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_CONSTANT_ALPHA: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_CONSTANT_COLOR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_DST_ALPHA: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_DST_COLOR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_CONSTANT_ALPHA: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_CONSTANT_COLOR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_DST_ALPHA: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_DST_COLOR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_SRC_ALPHA: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ONE_MINUS_SRC_COLOR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_SRC_ALPHA: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_SRC_ALPHA_SATURATE: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_SRC_COLOR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BLEND_ZERO: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR0_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR1_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR2_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR3_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_COLOR_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_DEPTH_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const BUFFER_STENCIL_BIT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_ALWAYS: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_EQUAL: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_GEQUAL: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_GREATER: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_LEQUAL: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_LESS: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_NEVER: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const COMPARE_FUNC_NOTEQUAL: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FACE_BACK: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FACE_FRONT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FACE_FRONT_AND_BACK: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FILTER_LINEAR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FILTER_NEAREST: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_DEPTH: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_LUMINANCE: number;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_R16F: number | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_R32F: number | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RG16F: number | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RG32F: number | undefined;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGB: number;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGB16F: number | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGB32F: number | undefined;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGBA: number;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGBA16F: number | undefined;

	/**
	 * May be undefined if the format isn't supported
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_RGBA32F: number | undefined;

	/**
	 * @deprecated since v1.9.2
	 */
	export const FORMAT_STENCIL: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_BLEND: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_CULL_FACE: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_DEPTH_TEST: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_POLYGON_OFFSET_FILL: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STATE_STENCIL_TEST: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_DECR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_DECR_WRAP: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_INCR: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_INCR_WRAP: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_INVERT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_KEEP: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_REPLACE: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const STENCIL_OP_ZERO: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_CLAMP_TO_BORDER: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_CLAMP_TO_EDGE: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_MIRRORED_REPEAT: number;

	/**
	 * @deprecated since v1.9.2
	 */
	export const WRAP_REPEAT: number;
}

declare namespace resource {
	/**
	 * BASIS_UASTC compression type
	 * @deprecated since v1.9.2
	 */
	export const COMPRESSION_TYPE_BASIS_UASTC: number;

	/**
	 * COMPRESSION_TYPE_DEFAULT compression type
	 * @deprecated since v1.9.2
	 */
	export const COMPRESSION_TYPE_DEFAULT: number;

	/**
	 * luminance type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_LUMINANCE: number;

	/**
	 * R16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_R16F: number;

	/**
	 * R32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_R32F: number;

	/**
	 * RG16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RG16F: number;

	/**
	 * RG32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RG32F: number;

	/**
	 * RGB type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB: number;

	/**
	 * RGB16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB16F: number;

	/**
	 * RGB32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB32F: number;

	/**
	 * RGBA type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA: number;

	/**
	 * RGBA16F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA16F: number;

	/**
	 * RGBA32F type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA32F: number;

	/**
	 * RGBA_ASTC_4x4 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_ASTC_4x4: number;

	/**
	 * RGBA_BC3 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_BC3: number;

	/**
	 * RGBA_BC7 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_BC7: number;

	/**
	 * RGBA_ETC2 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_ETC2: number;

	/**
	 * RGBA_PVRTC_2BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: number;

	/**
	 * RGBA_PVRTC_4BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: number;

	/**
	 * RGB_BC1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_BC1: number;

	/**
	 * RGB_ETC1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_ETC1: number;

	/**
	 * RGB_PVRTC_2BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: number;

	/**
	 * RGB_PVRTC_4BPPV1 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: number;

	/**
	 * RG_BC5 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_RG_BC5: number;

	/**
	 * R_BC4 type texture format
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_FORMAT_R_BC4: number;

	/**
	 * 2D texture type
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_TYPE_2D: number;

	/**
	 * 2D Array texture type
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_TYPE_2D_ARRAY: number;

	/**
	 * Cube map texture type
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_TYPE_CUBE_MAP: number;

	/**
	 * Usage hint for creating textures that uses temporary memory
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_USAGE_FLAG_MEMORYLESS: number;

	/**
	 * Usage hint for creating textures that can be sampled in a shader
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_USAGE_FLAG_SAMPLE: number;

	/**
	 * Usage hint for creating textures that can be used for writing in a shader
	 * @deprecated since v1.9.2
	 */
	export const TEXTURE_USAGE_FLAG_STORAGE: number;
}

declare namespace camera {
	/**
	 * makes camera active
	 * @param url  url of camera component
	 * @deprecated since v1.8.1
	 */
	export function acquire_focus(url: hash | url | string): void;

	/**
	 * deactivate camera
	 * @param url  url of camera component
	 * @deprecated since v1.8.1
	 */
	export function release_focus(url: hash | url | string): void;

	/**
	 * Post this message to a camera-component to activate it.
	 * Several cameras can be active at the same time, but only the camera that was last activated will be used for rendering.
	 * When the camera is deactivated (see `release_camera_focus`), the previously activated camera will again be used for rendering automatically.
	 * The reason it is called "camera focus" is the similarity to how acquiring input focus works (see `acquire_input_focus`).
	 * @deprecated since v1.8.1
	 */
	export type acquire_camera_focus = 'acquire_camera_focus';

	/**
	 * Post this message to a camera-component to deactivate it. The camera is then removed from the active cameras.
	 * See `acquire_camera_focus` for more information how the active cameras are used in rendering.
	 * @deprecated since v1.8.1
	 */
	export type release_camera_focus = 'release_camera_focus';
}

declare namespace gui {
	/**
	 * If an animation of the specified node is currently running (started by `gui.animate`), it will immediately be canceled.
	 * @param node node that should have its animation canceled
	 * @param property property for which the animation should be canceled

	`"position"`
	`"rotation"`
	`"euler"`
	`"scale"`
	`"color"`
	`"outline"`
	`"shadow"`
	`"size"`
	`"fill_angle"` (pie)
	`"inner_radius"` (pie)
	`"leading"` (text)
	`"tracking"` (text)
	`"slice9"` (slice9)

	* @example Start an animation of the position property of a node, then cancel parts of
	the animation:
	```lua
	local node = gui.get_node("my_node")
	-- animate to new position
	local pos = vmath.vector3(100, 100, 0)
	gui.animate(node, "position", pos, go.EASING_LINEAR, 2)
	...
	-- cancel animation of the x component.
	gui.cancel_animation(node, "position.x")
	```
	* @deprecated since v1.11.2. Use `gui.cancel_animations` instead
	* @see {@link https://defold.com/ref/stable/gui/#gui.cancel_animation|API Documentation}
 	*/
	export function cancel_animation(node: node, property: number | string): void;

	/**
	* Get the text metrics from a text node.
	* @deprecated since v1.2.189
	* @param node  text node to measure text from
	* @return metrics  a table with the following fields:
	- width
	- height
	- max_ascent
	- max_descent
	*/
	export function get_text_metrics_from_node(node: node): {
		width: number;
		height: number;
		max_ascent: number;
		max_descent: number;
	};
}

declare namespace vmath {
	/**
	 * The resulting matrix describes the same rotation as the quaternion, but does not have any translation (also like the quaternion).
	 * @param q  quaternion to create matrix from
	 * @returns m  matrix represented by quaternion
	 * @see {@link https://defold.com/ref/stable/vmath/#vmath.matrix4_from_quat|API Documentation}
	 * @deprecated since v1.9.4
	 */
	export function matrix4_from_quat(q: vmath.quaternion): vmath.matrix4;
}
