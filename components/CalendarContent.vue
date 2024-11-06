<script lang="ts" setup>
// Calendar service
import { calendarService } from "~/services/calendar/calendar.service";
import {
  type ECalendar,
  type ESummary,
} from "~/services/calendar/calendar.common";

// Vue tools
import { useRoute } from "vue-router";
import { ref } from "vue";

// Services
import { formatService } from "~/services/format/format.service";

// Containers
import WidgetPanel from "~/components/containers/WidgetPanel.vue";
import DayContainer from "~/components/containers/DayContainer.vue";
import WidgetContainer from "~/components/containers/WidgetContainer.vue";
import TimetableContainer from "~/components/containers/TimetableContainer.vue";

// Widgets
import DayHeader from "~/components/DayHeader.vue";
import EventWidget from "~/components/widgets/EventWidget.vue";
import StatsWidget from "~/components/widgets/StatsWidget.vue";
import DateWidget from "~/components/widgets/DateWidget.vue";
import ProgWidget from "~/components/widgets/ProgressWidget.vue";
import OptionsWidget from "~/components/widgets/retractable/OptionsWidget.vue";
import SearchWidget from "~/components/widgets/retractable/SearchWidget.vue";
import BookmarksWidget from "~/components/widgets/retractable/BookmarksWidget.vue";
import ThemesWidget from "~/components/widgets/retractable/ThemesWidget.vue";
import CreditsWidget from "~/components/widgets/CreditsWidget.vue";
import WelcomeWidget from "~/components/widgets/WelcomeWidget.vue";
import EventFiller from "~/components/widgets/EventFiller.vue";
import PanelHeader from "~/components/PanelHeader.vue";

const $route = useRoute();
const $bookmarker = useBookmarker();

const defaultECalendar: ECalendar = {
  days: [],
  lastUpdated: {
    date: {
      day: {
        dg: "",
        nm: "-",
      },
      month: {
        dg: "",
        nm: "-",
      },
    },
    time: {
      h: "00",
      m: "00",
    },
    weeks: 0,
  },
};

const calendarRef = ref<ECalendar>(defaultECalendar);
const summaryRef = ref<ESummary | undefined>(undefined);

const calId = $route.params["cal"] as string | undefined;
const hasCalId = !!calId;

if (hasCalId) {
  let data: ECalendar | undefined = undefined;
  try {
    data = await calendarService.fetchCalendar(calId);
  } catch (error: unknown) {
    throw createError(formatService.formatErrorAsCalError(error));
  }
  calendarRef.value = data;
  summaryRef.value = calendarService.createSummary(data);
}

onMounted(() => {
  if (hasCalId) $bookmarker.updateData(calId);
});
</script>

<template>
  <ClientOnly>
    <WidgetPanel>
      <PanelHeader v-if="hasCalId" />
      <WelcomeWidget v-else />
      <DateWidget />
      <ProgWidget v-if="summaryRef" :progression="summaryRef.progression" />
      <WidgetContainer v-if="summaryRef" title="Cours actuel">
        <EventWidget
          :event="summaryRef.current"
          placeholder="Pas de cours actuellement"
        />
      </WidgetContainer>
      <WidgetContainer v-if="summaryRef" title="Prochain cours">
        <EventWidget
          :event="summaryRef.next"
          placeholder="Pas de cours à venir"
        />
      </WidgetContainer>
      <StatsWidget v-if="summaryRef" :data="summaryRef" />
      <SearchWidget :is-index="!hasCalId" />
      <BookmarksWidget :is-index="!hasCalId" />
      <OptionsWidget v-if="hasCalId" :last-updated="calendarRef.lastUpdated" />
      <ThemesWidget />
      <CreditsWidget />
    </WidgetPanel>
    <TimetableContainer>
      <DayContainer v-for="d in calendarRef.days" :key="d.id">
        <DayHeader
          :title="d.date"
          :length="d.events.length"
          :duration="d.duration"
        />
        <EventFiller
          v-if="d.events.length === 0"
          placeholder="Pas de cours ce jour là"
        />
        <EventWidget
          v-for="event in d.events"
          :key="event.id"
          :event="event"
          :is-happening="calendarService.isHappening(event)"
        />
      </DayContainer>
    </TimetableContainer>
  </ClientOnly>
</template>
