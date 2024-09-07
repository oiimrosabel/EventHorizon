<script lang="ts" setup>
import { calendarService } from "@/assets/code/calendar/calendar.service";
import { ref } from "vue";
import WidgetPanel from "@/components/containers/WidgetPanel.vue";
import DayContainer from "@/components/containers/DayContainer.vue";
import EventWidget from "@/components/widgets/EventWidget.vue";
import { useRoute } from "vue-router";
import StatsWidget from "@/components/widgets/StatsWidget.vue";
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import ErrorMessage from "@/bundles/ErrorBundle.vue";
import DateWidget from "@/components/widgets/DateWidget.vue";
import { useBookmarker } from "@/composables/useBookmarker";
import { bookmarkService } from "@/assets/code/bookmark/bookmark.service";

const $route = useRoute();
const calId = $route.params["cal"] as string;

const isError = ref(false);

useNuxtApp().hook("app:mounted", () => {
  useBookmarker().bookmark = bookmarkService.isBookmarked(calId);
});

const calendarData = await calendarService.getCalendar(calId);
if (!calendarData) isError.value = true;
</script>

<template>
  <ErrorMessage v-if="isError" />
  <WidgetPanel v-if="!isError">
    <h4>Résumé de la journée</h4>
    <DateWidget />
    <WidgetContainer title="Cours actuel">
      <EventWidget
        :event="calendarData!.current"
        placeholder="Pas de cours actuellement"
      />
    </WidgetContainer>
    <WidgetContainer title="Prochain cours">
      <EventWidget
        :event="calendarData!.next"
        placeholder="Pas de cours à venir"
      />
    </WidgetContainer>
    <WidgetContainer title="Statistiques">
      <StatsWidget :data="calendarData!" />
    </WidgetContainer>
  </WidgetPanel>
  <DayContainer
    v-for="(tag, id) in Object.keys(calendarData!.calendar).sort()"
    v-if="!isError"
    :key="id"
    :order="id + 1"
    :title="calendarData!.calendar[tag][0]!.date.join(' ')"
  >
    <EventWidget
      v-for="(e, ie) in calendarData!.calendar[tag]"
      :key="ie"
      :event="e"
      :is-happening="calendarService.isHappening(e)"
    />
  </DayContainer>
</template>
