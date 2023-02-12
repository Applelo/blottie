import type { AnimationItem, LottiePlayer } from 'lottie-web'

export type BlottiePlayer =
  | 'canvas_worker'
  | 'canvas'
  | 'html'
  | 'light_canvas'
  | 'light_html'
  | 'light'
  | 'svg'
  | 'worker'
  | 'default'

export interface BlottieExpose {
  anim?: AnimationItem
  lottie?: LottiePlayer
  container?: HTMLElement
}
