import type { LottiePlayer, RendererType } from 'lottie-web'
import { BlottiePlayer } from './../typings/blottie'

export default async (renderer?: RendererType, player?: BlottiePlayer) => {
  let lottie: LottiePlayer | null = null
  const playerForRenderers: Record<RendererType, BlottiePlayer> = {
    svg: 'light',
    canvas: 'light_canvas',
    html: 'light_html'
  }

  if (!player && typeof renderer === 'string') {
    player = playerForRenderers[renderer]
  } else {
    player = 'default'
  }

  switch (player) {
    case 'canvas_worker':
      lottie = (await import('lottie-web/build/player/lottie_canvas_worker'))
        .default
      break
    case 'canvas':
      lottie = (await import('lottie-web/build/player/lottie_canvas')).default
      break
    case 'html':
      lottie = (await import('lottie-web/build/player/lottie_light_html'))
        .default
      break
    case 'light_canvas':
      lottie = (await import('lottie-web/build/player/lottie_light_canvas'))
        .default
      break
    case 'light_html':
      lottie = (await import('lottie-web/build/player/lottie_light_html'))
        .default
      break
    case 'light':
      lottie = (await import('lottie-web/build/player/lottie_light')).default
      break
    case 'svg':
      lottie = (await import('lottie-web/build/player/lottie_svg')).default
      break
    case 'worker':
      lottie = (await import('lottie-web/build/player/lottie_worker')).default
      break
    default:
      lottie = (await import('lottie-web/build/player/lottie')).default
      break
  }

  return lottie
}
