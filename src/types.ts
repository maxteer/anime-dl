/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Browser, HTTPRequest} from 'puppeteer'

export type HTTPRequestHandler = (event: HTTPRequest) => void

export type ScraperInput = {
  scraper: Scraper
  anime: string
  output: string
  showBrowser: boolean
}

export type Scraper = {
  createBrowser(showBrowser: boolean): Promise<Browser>
  searchAnimes(browser: Browser, query: string): Promise<Anime[]>
  fetchEpisodes(browser: Browser, anime: Anime): Promise<Episode[]>
  calcDownloadLink(browser: Browser, episode: Episode): Promise<EpisodeMirror>
}

export type Anime = {
  name: string
  url: string
}

export type Episode = {
  url: string
  number: number
  anime: Anime
}

export type EpisodeMirror = {
  url: string
  quality: string
  episode: Episode
}
