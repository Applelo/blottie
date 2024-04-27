import type { PropType, SlotsType } from 'vue'
import { defineComponent, h, onUnmounted, ref, watch } from 'vue'
import type { AnimationEventName, LottiePlayer } from 'lottie-web'
import { useBlottie } from './../composables/blottie'
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

export default defineComponent({
  name: 'Blottie',
  emits: ['ready', ...events],
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

    return (props: any) => {
      return h(
        props.containerTag,
        {
          ref: container,
        },
        () => pending.value ? slots.loading : undefined,
      )
    }
  },
})
