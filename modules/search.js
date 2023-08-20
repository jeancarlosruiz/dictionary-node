import axios from 'axios'
import colors from 'colors'

class Search {
  // TODO:
//   constructor () {
  // this.searchWord()
//   }

  async searchWord (word) {
    try {
      // https://api.dictionaryapi.dev/api/v2/entries/en/
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

      return data[0]
    } catch (error) {
      console.log(error)
    }
  }

  //   async meanings () {
  //     const { meanings } = await this.searchWord()

  //     meanings.forEach(meaning => {
  //       const { partOfSpeech, definitions } = meaning

//       console.log(colors.green('============================'))
//       console.log(colors.green('Part of speech: ') + partOfSpeech)
//       console.log(colors.green('============================'))
//       console.log(colors.green('Definitions:'))
//       definitions.slice(0, 3).forEach((definition) => {
//         console.log(colors.green('➡️ ') + definition.definition)
//       })
//     })
//   }
}

export default Search
