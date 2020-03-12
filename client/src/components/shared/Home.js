import React from "react";
import MainBanner from "./MainBanner";
import styled from "styled-components";
import TopThreeArtists from "../artists/TopThreeArtists";
import PlaylistIndex from "../playlists/PlaylistIndex";
import Styles from "../styles/HomeStyles";
import { Responsive, Image, Grid } from "semantic-ui-react";
import GenreIndex from "../genres/GenreIndex";

const MainContainer = styled.div`
  font-size: 17px;
  padding: 0px 10px;
  text-align: center;
  transform: translateY(450px);
  width: 1500px;
`;

const Home = () => (
  <div>
    <div>
      <Image
        style={Styles.LargeImage}
        src="/Headphones_Stereo_Blue_3840x2160.jpg"
        fluid
      />
      <h1 style={Styles.MainText}>Top EDM</h1>
    </div>
    <br />
    <MainContainer>
      <Responsive as={Grid} minWidth={900}>
        <Grid.Row>
          <Grid.Column width={10}>
            <GenreIndex />
            <p style={Styles.Header}>
              <strong>Artist Highlight</strong>
            </p>
            <TopThreeArtists />
          </Grid.Column>
          <Grid.Column width={6}>
            <PlaylistIndex />
          </Grid.Column>
        </Grid.Row>
      </Responsive>
    </MainContainer>
  </div>
);

export default Home;
