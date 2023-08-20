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
        await search.searchWord(wordSearched)

        // console.log(search.data)

        if (search.data.length > 0) {
          const { word, meanings, sourceUrls } = search.data[0]

          search.saveWord(word)

          console.log(colors.green('============================'))
          console.log(colors.green('Word: ') + word)
          console.log(colors.green('============================'))

          console.log(colors.green('Meanings:'))

          meanings.forEach(meaning => {
            const { partOfSpeech, definitions } = meaning

            console.log(colors.green('============================'))
            console.log(colors.green('Part of speech: ') + partOfSpeech)
            console.log(colors.green('============================'))
            console.log(colors.green('Definitions:'))
            definitions.slice(0, 3).forEach((definition) => {
              console.log('➡️  ' + colors.blue(definition.definition))

              if (definition.synonyms.length > 0) {
                console.log(colors.red('>>>> Synonyms: ') + definition.synonyms.join(', '))
              }

              if (definition.antonyms.length > 0) {
                console.log(colors.red('>>>> Antonyms: ') + definition.synonyms.join(', '))
              }
            })
          })

          console.log(colors.green('============================'))
          console.log(colors.green('Source: ') + sourceUrls[0])
          console.log(colors.green('============================'))
        } else {
          const { title, message, resolution } = search.data

          console.log(colors.red('============================'))
          console.log(`${colors.red(title)} 😭`)
          console.log(colors.red('============================'))
          console.log(colors.white(message))
          console.log(colors.white(resolution))
          console.log(colors.red('============================'))
        }

        break
      case 2:
        if (search.historial.length === 0) {
          console.log('➡️  No search history 😭')
          console.log('➡️  Try searching for a word first 😊')
        } else {
          search.historial.forEach((word, i) => {
            const index = `${i + 1}.`.green
            console.log(`${index} ${word}`)
          })
        }
        break
    }

    await pause(opt)
  } while (opt !== 0)
}

main()
