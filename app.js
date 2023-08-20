import { inquirerMenu, pause, readInput } from './helpers/inquirer.js'
import colors from 'colors'
import Search from './modules/search.js'

const main = async () => {
  let opt
  const search = new Search()
  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const wordSearched = await readInput('Enter a word: ')
        const data = await search.searchWord(wordSearched)

        console.log(data)

        const { word, meanings, sourceUrls } = data

        console.log(colors.green('============================'))
        console.log(colors.green('Word: ') + word)
        console.log(colors.green('============================\n'))

        console.log(colors.green('Meanings:'))

        meanings.forEach(meaning => {
          const { partOfSpeech, definitions } = meaning

          console.log(colors.green('============================'))
          console.log(colors.green('Part of speech: ') + partOfSpeech)
          console.log(colors.green('============================'))
          console.log(colors.green('Definitions:'))
          definitions.slice(0, 3).forEach((definition) => {
            console.log('➡️ ' + colors.blue(definition.definition))

            if (definition.synonyms.length > 0) {
              console.log(colors.red('>>>> Synonyms: ') + definition.synonyms.join(', '))
            }

            if (definition.antonyms.length > 0) {
              console.log(colors.red('>>>> Synonyms: ') + definition.synonyms.join(', '))
            }
          })
        })

        console.log(colors.green('============================'))
        console.log(colors.green('Source: ') + sourceUrls[0])
        console.log(colors.green('============================'))
        break
      case 2:
        console.log('option 2')
        break
    }

    await pause()
  } while (opt !== 0)
}

main()
