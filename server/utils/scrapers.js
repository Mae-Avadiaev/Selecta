const puppeteer = require('puppeteer');
const timers = require('timers/promises')
const axios = require('axios')
const {stringify} = require('flatted');
const querystring = require('node:querystring');

function getElementByXPath(path) {
    return (new XPathEvaluator())
        .evaluate(path, document.documentElement, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
}

function getXPathForElement(element) {
    const idx = (sib, name) => sib
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
    return segs(element).join('/');
}

async function scrapeSimilarTracks(track) {

    // prepare browser url
    // const artistsArray = spotifyTracks[i].track.artists.map((artist =>
    //     artist.name))
    // const artistsString = artistsArray.join('-').replace(' ', '-')
    // const songFullTitle = (spotifyTracks[i].track.name.replace(' ', '-') + '-' + artistsString)
    //     .replace(/[^a-zA-Z0-9-]/g, '')

    const browser = await puppeteer.launch({
        headless : false,
        devtools : false,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(0)

    // find the track
    await page.goto('https://tunebat.com/Info/' + track.songFullTitle + '/' + track.spotifyId, {timeout: 0, waitUntil: 'networkidle2'});
    await timers.setTimeout(8000)


    // const songFullTitle = track.

    // await page.waitForSelector('input');
    // console.log('1')
    // await page.$eval('input',
    //     (el, value) => el.value = value, track.songFullTitle);
    // console.log('2')
    //
    // // const button = document.querySelector('#header > div > div.ant-col.ant-col-md-10.ant-col-lg-12 > span > span > span > button')
    // // console.log(button)
    //
    // console.log('3')
    //
    // await Promise.all([
    //     page.click('#header > div > div.ant-col.ant-col-md-10.ant-col-lg-12 > span > span > span > button'),
    //     page.waitForNavigation(),
    // ]);
    // await timers.setTimeout(10000)

// /html/body/div[2]/section/section/main/div/div[2]/div[2]/div[2]/div[1]/a/div/div[2]/div/div[3]/p[1]
    await page.exposeFunction('getXPathForElement', getXPathForElement);
    await page.exposeFunction('getElementByXPath', getElementByXPath);

// /html/body/div[2]/section/section/main/div/div[2]/div[2]/div[3]/

    // await page.click('a')
    // await timers.setTimeout(10000)
    // await Promise.all([
    //     page.click('div[class=.ant-col.ant-col-xs-23.ant-col-md-21 > a'),
    //     page.waitForNavigation(),
    // ]);

    // await page.goto(url, {timeout: 0, waitUntil: 'networkidle2'});
    // // await timers.setTimeout(10000)
    //
    const similarTracks = await page.evaluate( () => {

        let similarTracks = []

        document.querySelectorAll('a[tabindex = "0"]').forEach((a, i) => {
            let link = a.href
            if (link.match("spotify")) {

                const bpm = a.parentElement.previousSibling.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.textContent

                similarTracks.push({
                    link: link,
                    // id: link.substring(31),
                    uri: 'spotify:track:' + link.substring(31),
                    bpm: bpm
                })
            }
        })
        return (similarTracks)
    })

    // await timers.setTimeout(50000)

    await browser.close();

    return (similarTracks)
}

async function requestFullInfo (accessToken, similarTracks) {

    let mainInfo = []

    //request info
    for (const track of similarTracks) {
        await axios.get(
            'https://api.spotify.com/v1/tracks/' + track.id,
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
            .then((res) => {mainInfo.push(res.data)})
            .catch(err => console.log(err))
    }

    let audioFeatures = []

    //request audio features
    for (const track of similarTracks) {
        await axios.get(
            'https://api.spotify.com/v1/audio-features/' + track.id,
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
            .then((res) => {audioFeatures.push(res.data)})
            .catch(err => console.log(err))
    }

    const enhancedTracks = []

    mainInfo.forEach((trackInfo, i) => {
        enhancedTracks.push({
            ...trackInfo,
            audio_features: audioFeatures[i]
        })
    })

    return(enhancedTracks)
}

module.exports = {
    scrapeSimilarTracks,
    requestFullInfo
}

