import {Browser, Page} from 'puppeteer'

import {Episode, EpisodeMirror} from '~/types'

import {
  DOWNLOAD_SELECTOR,
  HIGHER_QUALITY_SELECTOR,
  POPUP_SELECTOR,
} from './constants'

async function tryBypassPopUps(browser: Browser, page: Page, maxClicks = 2) {
  for (let i = 0; i < maxClicks; i++) {
    try {
      const target = page.target()
      await page.click(POPUP_SELECTOR)
      const popup = await browser.waitForTarget(t => t.opener() === target)
      const popupPage = await popup.page()
      await popupPage.close()

      return await page.$eval(DOWNLOAD_SELECTOR, e => e.getAttribute('href'))
    } catch (tryagain) {
      // Aguarda por 300 millisegundos e tenta novamente se necessário
      await new Promise(res => setTimeout(res, 300))
    }
  }

  throw new Error(
    'Não foi possível ultrapassar as verificações do link de download.',
  )
}

export default async (
  browser: Browser,
  episode: Episode,
): Promise<EpisodeMirror> => {
  const page = (await browser.pages())[0]

  await page.goto(episode.url, {waitUntil: 'load'})

  const {url, quality} = await page.$eval(HIGHER_QUALITY_SELECTOR, e => ({
    url: e.getAttribute('href'),
    quality: e.textContent.replace('Qualidade ', ''),
  }))

  const downloadPage = await browser.newPage()
  await downloadPage.goto(url, {waitUntil: 'load'})

  try {
    return {url: await tryBypassPopUps(browser, downloadPage), quality, episode}
  } finally {
    await downloadPage.close()
  }
}
