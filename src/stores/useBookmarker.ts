import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { setTitle } from '@/code/links/links.main.ts'
import { type Bookmark } from '@/code/bookmark/bookmark.common'
import { ReverseMap } from '@/code/bookmark/bookmark.revmap.ts'

const PLACEHOLDER = 'Sans titre'

const BOOKMARKS_ID_NAME = 'ade-bookmarks'

export const useBookmarker = defineStore('bookmarker', () => {
  const map = ref<ReverseMap<string, string>>(new ReverseMap<string, string>())

  const sync = () => {
    const raw = localStorage.getItem(BOOKMARKS_ID_NAME)
    if (!raw) return
    raw
      .split('+')
      .filter((v) => !!v)
      .forEach((bk) => {
        const data = bk.split('@')
        if (data[0] && data[1]) map.value.set(data[0], data[1])
      })
  }

  const bookmarks = computed(() => {
    const res: Bookmark[] = []
    map.value.reg.forEach((v, k) =>
      res.push({
        name: k,
        cal: v,
      }),
    )
    return res
  })

  const isValidName = (name: string) => /^[A-Za-z0-9 ]+$/.test(name)

  const getName = (cal: string) => map.value.getRev(cal)

  const add = (name: string, cal: string) => {
    if (exists(name) || exists(cal) || !isValidName(name)) return false
    map.value.set(name, cal)
    save()
    currentNameRef.value = name
    isSavedRef.value = true
    return true
  }

  const exists = (name: string) => map.value.has(name)

  const remove = (name: string) => {
    map.value.delete(name)
    save()
    currentNameRef.value = PLACEHOLDER
    isSavedRef.value = false
  }

  const clear = () => {
    map.value.clear()
    save()
    currentNameRef.value = PLACEHOLDER
    isSavedRef.value = false
  }

  const isSaved = (cal: string) => map.value.hasRev(cal)

  const save = () => {
    const bkList: string[] = []
    if (map.value.size() === 0) {
      localStorage.setItem(BOOKMARKS_ID_NAME, '')
      return
    }
    for (const e of map.value.reg.entries()) bkList.push(`${e[0]}@${e[1]}`)
    localStorage.setItem(BOOKMARKS_ID_NAME, bkList.join('+'))
  }

  const isSavedRef = ref<boolean>(false)

  const currentNameRef = ref<string>(PLACEHOLDER)

  const isBookmarked = computed(() => isSavedRef.value)

  const bookmarkName = computed(() => currentNameRef.value)

  const refresh = (calId?: string) => {
    if (!calId) return
    const saved = isSaved(calId)
    isSavedRef.value = saved
    const name = saved ? getName(calId)! : PLACEHOLDER
    currentNameRef.value = name
    setTitle(name)
  }

  return {
    sync,
    add,
    remove,
    clear,
    refresh,
    isBookmarked,
    bookmarkName,
    bookmarks,
  }
})
