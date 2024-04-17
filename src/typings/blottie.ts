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

/* eslint-disable ts/consistent-type-definitions */
export type BlottieEmitEvents = {
  ready: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  enterFrame: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  loopComplete: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  complete: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  segmentStart: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  destroy: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  config_ready: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  data_ready: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  DOMLoaded: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  error: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  data_failed: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  loaded_images: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
  drawnFrame: [
    anim?: AnimationItem,
    lottie?: LottiePlayer,
    container?: HTMLElement,
  ]
}

type AnimationConfigWith<T extends RendererType = 'svg'> = AnimationConfigWithPath<T> | AnimationConfigWithData<T>

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
