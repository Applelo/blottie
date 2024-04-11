<script lang="ts" setup>
import type { AnimationEventName } from 'lottie-web'
import { onUnmounted, ref, watch } from 'vue'
import type { BlottieEmitEvents, BlottieOptionsComponent } from '../typings/blottie'
import { useBlottie } from './../composables/blottie'

const props = withDefaults(
  defineProps<BlottieOptionsComponent>(),
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
const { lottie, anim } = useBlottie(container, props as any)
const pending = ref<boolean>(true)

watch(lottie, async () => {
  if (!container.value || !lottie.value)
    return

  if (props.beforeInit)
    await props.beforeInit(lottie.value)

  const options = {
    container: container.value,
    ...props,
  }

  anim.value = lottie.value.loadAnimation(options)
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
