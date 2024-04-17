import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { Ref } from 'vue'
import type {
  AnimationItem,
  LottiePlayer,
  RendererType,
} from 'lottie-web'
import getPlayer from './../utils/getPlayer'
import { LottieOptions } from '@/typings/blottie'

export function useBlottie(
  container: Ref<HTMLElement | null | undefined>,
  opts: LottieOptions
) {
  const lottie = shallowRef<LottiePlayer>()
  const anim = shallowRef<AnimationItem>()

  onMounted(async () => {
    if (!container.value || typeof window === 'undefined')
      return

    let renderer: RendererType = 'svg'
    if ('renderer' in opts && opts.renderer)
      renderer = opts.renderer

    lottie.value = await getPlayer(renderer, opts.player)
    anim.value = lottie.value.loadAnimation({
      container: container.value,
      ...opts
    })
  })

  onUnmounted(() => {
    anim.value?.destroy()
    lottie.value?.destroy()
  })

  return { anim, lottie }
}
