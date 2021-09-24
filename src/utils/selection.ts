import inquirer from 'inquirer'

export default async <T, R = T>(
  type: inquirer.QuestionTypeName,
  name: string,
  message: string,
  options: T[],
  pageSize: number = options.length,
  nameExtractor: (option: T) => string,
): Promise<R> => {
  const selectedOption = await inquirer.prompt([
    {
      type,
      name,
      message,
      choices: options.map(option => {
        return {
          name: nameExtractor(option),
          value: option,
          short: nameExtractor(option),
        }
      }),
      pageSize,
    },
  ])
  return selectedOption[name]
}
