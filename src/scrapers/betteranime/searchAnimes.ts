import {Browser} from 'puppeteer'

import {Anime} from '~/types'

import {BASE_URL, SEARCH_SELECTOR} from './constants'

export default async (browser: Browser, anime: string): Promise<Anime[]> => {
  const page = (await browser.pages())[0]

  await page.goto(`${BASE_URL}/pesquisa?titulo=${encodeURIComponent(anime)}`, {
    waitUntil: 'load',
  })

  const results: Anime[] = await page.$$eval(
    SEARCH_SELECTOR,
    (elements: Element[]) => {
      return elements.map(e => ({
        name: e.getAttribute('title'),
        url: e.getAttribute('href'),
      }))
    },
  )

  return results
}
