<script lang="ts" setup>
import type {
  AnimationItem,
  AnimationSegment,
  AnimationEventName,
  CanvasRendererConfig,
  HTMLRendererConfig,
  LottiePlayer,
  RendererType,
  SVGRendererConfig
} from 'lottie-web'
import type { BlottiePlayer } from './../typings/blottie'
import { ref, onMounted, onUnmounted } from 'vue'
import getPlayer from './../utils/getPlayer'

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
  //@ts-ignore exists on lottie player but not in the typescript definition
  'drawnFrame'
]

const props = withDefaults(
  defineProps<{
    /**
     * Tag of the container
     *
     * @default 'div'
     */
    containerTag?: string
    /**
     * Lottie player loaded by Blottie
     *
     * @default 'undefined'
     */
    player?: BlottiePlayer
    /**
     * The relative path to the animation object
     */
    path?: string
    /**
     * An Object with the exported animation data.
     */
    animationData?: any
    /**
     * 'svg' / 'canvas' / 'html' to set the renderer
     */
    renderer?: RendererType
    loop?: boolean | number
    /**
     * Start playing as soon as it is ready
     */
    autoplay?: boolean
    initialSegment?: AnimationSegment
    /**
     * Animation name for future reference
     */
    name?: string
    assetsPath?: string
    rendererSettings?: {
      svg: SVGRendererConfig
      canvas: CanvasRendererConfig
      html: HTMLRendererConfig
    }[RendererType]
    audioFactory?(assetPath: string): {
      play(): void
      seek(): void
      playing(): void
      rate(): void
      setVolume(): void
    }
  }>(),
  {
    containerTag: 'div'
  }
)

const emit = defineEmits<{
  (
    event: 'ready',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'enterFrame',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'loopComplete',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'complete',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'segmentStart',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'destroy',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'config_ready',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'data_ready',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'DOMLoaded',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'error',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'data_failed',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'loaded_images',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
  (
    event: 'drawnFrame',
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement
  ): void
}>()

const container = ref<HTMLElement>()
const lottie = ref<LottiePlayer>()
const anim = ref<AnimationItem>()
const pending = ref<boolean>(true)

onMounted(async () => {
  if (!container.value || typeof window === 'undefined') return

  lottie.value = await getPlayer(props.renderer, props.player)

  const options = {
    container: container.value,
    ...props
  }

  anim.value = lottie.value.loadAnimation(options)
  emit('ready', anim.value, lottie.value, container.value)
  pending.value = false

  for (const lottieEvent in events) {
    if (Object.prototype.hasOwnProperty.call(events, lottieEvent)) {
      const event = events[lottieEvent]
      anim.value.addEventListener(lottieEvent as AnimationEventName, () => {
        // @ts-ignore
        emit(event, anim.value, lottie.value, container.value)
      })
    }
  }
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
