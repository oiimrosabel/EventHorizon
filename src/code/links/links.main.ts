export const changeLocation = (url: string, newTab = false) => {
  const a = document.createElement('a')
  a.href = url
  if (newTab) {
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  }
  a.click()
}

export const getFullUrl = () => {
  return window.location.href
}

export const shareData = async (url: string, title?: string) => {
  try {
    await navigator.share({
      title: title ?? url,
      url: url,
    })
    return true
  } catch (_) {
    return false
  }
}

export const copyToClipboard = async (data: string) => {
  try {
    await navigator.clipboard.writeText(data)
  } catch (_) {
    return false
  }
  return true
}

export const reloadPage = () => location.reload()

export const getParameters = (url: string, key: string) =>
  new URL(url).searchParams.get(key) ?? undefined

export const setTitle = (chunk?: string) => {
  const title = 'EventHorizon'
  const res = chunk ? `${chunk} - ${title}` : title
  document.head.querySelector('title')!.innerHTML = res
  return res
}
