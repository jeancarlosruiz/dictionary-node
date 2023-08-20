import fs from 'node:fs'
import axios from 'axios'

class Search {
  historial = []
  path = './db/historial.json'

  constructor () {
    this.readDB()
  }

  async searchWord (word) {
    try {
      // https://api.dictionaryapi.dev/api/v2/entries/en/
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

      return data[0]
    } catch (error) {
      console.log(error)
    }
  }

  saveWord (word) {
    if (this.historial.includes(word)) return

    this.historial = this.historial.splice(0, 5)

    this.historial.unshift(word)

    this.saveDB()
  }

  saveDB () {
    const payload = {
      historial: this.historial
    }

    fs.writeFileSync(this.path, JSON.stringify(payload))
  }

  readDB () {
    if (!fs.existsSync(this.path)) return

    const info = fs.readFileSync(this.path, { encoding: 'utf-8' })
    const data = JSON.parse(info)

    this.historial = data.historial
  }
}

export default Search
