function generateKey(reference) {
    console.log(reference)
    const authors = reference.author.split(" ")
    const year = reference.year.toString().substring(2)
    return `${authors[0]}${authors[1]}${year}`

}

export default generateKey
