import type { AnimationConfigWithData, AnimationConfigWithPath, AnimationItem, LottiePlayer, RendererType } from 'lottie-web'

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

type BlottieEmitEventsData = [
  anim?: AnimationItem,
  lottie?: LottiePlayer,
  container?: HTMLElement,
]

/* eslint-disable ts/consistent-type-definitions */
export type BlottieEmitEvents = {
  ready: BlottieEmitEventsData
  enterFrame: BlottieEmitEventsData
  loopComplete: BlottieEmitEventsData
  complete: BlottieEmitEventsData
  segmentStart: BlottieEmitEventsData
  destroy: BlottieEmitEventsData
  config_ready: BlottieEmitEventsData
  data_ready: BlottieEmitEventsData
  DOMLoaded: BlottieEmitEventsData
  error: BlottieEmitEventsData
  data_failed: BlottieEmitEventsData
  loaded_images: BlottieEmitEventsData
  drawnFrame: BlottieEmitEventsData
}

type AnimationConfigWith<T extends RendererType = 'svg'> = AnimationConfigWithPath<T> & AnimationConfigWithData<T>

type BlottieOptionsPart<T extends BlottiePlayer> = {
  /**
   * Lottie player loaded by Blottie
   *
   * @default 'undefined'
   */
  player?: T
}

type BlottieOptionsSvg = (BlottieOptionsPart<'default'> | BlottieOptionsPart<'svg'> | BlottieOptionsPart<'light'> | BlottieOptionsPart<'worker'>) & AnimationConfigWith<'svg'>

type BlottieOptionsCanvas = (BlottieOptionsPart<'canvas'> | BlottieOptionsPart<'canvas_worker'> | BlottieOptionsPart<'light_canvas'>) & AnimationConfigWith<'canvas'>

type BlottieOptionsHTML = (BlottieOptionsPart<'html'> | BlottieOptionsPart<'light_html'>) & AnimationConfigWith<'html'>

export type LottieOptions = Omit<BlottieOptionsSvg | BlottieOptionsCanvas | BlottieOptionsHTML, 'container'>
