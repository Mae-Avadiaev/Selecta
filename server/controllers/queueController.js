const catchAsync = require("./../utils/catchAsync");

exports.autoSortQueue = catchAsync(async (req, res, next) => {

    // let idsMeetRules = []
    // // const roundedBpm = (bpm - bpm % 5)
    //
    // //find all queues
    // const allQueues = await Playlist.findAll({editors: res.locals.user
    //
    // })
    //
    // const operators = {
    //     '>': (a, b) => a > b,
    //     '>=': (a, b) => a >= b,
    //     '<': (a, b) => a < b,
    //     '<=': (a, b) => a <= b,
    //     '=': (a, b) => a === b
    // }
    // const bpm = req.body.trackInfo.audio_features.tempo
    // const year = req.body.trackInfo.album.release_date.substring(0, 4)
    // console.log(year)
    // const decade = parseInt((year - (year % 10)).toString().substring(2))
    // console.log(decade)
    //
    //
    // allQueues.forEach((queue) => {
    //     const rules = queue.rules.split('&')
    //     rules.forEach((rule) => {
    //         const fragments = rule.split('_')
    //
    //         if (fragments[0] === 'all') {
    //             idsMeetRules.push({id: queue._id, name: queue.name})
    //
    //         } else if (fragments[0] === 'bpm') {
    //             if (fragments[1] === 'range') {
    //                 if (fragments[2] <= bpm && bpm < fragments[3]) {
    //                     idsMeetRules.push({id: queue._id, name: queue.name})
    //                 }
    //             } else {
    //                 if (operators[fragments[1]](bpm, fragments[2])) {
    //                     idsMeetRules.push({id: queue._id, name: queue.name})
    //                 }
    //             }
    //
    //         } else if (fragments[0] === 'date') {
    //             const now = new Date()
    //             if (fragments[1] === 'range') {
    //                 if (Date.parse(fragments[2]) <= now && now < Date.parse(fragments[3])) {
    //                     idsMeetRules.push({id: queue._id, name: queue.name})
    //                 }
    //             } else {
    //                 if (operators[fragments[1]](now, Date.parse(fragments[2]))) {
    //                     idsMeetRules.push({id: queue._id, name: queue.name})
    //                 }
    //             }
    //
    //         } else if (fragments[0] === 'decade') {
    //             if (fragments[1] === 'range') {
    //                 if (parseInt(fragments[2]) <= decade && decade < parseInt(fragments[3])) {
    //                     idsMeetRules.push({id: queue._id, name: queue.name})
    //                 }
    //             } else {
    //                 if (operators[fragments[1]](decade, parseInt(fragments[2]))) {
    //                     idsMeetRules.push({id: queue._id, name: queue.name})
    //                 }
    //             }
    //         }
    //     })
    //
    // })


    //build sort system
    //find queue id
    // if (roundedBpm >= 125) {
    //     res.locals.queueId = '3JoQ7neDY0Xrv7YUAtWlgU'
    // } else if (roundedBpm === 120) {
    //     res.locals.queueId = '3Dj56ov5mrqwye1V1tljVX'
    // } else if (roundedBpm === 115) {
    //     res.locals.queueId = '4JeE9Qu7Ilk2hTYw1G9zVM'
    // } else if (roundedBpm === 110) {
    //     res.locals.queueId = '5X2mN6XjH05RfzpQHhzXVG'
    // } else if (roundedBpm === 105) {
    //     res.locals.queueId = '3xQBHE1e6iyb1clWBXWBuL'
    // } else if (roundedBpm === 100) {
    //     res.locals.queueId = '2qKEW599iNnb8XGuojpHGS'
    // } else if (roundedBpm === 95) {
    //     res.locals.queueId = '53thFf47lLnf6lzCeUub9h'
    // } else if (roundedBpm < 95)
    //     res.locals.queueId = '51DiMIhRQ6QfvdE6icQtdM'

    next()
})