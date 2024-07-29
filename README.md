<img src="_docs/defold-types.png" alt="Defold Types">

# TS-Defold Types II

[![CI](https://github.com/thinknathan/ts-defold-types/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknathan/ts-defold-types/actions/workflows/ci.yml) ![GitHub License](https://img.shields.io/github/license/thinknathan/ts-defold-types) <a href="https://discord.gg/eukcq5m"><img alt="Chat with us!" src="https://img.shields.io/discord/766898804896038942.svg?colorB=7581dc&logo=discord&logoColor=white"></a>

> TypeScript definitions for [Defold](https://defold.com/), a high-performance cross-platform game engine.

## This Fork

This fork has more detailed types than the origin repo. Hand-written patches replace many of the `any` keywords with specific types, sets constant values to use `const`, etc. See the changelog for details.

This repo can be used as a drop-in replacement of the original.

## Installation

1. Uninstall `@ts-defold/types`

2. Get this package from Github

```bash
yarn add git+https://git@github.com/thinknathan/ts-defold-types.git#^1.3.0 -D
# or
npm install git+https://git@github.com/thinknathan/ts-defold-types.git#^1.3.0 --save-dev
# or
pnpm install git+https://git@github.com/thinknathan/ts-defold-types.git -D
```

<p align="center" class="h4">
  TypeScript :heart: Defold
</p>
