<script setup lang="ts">
import type { AnimationItem, LottiePlayer } from 'lottie-web'
import { ref } from 'vue'
import { Blottie, type BlottieExpose } from './../..'
import animVueJS from './assets/vue-js.json'

const frame = ref(0)
const animationData = ref(animVueJS)
const blottie = ref<BlottieExpose>()

const onFrame = (anim?: AnimationItem) => {
  frame.value = Math.round(anim ? anim.currentFrame : 0)
}
const onReady = (anim?: AnimationItem | undefined) => {
  anim?.play()
}

const beforeInit = async (player: LottiePlayer) => {
  console.log(player)
}
</script>

<template>
  <div>
    <h1>Blottie Demo</h1>
    <h2>With Path (Frame {{ frame }})</h2>
    <Blottie
      class="animation"
      path="vue-js.json"
      @enter-frame="onFrame"
      :before-init="beforeInit"
      :autoplay="true"
      :loop="true"
      renderer="html"
    />

    <h2>Distance Animation from LottieFiles</h2>
    <Blottie
      class="animation"
      path="https://assets6.lottiefiles.com/packages/lf20_bXGMKilbSf.json"
      @ready="onReady"
      :loop="true"
      container-tag="main"
    >
      <template #loading> Loading... </template>
    </Blottie>

    <h2>Loading from data with controls</h2>
    <Blottie
      class="animation"
      :animation-data="animationData"
      ref="blottie"
      renderer="canvas"
    />
    <div class="controls" v-if="blottie && blottie.anim">
      <progress
        :value="blottie.anim?.currentFrame"
        :max="blottie.anim?.totalFrames"
      />
      <button @click="blottie?.anim?.play()">Play</button>
      <button @click="blottie?.anim?.pause()">Pause</button>
      <button @click="blottie?.anim?.stop()">Stop</button>
      <button
        @click="
          blottie?.anim?.setDirection(
            blottie?.anim?.playDirection === -1 ? 1 : -1
          )
        "
      >
        Reverse
      </button>
    </div>
  </div>
</template>
