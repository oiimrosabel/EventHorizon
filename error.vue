<script lang="ts" setup>
import { ref } from "vue";
import type { NuxtError } from "#app";
import { themeService } from "@/assets/code/theme/theme.service";

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: undefined,
  },
});

const splashRef = ref(false);

useNuxtApp().hook("app:mounted", () => {
  setTimeout(() => (splashRef.value = true), 750);
});
</script>

<template>
  <div class="Error">
    <div class="ErrorCard">
      <BreathingPicture size="156px" @click="$router.push('/')">
        <img alt="Logo" src="/images/error.svg" />
      </BreathingPicture>
      <h1>Erreur {{ error!.statusCode }}</h1>
      <p>{{ error?.statusMessage }}</p>
    </div>
  </div>
</template>

<style lang="sass">
.Error
  flex-grow: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #000000

  *
    color: #FFFFFF

  > .ErrorCard
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
