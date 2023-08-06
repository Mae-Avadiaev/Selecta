import styled from "styled-components";
import {ColumnFlexContainer, RowFlexContainer, secondaryTextColor} from "../../app.styles";

export const StyledPlaylist = styled(RowFlexContainer)`
  width: 100%;
  //background-color: #2b283a;
  //justify-content: center;
  //align-items: center;
  position: relative;
  margin-bottom: 30px;
`

export const PlaylistMainContentContainer = styled(ColumnFlexContainer)`
  width: 80%;
  justify-content: center;
  //background-color: red;
`

export const PlaylistCover = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 10px;
`

export const PlaylistInfoContainer = styled(ColumnFlexContainer)`
  justify-content: space-between;
  width: calc(100% - 60px - 15px);
  //background-color: white;
`

export const PlaylistTitle = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  //width: 100%;
  margin: 0 0 0 0;
  //background-color: white;
`

export const PlaylistDetail = styled.p`
  margin: 0 0;
  font-size: 0.8em;
`

export const PlaylistTagsContainer = styled(RowFlexContainer)`
  justify-content: space-between;
`

export const PlaylistTagContainer = styled.div`
  margin: 0 7px 14px 0;
  width: fit-content;
  height: fit-content;

  position: relative;
  border-radius: 10px;
  padding: 0 15px;
  border: 1px #2b283a solid;
  //filter: drop-shadow(0 0 0.5rem #d5d5d5);
  //background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${secondaryTextColor};
  text-align: center;
  color: #2b283a;
`

export const PlaylistTag = styled.p`
  margin: 4px 0;
  font-size: 0.8em;
`

export const PlaylistAmountContainer = styled(ColumnFlexContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PlaylistTrackAmount = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
`

export const PlaylistCaption = styled.p`
  font-size: 0.8em;
  margin: 0 0 0px 0;
`

export const GenresContainer = styled(RowFlexContainer)`
  justify-content: left;
  margin-top: 15px;
  width: calc(100%);
  //background-color: darkgrey;
`

export const PlaylistDurationContainer = styled(ColumnFlexContainer)`
  width: 20%;
  justify-content: space-between;
  align-items: center;
  height: auto;
  //background-color: greenyellow;
`

export const PlaylistMenu = styled.img`
  width: 30px;
  margin-top: 0px;
  margin-bottom: 12px;
`