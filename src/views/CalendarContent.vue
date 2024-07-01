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
import ShareBundle from '@/bundles/ShareBundle.vue'
import { bookmarkService } from '@/assets/code/bookmark/bookmark.service'

const route = useRoute()
const calId = route.params['cal'] as string

const isThemeShown = ref(false)
const isLookupShown = ref(false)
const isShareShown = ref(false)
const isError = ref(false)
const isBookmarked = ref(bookmarkService.isBooked(calId))

const bookmarkWrapper = () => {
  bookmarkService.toggleBookmark(calId)
  isBookmarked.value = !isBookmarked.value
}

const calendarData = await calendarService.getCalendar(calId)
if (!calendarData) isError.value = true
</script>

<template>
  <!-- Message -->
  <ErrorMessage v-if="isError" />

  <!-- Bundles -->
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle
    v-if="isLookupShown"
    @hide="isLookupShown = false"
    @cleaned="isBookmarked = false"
  />
  <ShareBundle v-if="isShareShown" @hide="isShareShown = false" />

  <!-- Vue du calendrier -->
  <div class="CalendarsContent" v-if="!isError">
    <QuickPanel>
      <template #buttons>
        <TextButton title="Changer d'emploi du temps" @click="isLookupShown = true">
          <img alt="Switch" src="/icons/switch.svg" />
        </TextButton>
        <TextButton title="Sauvegarder" @click="bookmarkWrapper()">
          <img alt="Bookmark" :src="`/icons/${isBookmarked ? 'unmark' : 'bookmark'}.svg`" />
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
            <StatButton :value="`${calendarData?.length}`" desc="cours" />
            <StatButton :value="calendarData?.duration!" desc="aujourd'hui" />
            <StatButton
              v-for="(e, i) in calendarData?.types"
              :key="i"
              :value="`${e}`"
              :desc="i + 's'"
            />
          </StatsWidget>
        </WidgetContainer>
      </template>
    </QuickPanel>
    <TimeTable>
      <DayContainer
        v-for="(d, id, o) in calendarData?.calendar"
        :key="id"
        :title="d[0].date.join(' ')"
        :order="o + 1"
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

  @media (min-width: 801px)
    height: 100%
    width: 100%
    flex-direction: row

  @media (max-width: 800px)
    flex-direction: column
    flex-grow: 1
</style>
