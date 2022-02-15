import colors from 'colors'
import fs from 'fs'
import ora from 'ora'
import path from 'path'
import request from 'request'

import {X} from './constants'
import {Episode, EpisodeMirror, ScraperInput} from './types'
import progressBar from './utils/progressBar'
import selection from './utils/selection'

function downloadEpisode(
  output: string,
  {url, quality, episode}: EpisodeMirror,
) {
  const episodeNumber = episode.number.toString().padStart(2, '0')
  const filteredName = episode.anime.name.replace(/[^\w\s]+/g, '')
  const name = `${episodeNumber} ${filteredName} ${quality}.mp4`
  return new Promise<void>((resolve, reject) =>
    request(url)
      .on('response', response => {
        if (response.statusCode > 299)
          return reject(
            new Error(
              `Não foi possível baixar ${name}: HTTP ${response.statusCode} / ${response.statusMessage}`,
            ),
          )

        const fileSize = parseInt(response.headers['content-length'])
        const progress = progressBar(fileSize, name)
        response.on('data', chunk => progress.tick(chunk.length))
      })
      .pipe(fs.createWriteStream(path.join(output, name)))
      .on('close', () => resolve()),
  )
}

export default async ({
  scraper,
  anime,
  output,
  showBrowser,
}: ScraperInput): Promise<void> => {
  const spinner = ora(colors.cyan(`Pesquisando por ${anime}...`)).start()

  try {
    const browser = await scraper.createBrowser(showBrowser)

    const animes = await scraper.searchAnimes(browser, anime)
    spinner.succeed()

    const selected = await selection(
      'list',
      'result',
      'Selecione o anime para prosseguir:',
      animes,
      20,
      anime => anime.name,
    )

    spinner.start(
      colors.cyan(
        `Consultando episódios para ${selected.name} | ${selected.url}`,
      ),
    )
    const episodes = await scraper.fetchEpisodes(browser, selected)
    spinner.succeed()

    const episodesToDownload = await selection<Episode, Episode[]>(
      'checkbox',
      'result',
      'Selecione os episódios que deseja baixar:',
      episodes,
      20,
      episode => episode.number.toString().padStart(2, '0'),
    )

    for (const episode of episodesToDownload) {
      const episodeNumber = episode.number.toString().padStart(2, '0')

      spinner.start(
        colors.cyan(`Consultando episódio ${episodeNumber} | ${episode.url}`),
      )

      try {
        const episodeMirror = await scraper.calcDownloadLink(browser, episode)
        spinner.succeed()
        await downloadEpisode(output, episodeMirror).catch(error =>
          console.log(`${X} ${error.message}`),
        )
      } catch (error) {
        spinner.fail(
          `Falha ao consultar episódio ${episodeNumber} | ${error.message}`,
        )
      }
    }

    await browser.close()
    process.exit(0)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
