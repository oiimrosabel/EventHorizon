<script lang="ts" setup>
import { calendarService } from "assets/code/calendar/calendar.service";
import { ref } from "vue";
import WidgetPanel from "~/components/containers/WidgetPanel.vue";
import DayContainer from "~/components/containers/DayContainer.vue";
import EventWidget from "~/components/widgets/EventWidget.vue";
import TextWidget from "~/components/widgets/TextWidget.vue";
import { useRoute } from "vue-router";
import StatsWidget from "~/components/widgets/StatsWidget.vue";
import WidgetContainer from "~/components/containers/WidgetContainer.vue";
import ErrorMessage from "~/bundles/ErrorBundle.vue";
import DateWidget from "~/components/widgets/DateWidget.vue";

const route = useRoute();
const calId = route.params["cal"] as string;

const isError = ref(false);

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
        v-if="calendarData?.current"
        :event="calendarData?.current"
      />
      <TextWidget v-else>
        <p>Pas de cours actuellement</p>
      </TextWidget>
    </WidgetContainer>
    <WidgetContainer title="Prochain cours">
      <EventWidget v-if="calendarData?.next" :event="calendarData?.next" />
      <TextWidget v-else>
        <p>Pas de cours à venir</p>
      </TextWidget>
    </WidgetContainer>
    <WidgetContainer title="Statistiques">
      <StatsWidget :data="calendarData!" />
    </WidgetContainer>
  </WidgetPanel>
  <DayContainer
    v-for="(d, id, o) in calendarData?.calendar"
    :key="id"
    :title="d[0]!.date.join(' ')"
    :order="o + 1"
  >
    <EventWidget
      v-for="(e, ie) in d"
      :key="ie"
      :event="e"
      :is-happening="calendarService.isHappening(e)"
    />
  </DayContainer>
</template>
