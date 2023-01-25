<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type {
  AnimationItem,
  AnimationSegment,
  CanvasRendererConfig,
  HTMLRendererConfig,
  LottiePlayer,
  RendererType,
  SVGRendererConfig,
} from "lottie-web";

const props = withDefaults(
  defineProps<{
    /**
     * Tag of the container
     *
     * @default 'div'
     */
    containerTag?: string;

    // lottie player option
    path?: string;
    data?: string;
    renderer?: RendererType;
    loop?: boolean | number;
    autoplay?: boolean;
    initialSegment?: AnimationSegment;
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

onMounted(async () => {
  if (!container.value) return;

  const lottieImport = props.renderer ? `lottie_${props.renderer}` : "lottie";
  const lottie: LottiePlayer = (
    await import(`lottie-web/build/player/${lottieImport}`)
  ).default;

  const options = {
    container: container.value,
    ...props,
  };

  anim.value = lottie.loadAnimation(options);
  emit("ready", anim.value);

  anim.value.addEventListener("enterFrame", () => {
    emit("frame", anim.value);
  });
});

defineExpose({ anim, lottie });
</script>

<template>
  <component :is="containerTag" ref="container"></component>
</template>
