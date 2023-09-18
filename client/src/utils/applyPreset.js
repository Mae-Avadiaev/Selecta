// export const applyPreset = async (selectedParams, setSelectedParams, navigate) => {
//
//     // count preset percent params
//     const relativeParams = {
//         minBpm: selectedParams.params.minBpm - selectedParams.track.bpm,
//         maxBpm: selectedParams.params.maxBpm - selectedParams.track.bpm,
//         minEnergy: (selectedParams.params.minEnergy - selectedParams.track.energy).toFixed(2),
//         maxEnergy: (selectedParams.params.maxEnergy - selectedParams.track.energy).toFixed(2),
//         minDanceability: (selectedParams.params.minDanceability - selectedParams.track.danceability).toFixed(2),
//         maxDanceability: (selectedParams.params.maxDanceability - selectedParams.track.danceability).toFixed(2),
//         minInstrumentalness: (selectedParams.params.minInstrumentalness - selectedParams.track.instrumentalness).toFixed(2),
//         maxInstrumentalness: (selectedParams.params.maxInstrumentalness - selectedParams.track.instrumentalness).toFixed(2),
//         minAcousticness: (selectedParams.params.minAcousticness - selectedParams.track.acousticness).toFixed(2),
//         maxAcousticness: (selectedParams.params.maxAcousticness - selectedParams.track.acousticness).toFixed(2),
//         minValence: (selectedParams.params.minValence - selectedParams.track.valence).toFixed(2),
//         maxValence: (selectedParams.params.maxValence - selectedParams.track.valence).toFixed(2),
//         minPopularity: (selectedParams.params.minPopularity - selectedParams.track.popularity),
//         maxPopularity: (selectedParams.params.maxPopularity - selectedParams.track.popularity)
//     }
//
//     Object.assign(selectedParams.params, relativeParams)
//     Object.assign(selectedParams.params, {lastUse: new Date()})
//
//     // // create preset
//     // const response = await createPreset(selectedParams.params)
//     // await mutatePresets([response.data.preset, 'add'])
//
//     setSelectedParams(prevState => { return {
//         ...prevState,
//         preset: selectedParams.params,
//         fetch: true
//     }})
//
//     navigate('/add/results')
// }