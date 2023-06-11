import {Outlet, useNavigate} from "react-router-dom";
import {StyledLink, StyledHeader, Links, Logo, SpotifyLogo, UserAvatar, LinkStroke} from "./header.styles";
import spotifyLogo from "../../images/spotify-logo.png"
import {useState} from "react";
import selectaLogo1 from "./../../images/selecta-logo1.png"
import selectaLogo2 from "./../../images/selecta-logo2.png"
import selectaLogo3 from "./../../images/selecta-logo3.png"

const Header = ({user}) => {

    const navigate = useNavigate()
    const [page, setPage] = useState("none")

    return (
        <StyledHeader>
            <Logo to="/"><img src={selectaLogo3}/> </Logo>
            <Links>
                {/*<div>*/}
                    <StyledLink to="/seeds"
                                onClick={() => setPage("seeds")}
                                streched={page === "seeds"}
                    >Seeds
                        <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg">
                            <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                                  stroke="CECECEFF" fill="none" stroke-width="1.8px"></path>
                        </LinkStroke>
                    </StyledLink>
                {/*</div>*/}
                <StyledLink to="/queues"
                            onClick={() => setPage("queues")}
                            streched={page === "queues"}
                >Queues
                    <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"-3px"}>
                        <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                              stroke="CECECEFF" fill="none" stroke-width="1.5px"></path>
                    </LinkStroke>
                </StyledLink>
                <StyledLink to="/likes"
                            onClick={() => setPage("likes")}
                            streched={page === "likes"}
                >Likes
                    <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"1px"} customWidth={"140%"} customLeft={"-20%"} customTransform={"scale(1, 1.2)"}>
                        <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                              stroke="CECECEFF" fill="none" stroke-width="1.6px"></path>
                    </LinkStroke>
                </StyledLink>
                <StyledLink to="/collection"
                            onClick={() => setPage("playlists")}
                            streched={page === "playlists"}
                >Playlists
                    <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"-5px"} >
                        <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                              stroke="CECECEFF" fill="none" stroke-width="1.2px"></path>
                    </LinkStroke>
                </StyledLink>
                <StyledLink to="/showcase"
                            onClick={() => setPage("showcase")}
                            streched={page === "showcase"}
                >Showcase
                    <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"-8px"} customWidth={"110%"} customLeft={"-5%"}>
                        <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                              stroke="CECECEFF" fill="none" stroke-width="1.2px"></path>
                    </LinkStroke>
                </StyledLink>
            </Links>
            {user && user.avatarUrl ?
                <UserAvatar onClick={() => {navigate("/account")}}
                            src={user.avatarUrl} alt="User avatar"/>
                :
                <SpotifyLogo onClick={() => {navigate("/account")}}
                src={spotifyLogo} alt="Spotify Logo"/>
            }
        </StyledHeader>
    )
};

export default Header;