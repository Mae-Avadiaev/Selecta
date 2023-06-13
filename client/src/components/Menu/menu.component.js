import {MenuCaption, MenuIcon, StyledMenu, Subsection} from "./menu.styles";
import seedIcon from './../../images/seed-icon.png'
import heartIcon from './../../images/heart-icon.png'
import playlistIcon from './../../images/playlists-icon.png'

export const Menu = () => {
    return (
        <StyledMenu>
            <Subsection>
                <MenuIcon src={seedIcon}/>
                <MenuCaption>Seeds</MenuCaption>
            </Subsection>
            <Subsection>
                <MenuIcon src={heartIcon}/>
                <MenuCaption>Queues</MenuCaption>
            </Subsection>
            <Subsection>
                <MenuIcon src={heartIcon}/>
                <MenuCaption>Likes</MenuCaption>
            </Subsection>
            <Subsection>
                <MenuIcon src={playlistIcon}/>
                <MenuCaption>Playlists</MenuCaption>
            </Subsection>
        </StyledMenu>
    )
}