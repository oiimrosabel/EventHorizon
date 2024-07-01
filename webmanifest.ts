import { ManifestOptions } from 'vite-plugin-pwa'
import displayData from './src/assets/data/display.json'

const webmanifest: Partial<ManifestOptions> = {
  name: displayData.home.title,
  short_name: displayData.home.title,
  description: displayData.home.catchprase,
  theme_color: '#7356FF',
  icons: [
    {
      src: '/meta/logo.png',
      sizes: '256x256',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/meta/mono.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'monochrome'
    },
    {
      src: '/meta/maskable.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable'
    }
  ],
  screenshots: [
    {
      src: 'meta/screenshot.png',
      sizes: '640x320',
      type: 'image/png',
      form_factor: 'wide',
      label: 'Application'
    },
    {
      src: 'meta/screenshot-mobile.png',
      sizes: '384x854',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Application'
    }
  ]
}

export default webmanifest