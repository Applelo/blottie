<script lang="ts" setup>
import type {
  AnimationEventName,
  AnimationItem,
  AnimationSegment,
  CanvasRendererConfig,
  HTMLRendererConfig,
  LottiePlayer,
  RendererType,
  SVGRendererConfig,
} from 'lottie-web'
import { onMounted, onUnmounted, ref } from 'vue'
import type { BlottieEmitEvents, BlottiePlayer } from '../typings/blottie'
import getPlayer from './../utils/getPlayer'

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
     * Callback before loadAnimation allowing to setLocationHref to fix Safari issue
     *
     * @see https://github.com/airbnb/lottie-web#issues
     * @default 'undefined'
     */
    beforeInit?: (lottie: LottiePlayer) => Promise<void>

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
    audioFactory?: (assetPath: string) => {
      play: () => void
      seek: () => void
      playing: () => void
      rate: () => void
      setVolume: () => void
    }
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
const lottie = ref<LottiePlayer>()
const anim = ref<AnimationItem>()
const pending = ref<boolean>(true)

onMounted(async () => {
  if (!container.value || typeof window === 'undefined')
    return

  lottie.value = await getPlayer(props.renderer, props.player)
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
