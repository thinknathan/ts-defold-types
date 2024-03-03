<img src="_docs/defold-types.png" alt="Defold Types">

# Defold Types

[![CI](https://github.com/thinknathan/ts-defold-types/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknathan/ts-defold-types/actions/workflows/ci.yml) ![GitHub License](https://img.shields.io/github/license/thinknathan/ts-defold-types) <a href="https://discord.gg/eukcq5m"><img alt="Chat with us!" src="https://img.shields.io/discord/766898804896038942.svg?colorB=7581dc&logo=discord&logoColor=white"></a>

> TypeScript definitions for [Defold](https://defold.com/), a high-performance cross-platform game engine.

## This Fork

This fork has more detailed types than the origin repo. My hand-written patch replaces many of the `any` keywords with specific types, sets constant values to use `const`, etc. See the changelog for details.

Can be used as a drop-in replacement of the original.

## Installation

1. Get this package from Github

```bash
yarn add git+https://git@github.com/thinknathan/ts-defold-types.git#^1.3.0 -D
# or
npm install git+https://git@github.com/thinknathan/ts-defold-types.git#^1.3.0 --save-dev
```

2. Modify your `tsconfig.json`

```diff
{
  "compilerOptions": {
+    "typeRoots": ["./node_modules/@ts-defold"],
+    "types": ["types"]
  }
}
```

### Shoutouts 📢

[@dasannikov](https://github.com/dasannikov) and [DefoldTypescript](https://github.com/dasannikov/DefoldTypeScript) for a starting point and inspiration
[TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) for the awesome community and tools
[@hazzard993](https://github.com/hazzard993), [@ark120202](https://github.com/ark120202), [@Perryvw](https://github.com/Perryvw) and all the fine folks over on the [tstl discord server](https://discord.gg/BWAq58Y).

<p align="center" class="h4">
  TypeScript :heart: Defold
</p>
