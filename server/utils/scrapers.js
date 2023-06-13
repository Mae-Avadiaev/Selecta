const puppeteer = require('puppeteer');
const timers = require('timers/promises')
const axios = require('axios')
const {stringify} = require('flatted');
const querystring = require('node:querystring');
//
// function getElementByXPath(path) {
//     return (new XPathEvaluator())
//         .evaluate(path, document.documentElement, null,
//             XPathResult.FIRST_ORDERED_NODE_TYPE, null)
//         .singleNodeValue;
// }
//
// function getXPathForElement(element) {
//     const idx = (sib, name) => sib
//         ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
//         : 1;
//     const segs = elm => !elm || elm.nodeType !== 1
//         ? ['']
//         : elm.id && document.getElementById(elm.id) === elm
//             ? [`id("${elm.id}")`]
//             : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
//     return segs(element).join('/');
// }

//
//
// async function requestFullInfo (accessToken, similarTracks) {
//
//     let mainInfo = []
//
//     //request info
//     for (const track of similarTracks) {
//         await axios.get(
//             'https://api.spotify.com/v1/tracks/' + track.id,
//             {
//                 headers: {
//                     Authorization: "Bearer " + accessToken,
//                 },
//             }
//         )
//             .then((res) => {mainInfo.push(res.data)})
//             .catch(err => console.log(err))
//     }
//
//     let audioFeatures = []
//
//     //request audio features
//     for (const track of similarTracks) {
//         await axios.get(
//             'https://api.spotify.com/v1/audio-features/' + track.id,
//             {
//                 headers: {
//                     Authorization: "Bearer " + accessToken,
//                 },
//             }
//         )
//             .then((res) => {audioFeatures.push(res.data)})
//             .catch(err => console.log(err))
//     }
//
//     const enhancedTracks = []
//
//     mainInfo.forEach((trackInfo, i) => {
//         enhancedTracks.push({
//             ...trackInfo,
//             audio_features: audioFeatures[i]
//         })
//     })
//
//     return(enhancedTracks)
// }

// module.exports = {
//     scrapeSimilarTracks,
//     requestFullInfo
// }

