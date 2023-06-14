export const autoSort = (allLists, track) => {

    let idsMeetRules = []

    const operators = {
        '>': (a, b) => a > b,
        '>=': (a, b) => a >= b,
        '<': (a, b) => a < b,
        '<=': (a, b) => a <= b,
        '=': (a, b) => a === b
    }
    const bpm = track.bpm
    const year = track.album.release_date.substring(0, 4)
    console.log(year)
    const decade = parseInt((year - (year % 10)).toString().substring(2))
    console.log(decade)


    allLists.forEach((list) => {
        const rules = list.rules.split('&')
        rules.forEach((rule) => {
            const fragments = rule.split('_')

            if (fragments[0] === 'all') {
                idsMeetRules.push({id: list._id, name: list.name})

            } else if (fragments[0] === 'bpm') {
                if (fragments[1] === 'range') {
                    if (fragments[2] <= bpm && bpm < fragments[3]) {
                        idsMeetRules.push({id: list._id, name: list.name})
                    }
                } else {
                    if (operators[fragments[1]](bpm, fragments[2])) {
                        idsMeetRules.push({id: list._id, name: list.name})
                    }
                }

            } else if (fragments[0] === 'date') {
                const now = new Date()
                if (fragments[1] === 'range') {
                    if (Date.parse(fragments[2]) <= now && now < Date.parse(fragments[3])) {
                        idsMeetRules.push({id: list._id, name: list.name})
                    }
                } else {
                    if (operators[fragments[1]](now, Date.parse(fragments[2]))) {
                        idsMeetRules.push({id: list._id, name: list.name})
                    }
                }

            } else if (fragments[0] === 'decade') {
                if (fragments[1] === 'range') {
                    if (parseInt(fragments[2]) <= decade && decade < parseInt(fragments[3])) {
                        idsMeetRules.push({id: list._id, name: list.name})
                    }
                } else {
                    if (operators[fragments[1]](decade, parseInt(fragments[2]))) {
                        idsMeetRules.push({id: list._id, name: list.name})
                    }
                }
            }
        })
    })

    return idsMeetRules
}