import {Browser} from 'puppeteer'

import {Anime, Episode} from '~/types'

import {EPISODES_SELECTOR} from './constants'

export default async (browser: Browser, anime: Anime): Promise<Episode[]> => {
  const page = (await browser.pages())[0]

  await page.goto(anime.url, {waitUntil: 'load'})

  const results = await page.$$eval(EPISODES_SELECTOR, (elements: Element[]) =>
    elements.map((e, index) => ({
      url: e.getAttribute('href'),
      number: index + 1,
    })),
  )

  return results.map(r => ({...r, anime}))
}
