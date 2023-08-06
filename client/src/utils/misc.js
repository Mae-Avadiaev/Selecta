export const convertKeyCamelot = (key, mode) => {
    // console.log(key, mode, 'gg')
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
    if (key === '8B') return {target_key: 0, target_mode: 1}
    if (key === '3B') return {target_key: 1, target_mode: 1}
    if (key === '10B') return {target_key: 2, target_mode: 1}
    if (key === '5B') return {target_key: 3, target_mode: 1}
    if (key === '12B') return {target_key: 4, target_mode: 1}
    if (key === '7B') return {target_key: 5, target_mode: 1}
    if (key === '2B') return {target_key: 6, target_mode: 1}
    if (key === '9B') return {target_key: 7, target_mode: 1}
    if (key === '4B') return {target_key: 8, target_mode: 1}
    if (key === '11B') return {target_key: 9, target_mode: 1}
    if (key === '6B') return {target_key: 10, target_mode: 1}
    if (key === '1B') return {target_key: 11, target_mode: 1}

    if (key === '5A') return {target_key: 0, target_mode: 0}
    if (key === '12A') return {target_key: 1, target_mode: 0}
    if (key === '7A') return {target_key: 2, target_mode: 0}
    if (key === '2A') return {target_key: 3, target_mode: 0}
    if (key === '9A') return {target_key: 4, target_mode: 0}
    if (key === '4A') return {target_key: 5, target_mode: 0}
    if (key === '11A') return {target_key: 6, target_mode: 0}
    if (key === '6A') return {target_key: 7, target_mode: 0}
    if (key === '1A') return {target_key: 8, target_mode: 0}
    if (key === '8A') return {target_key: 9, target_mode: 0}
    if (key === '3A') return {target_key: 10, target_mode: 0}
    if (key === '10A') return {target_key: 11, target_mode: 0}
}

export const findNeighbourKeys = (key, mode) => {
    let neighbourCamelotKeys = []
    // console.log(key, 'key')
    const camelotKey = convertKeyCamelot(parseInt(key), mode)
    // console.log(camelotKey)

    const number = parseInt(camelotKey)
    // console.log(number, 'number')
    const letter = camelotKey.slice(-1)
    let anotherLetter
    // console.log(letter, 'letter')
    anotherLetter = letter === 'A' ? 'B' : 'A'

    if (number === 1) {
        neighbourCamelotKeys.push(12 + letter, 2 + letter, 1 + anotherLetter)
    } else if (number === 12) {
        neighbourCamelotKeys.push(11 + letter, 1 + letter, 12 + anotherLetter)
    } else {
        neighbourCamelotKeys.push(number - 1 + letter, number + 1 + letter, number + anotherLetter)
    }

    // console.log(neighbourCamelotKeys.map(key => convertKeySpotify(key)))

    return neighbourCamelotKeys.map(key => convertKeySpotify(key))
}