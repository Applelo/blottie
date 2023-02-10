# Blottie

> Lottie component for VueJS 3 / Nuxt 3

Blottie is the verb `blottir` in french meaning `snuggle` (yes I was looking for a word to respect the Vue tradition).

## Why?

Lottie is a great library allowing designer to make an animation on after effects and export it to the web.

> If you don't know what is lottie, check the [official website](https://airbnb.io/lottie/#/).

But the integration is not easy on VueJS and I needed one for a company project. So I was looking for a VueJS 3 library.

LottieFiles provides a player named [lottie-player](https://github.com/LottieFiles/lottie-player) but it was not light enought for my need and It was not customizable enough. If you don't find suitable for you need, make your own component 🤓

## Features

- 🔥 Integrated in VueJS with all Lottie `loadAnimations` options
- 🚀 Load the correct renderer : you can't be lighter
- ✨ Expose lottie player and lottie animation for more control and customization

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
import type { AnimationItem } from 'lottie-web'
import { Blottie } from 'blottie'

const blottie = ref<{ anim: AnimationItem }>()

const onFrame = (anim: AnimationItem) => {
  frame.value = Math.round(anim.currentFrame)
}
const onReady = (anim: AnimationItem) => {
  anim.play()
}
</script>

<template>
  <Blottie
    ref="blottie"
    @ready="onReady"
    @enter-frame="onFrame"
    :loop="true"
    renderer="svg"
    path="/my-lottie-anim.json"
  />
</template>
```

**It is recommended to use the renderer option to use the correct version of Lottie to reduce the size of Lottie.**
If you don't use the renderer prop, it will use the default LottiePlayer which can be a little heavier in size. The lighter option provided by Lottie is the `svg` one.

> Check the [demo](https://github.com/Applelo/blottie/blob/main/demo/src/App.vue) folder for examples of usage.

### Props

The Blottie component accepts all [loadAnimation options](https://github.com/airbnb/lottie-web#other-loading-options). You can pass a Lottie Animation JSON via the `path` prop (relative or absolute link) or directly by importing the json file as an object in the `animation-data` prop.

By default, Blottie will load the lighter version of Lottie for the renderer you choose. If necessary, you can enforce the lottie player with the `player` option : `canvas_worker`, `canvas`, `light_canvas`, `html`, `light_html`, `light`, `svg`, `worker` or `default`.

An additional prop `container-tag` is available to change the default `div` tag container.

### Events

The Blottie component exposes all [lottie events](https://github.com/airbnb/lottie-web#events). On each events, you can access to `anim` allowing you to control your animation, `lottie` to control the player and the HTML `container`.

```ts
import type { AnimationItem, LottiePlayer } from 'lottie-web'

const onFrame = (
  anim?: AnimationItem,
  lottie?: LottiePlayer,
  container?: HTMLElement
) => {
  frame.value = Math.round(anim ? anim.currentFrame : 0)
}
```

### Expose LottiePlayer / Anim / Container

You can access to all the Blottie data (lottie player, animation and container) exposed using `ref` attribute on the Blottie component. You can do a custom player for example.

```vue
<script setup lang="ts">
import type { AnimationItem, LottiePlayer } from 'lottie-web'
import { ref } from 'vue'
import { Blottie } from 'blottie'

const blottie = ref<{
  anim: AnimationItem | undefined
  lottie: LottiePlayer | undefined
  container: HTMLElement | undefined
}>()
</script>

<template>
  <div>
    <Blottie
      class="animation"
      :animation-data="animationData"
      ref="blottie"
      renderer="canvas"
    />
    <div class="controls" v-if="blottie && blottie.anim">
      <progress
        :value="blottie.anim.currentFrame"
        :max="blottie.anim.totalFrames"
      />
      <button @click="blottie?.anim.play()">Play</button>
      <button @click="blottie?.anim.pause()">Pause</button>
      <button @click="blottie?.anim.stop()">Stop</button>
      <button
        @click="
          blottie?.anim.setDirection(
            blottie?.anim.playDirection === -1 ? 1 : -1
          )
        "
      >
        Reverse
      </button>
    </div>
  </div>
</template>
```

### Slot

You can use the slot `loading` to insert content inside the container to wait the display like a temporary fallback.

```vue
<template>
  <Blottie :autoplay="true" :loop="true" path="/my-lottie-anim.json">
    <template #loading>Loading...</template>
  </Blottie>
</template>
```
