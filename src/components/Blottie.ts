import type { PropType, SlotsType } from 'vue'
import { defineComponent, h, onUnmounted, ref, watch } from 'vue'
import type { AnimationEventName, AnimationItem, LottiePlayer } from 'lottie-web'
import { useBlottie } from '../composables/useBlottie'
import type { LottieOptions } from './../typings/blottie'

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

/**
 * Blottie Component using lottie loadAnimation under the hood
 *
 * @since 1.0.0
 * @see https://github.com/Applelo/blottie?tab=readme-ov-file#component
 * @see http://airbnb.io/lottie/#/web?id=usage
 */
export default defineComponent({
  name: 'Blottie',
  /* eslint-disable unused-imports/no-unused-vars */
  emits: {
    ready: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    enterFrame: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    loopComplete: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    complete: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    segmentStart: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    destroy: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    config_ready: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    data_ready: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    DOMLoaded: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    error: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    data_failed: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    loaded_images: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
    drawnFrame: (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => {
      return true
    },
  } satisfies Record<AnimationEventName | 'ready', (anim?: AnimationItem, lottie?: LottiePlayer, container?: HTMLElement) => true>,
  /* eslint-enable unused-imports/no-unused-vars */
  props: {
    /**
     * Tag of the container
     *
     * @default 'div'
     */
    containerTag: {
      type: String,
      default: 'div',
      required: false,
    },
    /**
     * Callback before loadAnimation allowing to setLocationHref to fix Safari issue
     *
     * @see https://github.com/airbnb/lottie-web#issues
     * @default 'undefined'
     */
    beforeInit: {
      type: Function as PropType<(lottie: LottiePlayer) => Promise<void>>,
      default: undefined,
      required: false,
    },
    /**
     * Lottie Options
     */
    lottie: {
      type: Object as PropType<LottieOptions>,
      required: true,
    },
  },
  slots: Object as SlotsType<{
    loading: any
  }>,
  setup: (props, { slots, emit, expose }) => {
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

    expose({ anim, lottie, container })

    const loadingSlot = () => {
      if (slots.loading && pending.value)
        return slots.loading()
      return null
    }

    return (props: any) => {
      return h(
        props.containerTag,
        {
          ref: container,
        },
        loadingSlot(),
      )
    }
  },
})
