<script lang="ts" setup>
import { calendarService } from '@/assets/code/calendar/calendar.service'
import { ref } from 'vue'
import QuickPanel from '@/components/QuickPanel.vue'
import TimeTable from '@/components/TimeTable.vue'
import DayWidget from '@/components/widgets/DayWidget.vue'
import EventWidget from '@/components/widgets/EventWidget.vue'
import TextEvent from '@/components/widgets/TextEvent.vue'
import TextWidget from '@/components/widgets/TextWidget.vue'
import RoundButton from '@/components/buttons/RoundButton.vue'
import { useRoute, useRouter } from 'vue-router'
import ThemeBundle from '@/bundles/ThemeBundle.vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import StatsWidget from '@/components/widgets/StatsWidget.vue'
import StatButton from '@/components/buttons/StatButton.vue'
import WidgetContainer from '@/components/widgets/WidgetContainer.vue'

const isThemeShown = ref(false)
const isLookupShown = ref(false)

const route = useRoute()
const router = useRouter()

const reloadPage = () => location.reload()

const copyPage = () =>
  navigator.clipboard.writeText(useRoute().fullPath).then(() => alert('Copié avec succès'))

const calendarData = await calendarService.getCalendar(route.params['cal'] as string)
if (!calendarData) router.push('/error')
</script>

<template>
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <div class="CalendarsView">
    <QuickPanel>
      <template #buttons>
        <RoundButton title="Changer d'emploi du temps" @click="isLookupShown = true">
          <img alt="Switch" src="/icons/switch.png" />
        </RoundButton>
        <RoundButton title="Rafraîchir" @click="reloadPage()">
          <img alt="Refresh" src="/icons/refresh.png" />
        </RoundButton>
        <RoundButton title="Partager" @click="copyPage()">
          <img alt="Share" src="/icons/share.png" />
        </RoundButton>
        <RoundButton title="Changer de thème" @click="isThemeShown = true">
          <img alt="Theme" src="/icons/theme.png" />
        </RoundButton>
      </template>
      <template #reduced>
        <TextWidget v-if="calendarData?.current" class="displayOnDesktop">
          <h3>{{ calendarData?.current.start }}</h3>
          <p>{{ calendarData?.current.end }}</p>
        </TextWidget>
      </template>
      <template #hideable>
        <WidgetContainer title="Cours actuel">
          <EventWidget v-if="calendarData?.current" :event="calendarData?.current" />
          <TextEvent v-else>
            <p>Pas de cours actuellement</p>
          </TextEvent>
        </WidgetContainer>
        <WidgetContainer title="Prochain cours">
          <EventWidget v-if="calendarData?.next" :event="calendarData?.next" />
          <TextEvent v-else>
            <p>Pas de cours à venir</p>
          </TextEvent>
        </WidgetContainer>
        <StatsWidget>
          <StatButton>
            <h3>{{ calendarData?.lenght }}</h3>
            <p>cours</p>
          </StatButton>
          <StatButton>
            <h3>{{ calendarData?.duration.join('h') }}</h3>
            <p>ajd°</p>
          </StatButton>
          <StatButton v-for="(e, i) in calendarData?.types" :key="i">
            <h3>{{ e }}</h3>
            <p>{{ i }}s</p>
          </StatButton>
        </StatsWidget>
      </template>
    </QuickPanel>
    <TimeTable>
      <DayWidget
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
      </DayWidget>
    </TimeTable>
  </div>
</template>

<style lang="sass">
.CalendarsView
  display: flex
  align-items: stretch
  justify-content: stretch

  @media (min-width: 1201px)
    height: 100%
    width: 100%
    flex-direction: row

  @media (max-width: 1200px)
    flex-direction: column
</style>

<!-- archive

<DayWidget title="Aujourd'hui" v-if="todayRef" class="displayOnDesktop">
  <EventWidget
    v-for="(e, i) in todayRef"
    :key="i"
    :event="e"
    :is-happening="calendarService.isHappening(e)"
  />
</DayWidget>

-->
