<script setup lang="ts">
import type { AnimationItem, LottiePlayer } from 'lottie-web'
import { ref } from 'vue'
import { Blottie, type BlottieExpose, useBlottie } from 'blottie'
import animVueJS from './assets/vue-js.json'

const frame = ref(0)
const animationData = ref(animVueJS)
const blottie = ref<BlottieExpose>()
const composableEl = ref<HTMLElement | null>(null)

function onFrame(anim?: AnimationItem) {
  frame.value = Math.round(anim ? anim.currentFrame : 0)
}
function onReady(anim?: AnimationItem | undefined) {
  anim?.play()
}

async function beforeInit(player: LottiePlayer) {
  // eslint-disable-next-line no-console
  console.log('beforeInit', player)
}

async function onLoop() {
  // eslint-disable-next-line no-console
  console.log('loop')
}

useBlottie(
  composableEl,
  {
    path: 'vue-js.json',
    autoplay: true,
    renderer: 'svg',
    loop: true,
  },
)
</script>

<template>
  <div>
    <h1>Blottie Demo</h1>

    <div>
      <h2>With Path (Frame {{ frame }})</h2>
      <Blottie
        class="animation"
        :lottie="{
          path: 'vue-js.json',
          autoplay: true,
          renderer: 'html',
          loop: true,
        }"
        :before-init="beforeInit"
        @enter-frame="onFrame"
      />
    </div>

    <div>
      <h2>Distance Animation from LottieFiles</h2>
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
    </div>

    <div>
      <h2>Loading from data with controls</h2>
      <Blottie
        ref="blottie"
        class="animation"
        :lottie="{
          renderer: 'canvas',
          animationData,
        }"
      />
      <div v-if="blottie && blottie.anim" class="controls">
        <progress
          :value="blottie.anim?.currentFrame"
          :max="blottie.anim?.totalFrames"
        />
        <button @click="blottie?.anim?.play()">
          Play
        </button>
        <button @click="blottie?.anim?.pause()">
          Pause
        </button>
        <button @click="blottie?.anim?.stop()">
          Stop
        </button>
        <button
          @click="
            blottie?.anim?.setDirection(
              blottie?.anim?.playDirection === -1 ? 1 : -1,
            )
          "
        >
          Reverse
        </button>
      </div>
    </div>

    <div>
      <h2>Using useBlottie Composable</h2>
      <div ref="composableEl" class="animation" />
    </div>
  </div>
</template>
