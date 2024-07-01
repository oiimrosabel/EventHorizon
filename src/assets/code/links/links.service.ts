class LinksService {
  changeLocation(url: string, newTab = false) {
    const a = document.createElement('a')
    a.href = url
    if (newTab) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    }
    a.click()
  }

  getFullUrl() {
    return window.location.href
  }

  async shareData(url: string, title?: string) {
    title = title ??= url

    const data: ShareData = {
      title: title,
      url: url
    }

    try {
      await navigator.share(data)
    } catch (err: any) {
      return false
    }
    return true
  }

  async copyDataToClipboard(data: string) {
    try {
      await navigator.clipboard.writeText(data)
    } catch (err: any) {
      return false
    }
    return true
  }

  reloadPage() {
    location.reload()
  }

  getDataFromUrl(url: string, key: string) {
    const reg = /[?&]([^=]+)=([^&]+)/gm
    let res
    do {
      res = reg.exec(url)
      if (res && res[1] === key) return res[2]
    } while (res)
    return undefined
  }

  getOrigin(trimmed = false) {
    let res = window.location.origin
    if (trimmed) {
      let strippedUrl: Array<any> | null = /^https?:\/\/(.*):\d+(.*)$/gim.exec(res)
      if (!strippedUrl) strippedUrl = []
      else strippedUrl.shift()
      res = strippedUrl.join('')
    }
    return res
  }
}

export const linksService = new LinksService()
