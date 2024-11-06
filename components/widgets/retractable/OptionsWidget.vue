<script lang="ts" setup>
import type { ECalendarInfo } from "~/services/calendar/calendar.common";
import { linksService } from "~/services/links/links.service";
import TextButton from "~/components/buttons/TextButton.vue";
import ButtonsList from "~/components/containers/ButtonsList.vue";
import { useCommonData } from "~/composables/useCommonData";
import { formatService } from "~/services/format/format.service";
import RetractableWidget from "~/components/containers/RetractableWidget.vue";

defineProps({
  lastUpdated: {
    required: true,
    type: Object as PropType<ECalendarInfo>,
  },
});

const $messenger = useMessenger();
const $common = useCommonData();

const shareLink = () => {
  const data = linksService.getFullUrl();
  linksService.shareData(data, $common.bundles.share.title).then((success) => {
    if (!success)
      linksService.copyDataToClipboard(data).then((success) => {
        $messenger.setMessage(
          success ? $common.bundles.copy.success : $common.bundles.copy.failure,
        );
      });
    else $messenger.setMessage($common.bundles.share.success);
  });
};
</script>

<template>
  <RetractableWidget
    tag="options"
    title="Partage & Options"
    image="/images/share.svg"
  >
    <div class="OptionsWidget">
      <ButtonsList>
        <TextButton title="Rafraîchir" @click="linksService.reloadPage()">
          <img alt="Refresh" src="/icons/refresh.svg" >
          <p>Rafraîchir</p>
        </TextButton>
        <TextButton title="Partager" @click="shareLink()">
          <img alt="Share" src="/icons/share.svg" >
          <p>Partager</p>
        </TextButton>
      </ButtonsList>
      <div>
        <div>
          <img src="/icons/credits.svg" alt="Calendar" >
          <p>{{ $route.params["cal"] }}</p>
        </div>
        <div>
          <img src="/icons/refresh.svg" alt="Refresh" >
          <p>
            {{ formatService.formatDate(lastUpdated.date, "/", true) }}
            {{ formatService.formatHour(lastUpdated.time, ":") }}
          </p>
        </div>
        <div>
          <img src="/icons/calendar.svg" alt="Refresh" >
          <p>{{ lastUpdated.weeks * 7 }} jours</p>
        </div>
      </div>
    </div>
  </RetractableWidget>
</template>

<style lang="sass">
.OptionsWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 20px

  > div:not(.ButtonsList)
    display: flex
    flex-direction: column
    justify-content: start
    align-items: start
    gap: 12px

    > div
      display: flex
      flex-direction: row
      justify-content: start
      align-items: center
      gap: 8px

      > p
        font-size: 14px
        opacity: 0.75

      > img
        height: 14px
        filter: var(--filter)
</style>
