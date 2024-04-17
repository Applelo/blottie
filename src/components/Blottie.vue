<script lang="ts" setup>
import type { AnimationEventName, LottiePlayer } from 'lottie-web'
import { onUnmounted, ref, watch } from 'vue'
import type { BlottieEmitEvents, LottieOptions } from '../typings/blottie'
import { useBlottie } from '@/composables/blottie'

const props = withDefaults(
  defineProps<{
    /**
     * Tag of the container
     *
     * @default 'div'
     */
    containerTag?: string
    /**
     * Callback before loadAnimation allowing to setLocationHref to fix Safari issue
     *
     * @see https://github.com/airbnb/lottie-web#issues
     * @default 'undefined'
     */
    beforeInit?: (lottie: LottiePlayer) => Promise<void>
    lottie: LottieOptions
  }>(),
  {
    containerTag: 'div',
  },
)

const emit = defineEmits<BlottieEmitEvents>()

const events: AnimationEventName[] = [
  'enterFrame',
  'loopComplete',
  'complete',
  'segmentStart',
  'destroy',
  'config_ready',
  'data_ready',
  'DOMLoaded',
  'error',
  'data_failed',
  'loaded_images',
  'drawnFrame',
]

const container = ref<HTMLElement>()
const { lottie, anim } = useBlottie(container, props.lottie)
const pending = ref<boolean>(true)

watch(lottie, async () => {
  if (!container.value || !lottie.value || !pending.value)
    return

  if (props.beforeInit)
    await props.beforeInit(lottie.value)

  emit('ready', anim.value, lottie.value, container.value)
  pending.value = false

  events.forEach((event) => {
    anim.value?.addEventListener(event, () => {
      emit(event as any, anim.value, lottie.value, container.value)
    })
  })
})

onUnmounted(() => {
  anim.value?.destroy()
  lottie.value?.destroy()
})

defineExpose({ anim, lottie, container })
</script>

<template>
  <component :is="containerTag" ref="container">
    <slot v-if="pending" name="loading" />
  </component>
</template>
