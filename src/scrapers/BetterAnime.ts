import {Scraper} from '~/types'

import {
  createBrowser,
  calcDownloadLink,
  fetchEpisodes,
  searchAnimes,
} from './betteranime'

export const name = 'betteranime'

export default {
  createBrowser,
  searchAnimes,
  fetchEpisodes,
  calcDownloadLink,
} as Scraper
