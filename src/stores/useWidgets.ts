import { defineStore } from 'pinia'
import { ref } from 'vue'

const WIDGETS_ID_NAME = 'ade-widgets'

export const useWidgets = defineStore('widgets', () => {
  const mapRef = ref<Map<string, boolean>>(new Map<string, boolean>())

  const registerWidget = (name: string, forceOpen = false) =>
    mapRef.value.set(name, forceOpen || isDisplayed(name))

  const isDisplayed = (tag: string) => mapRef.value.get(tag) ?? false

  const switchState = (tag: string) => {
    mapRef.value.set(tag, !isDisplayed(tag))
    save()
  }

  const sync = () => {
    const raw = localStorage.getItem(WIDGETS_ID_NAME)
    if (!raw) return
    raw
      .split('+')
      .filter((v) => !!v)
      .forEach((wd) => {
        const data = wd.split('@')
        if (data[0] && data[1]) mapRef.value.set(data[0], data[1] === '1')
      })
  }

  const save = () => {
    const wdList: string[] = []
    for (const e of mapRef.value.entries()) wdList.push(`${e[0]}@${Number(e[1])}`)
    localStorage.setItem(WIDGETS_ID_NAME, wdList.join('+'))
  }

  return { registerWidget, isDisplayed, switchState, sync, save }
})
