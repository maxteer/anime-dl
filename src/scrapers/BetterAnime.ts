import {Scraper} from '~/types'

import calcDownloadLink from './betteranime/calcDownloadLink'
import createBrowser from './betteranime/createBrowser'
import fetchEpisodes from './betteranime/fetchEpisodes'
import searchAnimes from './betteranime/searchAnimes'

export const name = 'betteranime'

export default {
  createBrowser,
  searchAnimes,
  fetchEpisodes,
  calcDownloadLink,
} as Scraper
