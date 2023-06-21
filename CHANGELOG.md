# Changelog

## v1.3.3

- Update for Defold 1.4.7

## v1.3.2

- Same as v1.3.1, I just forgot to bump the version in package.json

## v1.3.1

- Widened peerDependencies

## v1.3.0

- Replace `any` type with `unknown` in most places
- Describe types `hash`, `node`, and `buffer`
- Describe various constants that are `number`
- Set euler type to `vmath.vector3`
- Set stricter type for `table`: now `object | LuaTable`

## v1.2.21

- Switch from `npm` to `yarn`
- Update `typescript` and `typescript-to-lua` dependencies
- Fix path to `@typescript-to-lua/language-extensions`
- Update shape of `url` type
- Build against Defold 1.4.6