# Blottie

> Lottie for VueJS 3 / Nuxt 3

Blottie is the verb `blottir` in french meaning `snuggle` (yes I was looking for a word to respect the Vue tradition ^^).

## Why?

LottieFiles provides a player named [lottie-player](https://github.com/LottieFiles/lottie-player) but it was not light enought for my need.

## Features

- 🔥 Use all Blottie parameters
- 🚀 Load the correct renderer : you can't be lighter (with Lottie and SVG renderer 😝)
- ✨ Expose lottie and lottie animation

## Installation

```shell
npm i -D blottie

# yarn
yarn add -D blottie

# pnpm
pnpm add -D blottie
```

## Usage

```vue
<script setup lang="ts">
import { Blottie } from "blottie";

const blottie = ref<{ anim: AnimationItem }>();
</script>

<template>
  <Blottie ref="blottie" @ready="onReady" @frame="onFrame" />
</template>
```
