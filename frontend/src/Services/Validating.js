function pattern(field) {
    switch(field) {
      case "author": {
        const part = /\b(?!and\s*)[\w\}\{\\'"\-ÄäÖöÅå]+\.?,?/ //eslint-disable-line
        const name = `${part.source}( ${part.source}){1,4}`
        const author = `^${name}( and ${name})*$`
        return author
      }
      case "year": {
        const year = /^\D*\d{1,4}(\D+\d{1,4})*\D*$/
        return year.source
      }
      default:
        return ".+"
    }
  }

export default pattern