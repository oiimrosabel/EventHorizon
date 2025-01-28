<script lang="ts" setup>
import { useError } from '@/stores/useError.ts'
import { useRoute, useRouter } from 'vue-router'
import { useBookmarker } from '@/stores/useBookmarker.ts'
import { useSplash } from '@/stores/useSplash.ts'
import { ECalendar, ESummary } from '@/code/calendar/calendar.main.ts'
import { onMounted, ref } from 'vue'
import { fetchCalendar } from '@/code/fetch/fetch.main.ts'
import type { FailureResponse, SuccessResponse } from '@/code/fetch/fetch.common.ts'
import WidgetPanel from '@/components/containers/WidgetPanel.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import WelcomeWidget from '@/components/widgets/WelcomeWidget.vue'
import DateWidget from '@/components/widgets/DateWidget.vue'
import ProgressWidget from '@/components/widgets/ProgressWidget.vue'
import WidgetContainer from '@/components/containers/WidgetContainer.vue'
import EventWidget from '@/components/widgets/EventWidget.vue'
import StatsWidget from '@/components/widgets/StatsWidget.vue'
import SearchWidget from '@/components/widgets/retractable/SearchWidget.vue'
import BookmarksWidget from '@/components/widgets/retractable/BookmarksWidget.vue'
import CalendarLog from '@/components/widgets/CalendarLog.vue'
import ThemesWidget from '@/components/widgets/retractable/ThemesWidget.vue'
import CreditsWidget from '@/components/widgets/retractable/CreditsWidget.vue'
import TimetableContainer from '@/components/containers/TimetableContainer.vue'
import DayContainer from '@/components/containers/DayContainer.vue'
import DayHeader from '@/components/DayHeader.vue'
import EventFiller from '@/components/widgets/EventFiller.vue'
import BridgeConfig from '@/../bridge.config.json'

const DEFAULT_REFRESH_RATE = BridgeConfig.refreshInterval

const $error = useError()
const $route = useRoute()
const $router = useRouter()
const $bookmarker = useBookmarker()
const $splash = useSplash()

const calendarRef = ref<ECalendar>(new ECalendar())
const summaryRef = ref<ESummary | undefined>(undefined)

const calId: number = Number($route.params['cal'] ?? 0)
const hasCalId = calId !== 0

const getCalendar = async () => {
  if (!hasCalId) return
  $splash.lock()
  const data = await fetchCalendar({
    cal: calId,
    weeks: 4,
  })
  if (!data.success) {
    $error.setMessage((data as FailureResponse).message)
    await $router.push(`/error?from=${calId}`)
    $splash.unlock()
    $splash.fadeOut()
  }
  const cal = new ECalendar((data as SuccessResponse).data)
  calendarRef.value = cal
  summaryRef.value = cal.getSummary()
  $splash.unlock()
  $splash.fadeOut()
}

onMounted(async () => {
  if (hasCalId) $bookmarker.refresh(calId.toString())
  await getCalendar()
  setInterval(getCalendar, DEFAULT_REFRESH_RATE * 1000)
})
</script>

<template>
  <WidgetPanel>
    <PanelHeader v-if="hasCalId" />
    <WelcomeWidget v-else />
    <DateWidget />
    <ProgressWidget v-if="summaryRef" :progression="summaryRef.progression" />
    <WidgetContainer v-if="summaryRef" title="Cours actuel">
      <EventWidget :event="summaryRef.current" placeholder="Pas de cours actuellement" />
    </WidgetContainer>
    <WidgetContainer v-if="summaryRef" title="Prochain cours">
      <EventWidget :event="summaryRef.next" placeholder="Pas de cours à venir" />
    </WidgetContainer>
    <StatsWidget v-if="summaryRef" :data="summaryRef" />
    <SearchWidget :is-index="!hasCalId" />
    <BookmarksWidget :is-index="!hasCalId" />
    <ThemesWidget />
    <CreditsWidget />
    <CalendarLog v-if="hasCalId" :log="calendarRef.log" :refresh-rate="DEFAULT_REFRESH_RATE" />
  </WidgetPanel>
  <TimetableContainer>
    <DayContainer v-for="(d, i) in calendarRef.days" :key="i">
      <DayHeader :day="d" />
      <EventFiller v-if="d.events.length === 0" placeholder="Pas de cours ce jour là" />
      <EventWidget v-for="(e, i) in d.events" :key="i" :event="e" :happening="e.isNow()" />
    </DayContainer>
  </TimetableContainer>
</template>
