exports.findDecade = (year) => {
    return (year.substring(2) - (year.substring(2) % 10)) + 's'
}

exports.getRepresentationInSec = (durationMs) => {
    return (Math.round(trackInfo.duration_ms / 1000) / 60) + ':'
        + (Math.round(trackInfo.duration_ms / 1000) % 60)
}

exports.getCamelot = (key, mode) => {

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

exports.getClasic = (key, mode) => {
    let modeConverted
    if (mode) modeConverted = 'maj'
    else modeConverted = 'min'

    if (key === 0) return 'C ' + modeConverted
    if (key === 1) return 'C# ' + modeConverted
    if (key === 2) return 'D ' + modeConverted
    if (key === 3) return 'D# ' + modeConverted
    if (key === 4) return 'E ' + modeConverted
    if (key === 5) return 'F ' + modeConverted
    if (key === 6) return 'F# ' + modeConverted
    if (key === 7) return 'G ' + modeConverted
    if (key === 8) return 'G# ' + modeConverted
    if (key === 9) return 'A ' + modeConverted
    if (key === 10) return 'A# ' + modeConverted
    if (key === 11) return 'B ' + modeConverted
}

exports.getEnergyPoints = (energy) => {
    return Math.round(energy * 100 / 20)
}

exports.getVocals = (instrumentalness) => {
    if (instrumentalness > 0.5) return '0'
    else return '1'
}