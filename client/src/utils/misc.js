export const convertKeyCamelot = (key, mode) => {
    if (key === 0 && mode) return '8B'
    if (key === 1 && mode) return '3B'
    if (key === 2 && mode) return '10B'
    if (key === 3 && mode) return '5B'
    if (key === 4 && mode) return '12B'
    if (key === 5 && mode) return '7B'
    if (key === 6 && mode) return '2B'
    if (key === 7 && mode) return '9B'
    if (key === 8 && mode) return '4B'
    if (key === 9 && mode) return '11B'
    if (key === 10 && mode) return '6B'
    if (key === 11 && mode) return '1B'

    if (key === 0 && !mode) return '5A'
    if (key === 1 && !mode) return '12A'
    if (key === 2 && !mode) return '7A'
    if (key === 3 && !mode) return '2A'
    if (key === 4 && !mode) return '9A'
    if (key === 5 && !mode) return '4A'
    if (key === 6 && !mode) return '11A'
    if (key === 7 && !mode) return '6A'
    if (key === 8 && !mode) return '1A'
    if (key === 9 && !mode) return '8A'
    if (key === 10 && !mode) return '3A'
    if (key === 11 && !mode) return '10A'
}

export const findDecade = (year) => {
    const half = year.substring(2) % 10 < 5 ? 'I' : "II"
    return (year.substring(2) - year.substring(2) % 10) + 's' + ' ' + half
}

const convertKeySpotify = (key) => {
    if (key === '8B') return {key: 0, mode: 1}
    if (key === '3B') return {key: 1, mode: 1}
    if (key === '10B') return {key: 2, mode: 1}
    if (key === '5B') return {key: 3, mode: 1}
    if (key === '12B') return {key: 4, mode: 1}
    if (key === '7B') return {key: 5, mode: 1}
    if (key === '2B') return {key: 6, mode: 1}
    if (key === '9B') return {key: 7, mode: 1}
    if (key === '4B') return {key: 8, mode: 1}
    if (key === '11B') return {key: 9, mode: 1}
    if (key === '6B') return {key: 10, mode: 1}
    if (key === '1B') return {key: 11, mode: 1}

    if (key === '5A') return {key: 0, mode: 0}
    if (key === '12A') return {key: 1, mode: 0}
    if (key === '7A') return {key: 2, mode: 0}
    if (key === '2A') return {key: 3, mode: 0}
    if (key === '9A') return {key: 4, mode: 0}
    if (key === '4A') return {key: 5, mode: 0}
    if (key === '11A') return {key: 6, mode: 0}
    if (key === '6A') return {key: 7, mode: 0}
    if (key === '1A') return {key: 8, mode: 0}
    if (key === '8A') return {key: 9, mode: 0}
    if (key === '3A') return {key: 10, mode: 0}
    if (key === '10A') return {key: 11, mode: 0}
}

export const findNeighbourKeys = (key) => {
    let neighbourCamelotKeys = []

    const camelotKey = convertKeyCamelot(key)

    const number = parseInt(camelotKey)
    console.log(number, 'number')
    const letter = camelotKey.slice(-1)
    let anotherLetter
    console.log(letter, 'letter')
    anotherLetter = letter === 'A' ? 'B' : 'A'

    if (number === 1) {
        neighbourCamelotKeys.push(12 + letter, 2 + letter, 1 + anotherLetter)
    } else if (number === 12) {
        neighbourCamelotKeys.push(11 + letter, 1 + letter, 12 + anotherLetter)
    } else {
        neighbourCamelotKeys.push(number - 1 + letter, number + 1 + letter, number + anotherLetter)
    }

    const allKeys = neighbourCamelotKeys.map(key => convertKeySpotify(key))
    return allKeys
}