import {MenuCaption, MenuIcon, StyledMenu, Subsection} from "./menu.styles";
import seedIcon from './../../images/seeds-icon1.png'
import heartIcon from './../../images/heart-icon.png'
import playlistIcon from './../../images/playlist-icon1.png'
import queueIcon from './../../images/queue-icon2.png'
import {HandWrittenCaptions} from "../landing/mobileLandind.styles";
import handWrittenCaptions from "../../images/hand-written-captions3.png";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const Menu = ({showCaptions}) => {

    // const showCaptions = window.location.href === 'http://192.168.1.98:3001/'
    // console.log(window.location.href)

    return (
        <StyledMenu>
            <Subsection to="/seeds">
                <MenuIcon src={seedIcon}/>
                <MenuCaption>Seeds</MenuCaption>
            </Subsection>
            <Subsection to="/queues">
                <MenuIcon src={queueIcon}/>
                <MenuCaption>Queues</MenuCaption>
            </Subsection>
            <Subsection to="/likes">
                <MenuIcon src={heartIcon}/>
                <MenuCaption>Likes</MenuCaption>
            </Subsection>
            <Subsection to="/playlists">
                <MenuIcon src={playlistIcon}/>
                <MenuCaption>Playlists</MenuCaption>
            </Subsection>
            {showCaptions ? <HandWrittenCaptions src={handWrittenCaptions}/> : null}
        </StyledMenu>
    )
}