import {readdirSync} from 'fs'

export default async (
  folder: string,
  modulePrefix: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moduleAction: (module: any) => void,
): Promise<void> => {
  const promises = readdirSync(folder).map(async file => {
    if (file.endsWith('.js') || file.endsWith('.ts')) {
      moduleAction(await import(`${modulePrefix}${file}`))
    }
  })
  await Promise.all(promises)
}
