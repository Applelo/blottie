import type { AnimationEventName, AnimationItem, LottiePlayer } from 'lottie-web'

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

export type BlottieEmitEvents = Record<AnimationEventName | 'ready', [
  anim?: AnimationItem,
  lottie?: LottiePlayer,
  container?: HTMLElement,
]>

// export interface BlottieOptions {
//   /**
//    * Lottie player loaded by Blottie
//    *
//    * @default 'undefined'
//    */
//   player?: BlottiePlayer
//   /**
//    * Callback before loadAnimation allowing to setLocationHref to fix Safari issue
//    *
//    * @see https://github.com/airbnb/lottie-web#issues
//    * @default 'undefined'
//    */
//   beforeInit?: (lottie: LottiePlayer) => Promise<void>
// }
