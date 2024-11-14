<script lang="ts" setup>
import type { NuxtError } from "#app";
import { formatService } from "~/services/format/format.service";

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: undefined,
  },
});

const $router = useRouter();
const $splash = useSplash();

useHeadSafe({
  title: formatService.formatTitle(`Erreur ${props.error!.statusCode}`),
});

const goToIndex = () =>
  $splash.fadeIn(() => {
    $router.push("/").then(() => $splash.fadeOut());
  });
</script>

<template>
  <div class="_errorPage">
    <div class="_errorCard">
      <BreathingPicture size="156px" @click="goToIndex()">
        <img alt="Logo" src="/gifs/error.gif" >
      </BreathingPicture>
      <h1>Erreur {{ error!.statusCode ?? "" }}</h1>
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
