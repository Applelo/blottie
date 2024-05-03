[![npm](https://img.shields.io/npm/v/blottie)](https://www.npmjs.com/package/blottie) [![node-current](https://img.shields.io/node/v/blottie)](https://nodejs.org/) [![Blottie](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/k3qz2d/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/k3qz2d/runs)

# Blottie

> Lottie component for Vue 3 / Nuxt 3

Blottie is the verb `blottir` in french meaning `snuggle` (yes I was looking for a word to respect the Vue tradition).

## Features

- 🔥 Integrated to VueJS with all Lottie `loadAnimations` [options](https://github.com/airbnb/lottie-web#other-loading-options) and [events](https://github.com/airbnb/lottie-web#events)
- 😎 Available through `Blottie` component or `useBlottie` composable.
- 🚀 Load automatically the best renderer: you can't be lighter
- 📠 Fully typed
- ✨ Expose lottie player/animation for more control and customization

## Installation

```shell
npm i -D blottie

# yarn
yarn add -D blottie

# pnpm
pnpm add -D blottie

#bun
bun add -D blottie
```

## Usage

### Component

```vue
<script setup lang="ts">
import type { AnimationItem } from 'lottie-web'
import { Blottie, type BlottieExpose } from 'blottie'

const blottie = ref<BlottieExpose>()

function onFrame(anim?: AnimationItem) {
  frame.value = Math.round(anim ? anim.currentFrame : 0)
}
function onReady(anim?: AnimationItem) {
  anim?.play()
}
</script>

<template>
  <Blottie
    ref="blottie"
    :lottie="{
      loop: true,
      renderer: 'svg',
      path: '/my-lottie-anim.json',
    }"
    @ready="onReady"
    @enter-frame="onFrame"
  />
</template>
```

**It is recommended to use the renderer option to use the correct version of Lottie to reduce the size of Lottie.**
If you don't use the renderer prop, it will use the default LottiePlayer which can be a little heavier in size. The lighter option provided by Lottie is the `light` version which is loaded when you set the `svg` renderer.

> Check the [demo](https://github.com/Applelo/blottie/blob/main/demo/src/App.vue) folder for examples of usage.

### Props

The Blottie component accepts all [loadAnimation options](https://github.com/airbnb/lottie-web#other-loading-options) through `lottie` prop. You can pass a Lottie Animation JSON via the `path` option (relative or absolute link) or directly by importing the json file as an object in the `animationData` option.

By default, Blottie will load the lighter version (`light`) of Lottie for the renderer you choose. If necessary, you can enforce the lottie player with the `player` option (inside the `lottie` prop) : `canvas_worker`, `canvas`, `light_canvas`, `html`, `light_html`, `light`, `svg`, `worker` or `default`.

```vue
<script lang="ts" setup>
import { Blottie } from 'blottie'
</script>

<template>
  <Blottie
    :lottie="{
      player: 'svg',
      renderer: 'svg',
      path: '/my-lottie-anim.json',
    }"
  />
</template>
```

If needed, you can access the lottie player before the lottie `loadAnimation` method. You can use the `before-init` prop allowing you to pass an asynchrone callback with the player as an argument (check the example below).

> This is necessary for allowing to use `setLocationHref` to [fix Safari issue](https://github.com/airbnb/lottie-web#issues).

```vue
<script setup lang="ts">
import type { LottiePlayer } from 'lottie-web'
import { Blottie } from 'blottie'

async function beforeInit(player: LottiePlayer) {
  console.log(player)
}
</script>

<template>
  <div>
    <Blottie
      class="animation"
      :before-init="beforeInit"
      :lottie="{
        path: 'vue-js.json',
        autoplay: true,
      }"
    />
  </div>
</template>
```

An additional prop `container-tag` is available to change the default `div` tag container.

```vue
<script lang="ts" setup>
import { Blottie } from 'blottie'
</script>

<template>
  <Blottie
    container-tag="main"
    :lottie="{
      renderer: 'svg',
      path: '/my-lottie-anim.json',
    }"
  />
</template>
```

### Events

The Blottie component exposes all [lottie events](https://github.com/airbnb/lottie-web#events). On each events, you can access to `anim` allowing you to control your animation, `lottie` to control the player and the HTML `container`.

```ts
import type { AnimationItem, LottiePlayer } from 'lottie-web'

function onFrame(anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) {
  frame.value = Math.round(anim ? anim.currentFrame : 0)
}
```

### Expose LottiePlayer / Anim / Container

You can access to all the Blottie data (lottie player, animation and container) exposed using `ref` attribute on the Blottie component. You can do a custom player for example.

```vue
<script setup lang="ts">
import type { AnimationItem, LottiePlayer } from 'lottie-web'
import { ref } from 'vue'
import { Blottie, type BlottieExpose } from 'blottie'

const blottie = ref<BlottieExpose>()
</script>

<template>
  <div>
    <Blottie
      ref="blottie"
      class="animation"
      :lottie="{
        animationData: 'animationData',
        renderer: 'canvas',
      }"
    />
    <div v-if="blottie && blottie.anim" class="controls">
      <progress
        :value="blottie.anim.currentFrame"
        :max="blottie.anim.totalFrames"
      />
      <button @click="blottie?.anim.play()">
        Play
      </button>
      <button @click="blottie?.anim.pause()">
        Pause
      </button>
      <button @click="blottie?.anim.stop()">
        Stop
      </button>
      <button
        @click="
          blottie?.anim.setDirection(
            blottie?.anim.playDirection === -1 ? 1 : -1,
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
<script lang="ts" setup>
import { Blottie } from 'blottie'
</script>

<template>
  <Blottie
    :lottie="{
      autoplay: true,
      loop: true,
      path: '/my-lottie-anim.json',
    }"
  >
    <template #loading>
      Loading...
    </template>
  </Blottie>
</template>
```

### Composable

Since 2.0, you can use the composable `useBlottie`. This allowing you full control to create a custom component if  you need it.

The first argument is a [template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs).
The second argument is an object accepting all [loadAnimation options](https://github.com/airbnb/lottie-web#other-loading-options).

```vue
<script setup lang="ts">
import { useBlottie } from 'blottie'
const el = ref<HTMLElement | null>(null)
const { lottie, anim } = useBlottie(el, {
  player: 'svg',
  renderer: 'svg',
  path: '/my-lottie-anim.json',
})
</script>

<template>
  <div>
    <div ref="el" class="blottie" />
    <button @click="lottie.play()">
      Play
    </button>
  </div>
</template>
```

## Migration from 1.0 to 2.0

All Lottie options are now move into `lottie` attribute to use typings from lottie (and not a version provided by Blottie).

For example, if you have this
```vue
<template>
  <Blottie
    class="animation"
    path="https://assets6.lottiefiles.com/packages/lf20_bXGMKilbSf.json"
    :loop="true"
    container-tag="main"
    @ready="onReady"
  >
    <template #loading>
      Loading...
    </template>
  </Blottie>
</template>
```

This will be change to this
```vue
<template>
  <Blottie
    class="animation"
    :lottie="{
      loop: true,
      path: 'https://assets6.lottiefiles.com/packages/lf20_bXGMKilbSf.json',
    }"
    container-tag="main"
    @ready="onReady"
    @loop-complete="onLoop"
  >
    <template #loading>
      Loading...
    </template>
  </Blottie>
</template>
```

## Why?

Lottie is a great library allowing designer to make an animation on after effects and export it to the web.

> If you don't know what is lottie, check the [official website](https://airbnb.io/lottie/#/).

But the integration is not easy on VueJS and I needed one for a company project. So I was looking for a VueJS 3 library.

LottieFiles provides a player named [lottie-player](https://github.com/LottieFiles/lottie-player) but it was not light enought for my need and It was not customizable enough : if you don't find suitable for you need, make your own component 🤓

## 👨‍💼 Licence

MIT
