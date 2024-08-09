<script lang="ts" setup>
import { ref } from "vue";
import LookupBundle from "~/cards/LookupCard.vue";
import MessageTemplate from "~/components/MessageTemplate.vue";
import TextButton from "~/components/TextButton.vue";
import type { NuxtError } from "#app";
import { themeService } from "assets/code/theme/theme.service";
import ButtonsList from "~/components/containers/ButtonsList.vue";
import { linksService } from "assets/code/links/links.service";

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: undefined,
  },
});

const isLookupShown = ref(false);

useNuxtApp().hook("app:mounted", () =>
  themeService.switchTheme(themeService.getThemeFromCookie()),
);
</script>

<template>
  <MessageTemplate
    :title="`Erreur ${error!.statusCode}`"
    :description="error?.statusMessage"
    image="/images/error.svg"
  >
    <ButtonsList>
      <TextButton @click="linksService.changeLocation('/')">
        <img alt="Home" src="/icons/home.svg" />
        <p>Accueil</p>
      </TextButton>
    </ButtonsList>
  </MessageTemplate>
</template>
