# Changelog

## v1.10.4

- Update for latest Defold

## v1.10.3

- Update for latest Defold

## v1.10.2

- Update for latest Defold
- Switch from `@ts-defold/type-gen` to `tsd-ext-type-gen`

## v1.10.1

- Update for latest Defold

## v1.10.0

- Update for latest Defold
- Many functions moved to `deprecated.d.ts` this release

## v1.9.8

- Update for latest Defold

## v1.9.7

- Update for latest Defold
- Added missing `liveupdate` API

## v1.9.6

- Update for latest Defold

## v1.9.5

- Update for latest Defold

## v1.9.4

- Update for latest Defold

## v1.9.3

- Update for latest Defold
- Support for type narrowing functions in `types` namespace

## v1.9.2

- Update for latest Defold
- Move deprecated constants into their own file
- Better `socket` types
- Better `jit` types

## v1.9.1

- Update for latest Defold
- Fixed `gui.animate` signature
- Added `@see` documentation comments for each namespace and function
- Added operator map type methods to `vmath`
- Reduced use of `unique symbol` in branded types

## v1.9.0

- Update for latest Defold

## v1.8.1

- Update for latest Defold

## v1.8.0

- Update for latest Defold

## v1.7.0

- Update for latest Defold

## v1.6.4

- Releases now match the same version as Defold

## v1.3.21

- Update for Defold 1.6.4

## v1.3.20

- Add `jit` namespace

## v1.3.19

- Allow `window.set_listener` to accept `undefined`

## v1.3.18

- Supports Defold 1.6.3 (no change)
- Allow `this` value to be `any`

## v1.3.17

- Fix `physics.set_group` and `physics.set_maskbit` not accepting hash values

## v1.3.16

- Add generic message type
- Fix sys.reboot

## v1.3.15

- More detailed constant types
- More accurate return values for certain functions
- More detailed table types
- New types for render scripts
- Describe messages

## v1.3.14

- More detailed types

## v1.3.13

- Updated for Defold 1.6.2
- There are now less than 200 unknown types left to be documented

## v1.3.12

- Updated for Defold 1.6.1

## v1.3.11

- Updated for Defold 1.6.0

## v1.3.10

- Updated for Defold 1.5.0

## v1.3.9

- Fix pprint definition

## v1.3.8

- Updated for Defold 1.4.8
- Described more constants

## v1.3.7

- Update to latest version of `type-gen`
- Update to latest version of `prettier`

## v1.3.6

- Fix return type of sys.load
- Switch some let values to const

## v1.3.5

- Described more types
- Replaced `nil` in comments with `undefined`
- Replaced `self` in comments with `this`
- Replaced `~=` in comments with `!==`
- There are now around 300 unknown types to be documented (down from 500 in v1.2.21)

## v1.3.4

- Described more types
- Replaced last remaining `any` with `unknown`

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
