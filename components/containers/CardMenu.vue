<script lang="ts" setup>
import TextButton from "~/components/TextButton.vue";
import { ref } from "vue";
import { animationService } from "assets/code/animations/animations.service";

const ANIM_DURATION = "0.33s";
const ANIM_CLASS = "away";

const emit = defineEmits(["hide"]);

const backgroundRef = ref(null);
const cardRef = ref(null);

const animate = () =>
  animationService
    .animateStep([backgroundRef.value, cardRef.value], {
      duration: ANIM_DURATION,
      classTag: ANIM_CLASS,
      callback: () => emit("hide"),
    })
    .then();
</script>

<template>
  <div ref="backgroundRef" class="CardBackground" @keydown.esc="animate()">
    <div ref="cardRef">
      <div class="CardTitle">
        <slot name="title" />
      </div>
      <slot />
    </div>
    <TextButton @click="animate()">
      <img alt="Back" src="/icons/back.svg" />
      <p>Retour</p>
    </TextButton>
  </div>
</template>

<style lang="sass">
.CardBackground
  z-index: 99
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  flex-direction: column
  animation: BackgroundIn ease-in-out v-bind(ANIM_DURATION)
  backdrop-filter: var(--blur)
  padding: 24px

  @media (min-width: 801px)
    justify-content: center
    align-items: center
    gap: 24px

    > div:first-of-type
      width: 500px

  @media (max-width: 800px)
    padding: 16px
    justify-content: end
    align-items: stretch

  &.away
    animation: BackgroundOut ease-in-out v-bind(ANIM_DURATION)

  > div:first-of-type
    padding: 32px
    background: var(--widget)
    display: flex
    flex-direction: column
    gap: 32px
    align-items: stretch
    justify-content: start
    animation: CardIn ease-in-out v-bind(ANIM_DURATION)
    border-radius: var(--radius-med )

    &.away
      animation: CardOut ease-in-out v-bind(ANIM_DURATION)

    > h4
      opacity: 0.66
      margin-bottom: -20px

    > p
      text-align: center
      font-size: 0.9em
      opacity: 0.66
      padding: 0 8%

      &:before
        content: "💡 "

    > .TextButton
      align-self: center

.CardTitle
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 2px

  > *
    text-align: center

  > p
    opacity: 0.66

  > b
    color: var(--active)

  > img
    height: 56px
    margin-bottom: 10px
</style>
