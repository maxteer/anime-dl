import colors from 'colors'

import {ProgressBarType} from '~/external/node-progress'

import {ProgressBar} from '../external'
export default (fileSize: number, fileName: string): ProgressBarType =>
  new ProgressBar(
    `${colors.cyan(
      `${fileName} [:bar] :rate/mbs :percent | ~${(
        fileSize /
        1024 /
        1024
      ).toFixed(2)}MB | :etas`,
    )}`,
    {
      total: fileSize,
      complete: '■',
      incomplete: '.',
      width: 25,
    },
  )
