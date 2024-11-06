<script lang="ts" setup>
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: undefined,
  },
});
</script>

<template>
  <div class="_errorPage">
    <div class="_errorCard">
      <BreathingPicture size="156px" @click="$router.push('/')">
        <img alt="Logo" src="/gifs/error.gif" >
      </BreathingPicture>
      <h1>Erreur {{ error!.statusCode }}</h1>
      <p>{{ error!.message ?? error!.statusMessage ?? "" }}</p>
    </div>
  </div>
</template>

<style lang="sass">
._errorPage
  flex-grow: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #000000

  *
    color: #FFFFFF

  > ._errorCard
    display: flex
    flex-direction: column
    justify-content: center
    align-items: stretch
    gap: 32px

    > .BreathingPicture
      align-self: center

    > *
      text-align: center

    > p
      margin-top: -24px
</style>
