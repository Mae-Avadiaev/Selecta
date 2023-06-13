import {Iframe, StyledSeedPage, StyledInput, SecondaryText} from "./seedsPage.styles";
import {useEffect, useState} from "react";
import {Carousel} from "../carousel/carousel.component";

import data from "../../myjsonfile.json"
// import {request} from "../../utils/request";
import {Route} from "react-router-dom";
import Home from "../home/home.component";
import AddToCollection from "../addToCollection/addToCollection.component";
import Account from "../account/account.component";
import Page404 from "../404page/404page.component";
import {SeedsPageItem} from "../seedsPageItem/seedsPageItem.component";


const SeedPage = ({seedBrowserFolder, setSeedBrowserFolder, queueBrowserFolder, setQueueBrowserFolder}) => {

    const [link, setLink] = useState('')
    const [similarTracks, setSimilarTracks] = useState()
    const [loading, setLoading] = useState(false)

    // if (!seedBrowserFolder)
    //     request('seedBrowserFolder')
    //         .then((folder) => {setSeedBrowserFolder(folder)})
    // if (!queueBrowserFolder)
    //     request('queueBrowserFolder')
    //         .then((folder) => {setQueueBrowserFolder(folder)})

    //test cases
    useEffect(() => {setSimilarTracks(data)}, [])

    const handleChange = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //check link
        //do stuff
        setLoading(true)
        fetch('http://localhost:3000/similar-tracks?link=' + link)
            .then((response) => response.json())
            .then((tracks) => {
                setSimilarTracks(tracks)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <StyledSeedPage>

            {loading ?
                <Iframe
                    title="Loading..." src="https://giphy.com/embed/A6Q5SsRmlRlmqLYsKK"
                    frameBorder="0" className="giphy-embed" allowFullScreen
                />

            //starting screen
            : similarTracks === undefined ?
                // <>
                //     <SeedsPageItem image={} caption="Start from a new track"/>
                        //Seed Pool
                //     <SeedsPageItem image={} caption="Start from a track you previously added"/>
                        //Feed
                //     <SeedsPageItem image={} caption="Check new releases from the artists that you subscribed on"/>
                // </>
                //


                <form onSubmit={handleSubmit}>
                    <SecondaryText>Let's start with the link</SecondaryText>
                    <StyledInput onChange={handleChange}/>
                </form>

            //tracks screen
            :
                <Carousel tracksInfo={similarTracks}/>
            }
        </StyledSeedPage>
    );
};

export default SeedPage;