// @ts-check

/** vmath namespace @satisfies {(string | RegExp)[][]} */
export const vmathChanges = [
	[
		'function vector(t: any): any',
		'function vector(t: number[]): number & { [key: number]: number }',
	],
	[
		'type vector3 = number & {',
		`type vector3 = number & {
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
		`,
	],
	[
		'type vector4 = number & {',
		`type vector4 = number & {
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
		`,
	],
	[
		'type matrix4 = number & {',
		`type matrix4 = number & {
			/**
			 * Multiplication Operator for Matrix4
			 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
			 */
			mul: LuaMultiplicationMethod<vmath.vector4, vmath.vector4> &
			LuaMultiplicationMethod<number, vmath.matrix4>;
			`,
	],
	[
		'type quaternion = number & {',
		`type quaternion = number & {
			/**
			 * Multiplication Operator for Matrix4
			 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
			 */
			mul: LuaMultiplicationMethod<vmath.quaternion, vmath.quaternion>;
			`,
	],
];
