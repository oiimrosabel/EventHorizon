<script lang="ts" setup>
import { calendarService } from '@/assets/code/calendar/calendar.service'
import { ref } from 'vue'
import QuickPanel from '@/components/QuickPanel.vue'
import TimeTable from '@/components/TimeTable.vue'
import DayContainer from '@/components/containers/DayContainer.vue'
import EventWidget from '@/components/widgets/EventWidget.vue'
import TextEventWidget from '@/components/widgets/TextEventWidget.vue'
import TextWidget from '@/components/widgets/TextWidget.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import { useRoute } from 'vue-router'
import ThemeBundle from '@/bundles/ThemeBundle.vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import StatsWidget from '@/components/widgets/StatsWidget.vue'
import StatButton from '@/components/buttons/StatButton.vue'
import WidgetContainer from '@/components/containers/WidgetContainer.vue'
import ErrorMessage from '@/bundles/ErrorBundle.vue'
import { linksService } from '@/assets/code/links/links.service'
import ShareBundle from '@/bundles/ShareBundle.vue'

const isThemeShown = ref(false)
const isLookupShown = ref(false)
const isShareShown = ref(false)
const isError = ref(false)

const route = useRoute()

const calendarData = await calendarService.getCalendar(route.params['cal'] as string)
if (!calendarData) isError.value = true
</script>

<template>
  <!-- Messages -->
  <ErrorMessage v-if="isError" />

  <!-- Bundles -->
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <ShareBundle v-if="isShareShown" @hide="isShareShown = false" />

  <!-- Vue du calendrier -->
  <div class="CalendarsContent" v-if="!isError">
    <QuickPanel>
      <template #buttons>
        <TextButton title="Changer d'emploi du temps" @click="isLookupShown = true">
          <img alt="Switch" src="/icons/switch.svg" />
        </TextButton>
        <TextButton title="Rafraîchir" @click="linksService.reloadPage()">
          <img alt="Refresh" src="/icons/refresh.svg" />
        </TextButton>
        <TextButton title="Partager" @click="isShareShown = true">
          <img alt="Share" src="/icons/share.svg" />
        </TextButton>
        <TextButton title="Changer de thème" @click="isThemeShown = true">
          <img alt="Theme" src="/icons/theme.svg" />
        </TextButton>
      </template>
      <template #reduced>
        <TextWidget v-if="calendarData?.current" class="displayOnDesktop">
          <h3>{{ calendarData?.current.start.join(':') }}</h3>
          <p>{{ calendarData?.current.end.join(':') }}</p>
        </TextWidget>
      </template>
      <template #hideable>
        <WidgetContainer title="Cours actuel">
          <EventWidget v-if="calendarData?.current" :event="calendarData?.current" />
          <TextEventWidget v-else>
            <p>Pas de cours actuellement</p>
          </TextEventWidget>
        </WidgetContainer>
        <WidgetContainer title="Prochain cours">
          <EventWidget v-if="calendarData?.next" :event="calendarData?.next" />
          <TextEventWidget v-else>
            <p>Pas de cours à venir</p>
          </TextEventWidget>
        </WidgetContainer>
        <WidgetContainer title="Statistiques">
          <StatsWidget>
            <StatButton>
              <h3>{{ calendarData?.lenght }}</h3>
              <p>cours</p>
            </StatButton>
            <StatButton>
              <h3>{{ calendarData?.duration }}</h3>
              <p>aujourd'hui</p>
            </StatButton>
            <StatButton v-for="(e, i) in calendarData?.types" :key="i">
              <h3>{{ e }}</h3>
              <p>{{ i }}s</p>
            </StatButton>
          </StatsWidget>
        </WidgetContainer>
      </template>
    </QuickPanel>
    <TimeTable>
      <DayContainer
        v-for="(d, id) in calendarData?.calendar"
        :key="id"
        :title="d[0].date.join(' ')"
        is-foldable
      >
        <EventWidget
          v-for="(e, ie) in d"
          :key="ie"
          :event="e"
          :is-happening="calendarService.isHappening(e)"
        />
      </DayContainer>
    </TimeTable>
  </div>
</template>

<style lang="sass">
.CalendarsContent
  display: flex
  align-items: stretch
  justify-content: stretch

  @media (min-width: 1201px)
    height: 100%
    width: 100%
    flex-direction: row

  @media (max-width: 1200px)
    flex-direction: column
    flex-grow: 1
</style>
