import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import type {
  AnimationItem,
  LottiePlayer,
  RendererType,
} from 'lottie-web'
import type { BlottieOptions } from '../typings/blottie'
import getPlayer from './../utils/getPlayer'

export function useBlottie(
  container: Ref<HTMLElement | null | undefined>,
  opts: BlottieOptions
) {
  const lottie = ref<LottiePlayer>()
  const anim = ref<AnimationItem>()

  onMounted(async () => {
    if (!container.value || typeof window === 'undefined')
      return

    let renderer: RendererType = 'svg'
    if ('renderer' in opts && opts.renderer)
      renderer = opts.renderer

    lottie.value = await getPlayer(renderer, opts.player)
    anim.value = lottie.value.loadAnimation(opts as any)
  })

  onUnmounted(() => {
    anim.value?.destroy()
    lottie.value?.destroy()
  })

  return { anim, lottie }
}
