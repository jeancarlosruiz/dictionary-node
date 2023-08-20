import inquirer from 'inquirer'
import colors from 'colors'

const questions = [
  {
    type: 'list',
    name: 'options',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${colors.green('1.')} Search`
      },
      {
        value: 2,
        name: `${colors.green('2.')} Historial`
      },
      {
        value: 0,
        name: `${colors.green('0.')} Exit`
      }
    ]
  }
]

export const inquirerMenu = async () => {
  console.clear()
  console.log(colors.green('==================================='))
  console.log(colors.white('  Welcome to the dictionary APP 📔'))
  console.log(colors.green('===================================\n'))

  const { options } = await inquirer.prompt(questions)

  return options
}

export const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        if (value.length === 0) {
          return 'Please enter a value'
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)

  return desc
}

export const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${colors.green('ENTER')} to go back to the main menu`
    }
  ]

  console.log('\n')
  await inquirer.prompt(question)
}
