export const BASE_URL = 'https://betteranime.net'

export const BLOCKED_RESOURCES = [
  'stylesheet',
  'image',
  'media',
  'font',
  'fetch',
  'websocket',
  'other',
]

export const SEARCH_SELECTOR = 'div.list-animes.row > article > a'
export const EPISODES_SELECTOR = 'ul#episodesList > li > div > a:nth-child(3)'

export const POPUP_SELECTOR = '#__next > header > div > div > button'
export const DOWNLOAD_SELECTOR = '#__next > header > div > div > a'

export const HIGHER_QUALITY_SELECTOR =
  '#page-content > div.container.my-5 > section > div.contact-content.d-flex.justify-content-between.py-4.px-5 > div:nth-child(1) > div > a:last-child'
