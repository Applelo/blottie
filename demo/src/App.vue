<script setup lang="ts">
import type { AnimationItem, LottiePlayer } from 'lottie-web'
import { ref } from 'vue'
import { Blottie, type BlottieExpose } from './../../'
import animVueJS from './assets/vue-js.json'

const frame = ref(0)
const animationData = ref(animVueJS)
const blottie = ref<BlottieExpose>()

function onFrame(anim?: AnimationItem) {
  frame.value = Math.round(anim ? anim.currentFrame : 0)
}
function onReady(anim?: AnimationItem | undefined) {
  console.log('READY', anim)
  anim?.play()
}

async function beforeInit(player: LottiePlayer) {
  // eslint-disable-next-line no-console
  console.log('beforeInit', player)
}
</script>

<template>
  <div>
    <h1>Blottie Demo</h1>
    <h2>With Path (Frame {{ frame }})</h2>
    <Blottie
      class="animation"
      path="vue-js.json"
      :before-init="beforeInit"
      :autoplay="true"
      :loop="true"
      renderer="html"
      @enter-frame="onFrame"
    />

    <h2>Distance Animation from LottieFiles</h2>
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

    <h2>Loading from data with controls</h2>
    <Blottie
      ref="blottie"
      class="animation"
      :animation-data="animationData"
      renderer="canvas"
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
</template>
