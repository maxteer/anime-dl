import puppeteer, {Browser} from 'puppeteer'

import {BLOCKED_RESOURCES} from './constants'

export default async (showBrowser: boolean): Promise<Browser> => {
  const browser = await puppeteer.launch({headless: !showBrowser})
  const page = (await browser.pages())[0]
  await page.setRequestInterception(true)

  page.on('request', req => {
    if (BLOCKED_RESOURCES.includes(req.resourceType())) req.abort()
    else req.continue()
  })

  return browser
}
