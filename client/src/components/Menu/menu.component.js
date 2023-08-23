import {MenuCaption, MenuIcon, StyledMenu, Subsection} from "./menu.styles";
import seedIcon from './../../images/seeds-icon1.png'
import heartIcon from './../../images/heart-icon.png'
import playlistIcon from './../../images/playlist-icon1.png'
import queueIcon from './../../images/queue-icon2.png'
import handWrittenCaptions from "../../images/hand-written-captions3.png";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSlidingWindow} from "../../hooks/useSlidingWindow";

export const Menu = ({showCaptions}) => {

    // const showCaptions = window.location.href === 'http://192.168.1.98:3001/'
    // console.log(window.location.href)

    const {openSlidingWindow} = useSlidingWindow()

    return (
        <StyledMenu>
            <Subsection to="/listen/likes">
                <MenuIcon src={seedIcon}/>
                <MenuCaption>listen</MenuCaption>
            </Subsection>
            <Subsection to="/play">
                <MenuIcon src={queueIcon}/>
                <MenuCaption>play</MenuCaption>
            </Subsection>
            <Subsection to="/profile">
                <MenuIcon src={playlistIcon}/>
                <MenuCaption>profile</MenuCaption>
            </Subsection>
            <Subsection onClick={() => openSlidingWindow(<h1>TTTTTTT</h1>)}>
                <MenuIcon src={playlistIcon}/>
                <MenuCaption>?</MenuCaption>
            </Subsection>
            {/*{showCaptions ? <HandWrittenCaptions src={handWrittenCaptions}/> : null}*/}
        </StyledMenu>
    )
}