#!/usr/bin/env node

import {program as cli} from 'commander'
import fs from 'fs'
import path from 'path'

import {version} from '../package.json'
import bootstrap from './bootstrap'
import {V, X} from './constants'
import {Scraper} from './types'
import {importDir} from './utils'

cli
  .name('anime-dl')
  .version(version, '-v, --version', 'exibe a versão atual.')
  .usage('[anime] -o <output>')
  .option('-o, --output <output>', '(*) diretório de saída.')
  .option(
    '-s, --source <source>',
    'site para utilizar como fonte.',
    'betteranime',
  ) // Padrão: betteranime.net
  .option('-sb, --show-browser', 'exibe o browser automatizado.', false)
  .helpOption('-h, --help', 'exibe a mensagem de ajuda.')
  .on('--help', () => {
    console.log('\nSources disponíveis: betteranime')
  })
  .parse(process.argv)

const {output, source, showBrowser} = cli.opts()

if (cli.args.length === 0) {
  console.log(`${X} Nenhum anime foi informado. Utilize -h para ajuda.`)
  process.exit(1)
}

if (!output) {
  console.log(`${X} Diretório de saída não informado. Utilize -h para ajuda.`)
  process.exit(1)
}

const out = path.resolve(output)
if (!fs.existsSync(output)) {
  console.log(`${X} Diretório de saída "${out}" inválido!`)
  process.exit(1)
}

async function init() {
  const scrapers: {[key: string]: Scraper} = {}
  await importDir(path.join(__dirname, 'scrapers'), '../scrapers/', module => {
    scrapers[module.name] = module.default
  })

  const scraper = scrapers[source.toLowerCase()]
  if (!scraper) {
    console.log(`${X} Scraper para ${source} não encontrado!`)
    process.exit(1)
  }

  console.log(`${V} Scraper: ${source.toLowerCase()}`)
  console.log(`${V} Diretório de saída: ${out}`)

  bootstrap({scraper, anime: cli.args.join(' '), output: out, showBrowser})
}
init()
