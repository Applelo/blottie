# Blottie

> Lottie for VueJS 3 / Nuxt 3

Blottie is the verb `blottir` in french meaning `snuggle` (yes I was looking for a word to respect the Vue tradition).

## Why?

LottieFiles provides a player named [lottie-player](https://github.com/LottieFiles/lottie-player) but it was not light enought for my need.

## Features

- 🔥 Use all Lottie props
- 🚀 Load the correct renderer : you can't be lighter (with Lottie and SVG renderer 😝)
- ✨ Expose lottie player and lottie animation

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
import type { AnimationItem } from "lottie-web";
import { Blottie } from "blottie";

const blottie = ref<{ anim: AnimationItem }>();

const onFrame = (anim: AnimationItem) => {
  frame.value = Math.round(anim.currentFrame);
};
const onReady = (anim: AnimationItem) => {
  anim.play();
};
</script>

<template>
  <Blottie
    ref="blottie"
    @ready="onReady"
    @frame="onFrame"
    :loop="true"
    renderer="svg"
    path="/my-lottie-anim.json"
  />
</template>
```

**It is recommended to use the renderer option to use the correct version of Lottie.**
If you don't use the renderer prop, it will use the default LottiePlayer which can be a little heavier in size.

> Check the [demo](https://github.com/Applelo/blottie/blob/main/demo/src/App.vue) folder for examples of usage.

### Props

The Blottie component accept all [loadAnimation options](https://github.com/airbnb/lottie-web#other-loading-options). You can pass a Lottie Animation JSON via the `path` prop (relative or absolute link) or directly by importing the json file as an object in the `animation-data` prop.

The additional prop `container-tag` is available to change the default `div` tag container.

### Events

The Blottie component exposes 2 events. The first one, `ready`, allows you to do some action when Lottie is ready to play your animation. The second is `frame`, allowing you to access the event on each frame.

Each events passing an argument `anim` allowing you to control your animation.

```ts
import type { AnimationItem } from "lottie-web";

const onFrame = (anim: AnimationItem) => {
  frame.value = Math.round(anim.currentFrame);
};
```

### Expose LottiePlayer / Anim / Container

You can access to all the Blottie data (lottie player, animation and container) exposed using `ref` attribute on the Blottie component. You can do a custom player for example.

```vue
<script setup lang="ts">
import type { AnimationItem, LottiePlayer } from "lottie-web";
import { ref } from "vue";
import { Blottie } from "blottie";

const blottie = ref<{
  anim: AnimationItem | undefined;
  lottie: LottiePlayer | undefined;
  container: HTMLElement | undefined;
}>();
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
