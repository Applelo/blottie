<script lang="ts" setup>
import type {
  AnimationItem,
  AnimationSegment,
  CanvasRendererConfig,
  HTMLRendererConfig,
  LottiePlayer,
  RendererType,
  SVGRendererConfig,
} from "lottie-web";
import type { BlottiePlayer } from "./../typings/blottie";
import { ref, onMounted } from "vue";
import getPlayer from "./../utils/getPlayer";

const props = withDefaults(
  defineProps<{
    /**
     * Tag of the container
     *
     * @default 'div'
     */
    containerTag?: string;
    /**
     * Lottie player loaded by Blottie
     *
     * @default 'undefined'
     */
    player?: BlottiePlayer;
    /**
     * The relative path to the animation object
     */
    path?: string;
    /**
     * An Object with the exported animation data.
     */
    animationData?: any;
    /**
     * 'svg' / 'canvas' / 'html' to set the renderer
     */
    renderer?: RendererType;
    loop?: boolean | number;
    /**
     * Start playing as soon as it is ready
     */
    autoplay?: boolean;
    initialSegment?: AnimationSegment;
    /**
     * Animation name for future reference
     */
    name?: string;
    assetsPath?: string;
    rendererSettings?: {
      svg: SVGRendererConfig;
      canvas: CanvasRendererConfig;
      html: HTMLRendererConfig;
    }[RendererType];
    audioFactory?(assetPath: string): {
      play(): void;
      seek(): void;
      playing(): void;
      rate(): void;
      setVolume(): void;
    };
  }>(),
  {
    containerTag: "div",
  }
);
const emit = defineEmits(["frame", "ready"]);

const container = ref<HTMLElement>();
const lottie = ref<LottiePlayer>();
const anim = ref<AnimationItem>();
const pending = ref<boolean>(true);

onMounted(async () => {
  if (!container.value) return;

  lottie.value = await getPlayer(props.renderer, props.player);

  const options = {
    container: container.value,
    ...props,
  };

  anim.value = lottie.value.loadAnimation(options);
  emit("ready", anim.value);
  pending.value = false;

  anim.value.addEventListener("enterFrame", () => {
    emit("frame", anim.value);
  });
});

defineExpose({ anim, lottie, container });
</script>

<template>
  <component :is="containerTag" ref="container">
    <slot v-if="pending" name="loading" />
  </component>
</template>
