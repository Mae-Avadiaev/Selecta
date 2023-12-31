import {MenuCaption, MenuIcon, StyledMenu, Subsection} from "./menu.styles";
import seedIcon from './../../images/seeds-icon1.png'
import heartIcon from './../../images/heart-icon.png'
import playlistIcon from './../../images/playlist-icon1.png'
import queueIcon from './../../images/queue-icon2.png'
import handWrittenCaptions from "../../images/hand-written-captions3.png";
import {useLocation} from "react-router-dom";
import headphonesIcon from "../../images/headphones-icon7.png"
import playIcon from "../../images/play-icon4.png"
import questionMarkIcon from "../../images/questionmark-icon7.png"
import statisticIcon from "../../images/statistics-icon7.png"
import selectIcon from "../../images/selecta-logo-new.png"
import React, {useEffect, useState} from "react";
import {useSlidingWindow} from "../../hooks/useSlidingWindow";
import {PlayingTrack} from "../playingTrack/playingTrack.component";

export const Menu = () => {

    // const showCaptions = window.location.href === 'http://192.168.1.98:3001/'
    // console.log(window.location.href)
    // console.log('h')

    const {openSlidingWindow} = useSlidingWindow()

    return (
        <StyledMenu>
            <Subsection to="/add">
                <MenuIcon src={headphonesIcon}/>
                <MenuCaption>new</MenuCaption>
            </Subsection>
            {/*<Subsection to="/selected">*/}
            {/*    <MenuIcon src={selectIcon}/>*/}
            {/*    <MenuCaption>selected</MenuCaption>*/}
            {/*</Subsection>*/}
            {/*<Subsection to="/play">*/}
            {/*    <MenuIcon src={playIcon}/>*/}
            {/*    <MenuCaption>collection</MenuCaption>*/}
            {/*</Subsection>*/}
            <Subsection to="/profile">
                <MenuIcon src={statisticIcon}/>
                <MenuCaption>me</MenuCaption>
            </Subsection>
            <Subsection onClick={() => openSlidingWindow(
                <PlayingTrack/>
            )}>
                <MenuIcon src={questionMarkIcon}/>
                <MenuCaption>what</MenuCaption>
            </Subsection>
            {/*{showCaptions ? <HandWrittenCaptions src={handWrittenCaptions}/> : null}*/}
        </StyledMenu>
    )
}