import React, { Component } from "react";
import SongsIndex from "../songs/SongsIndex";
import { Image, Grid } from "semantic-ui-react";

class ArtistShowPage extends Component {
  render() {
    const { artist } = this.props;
    console.log(artist);
    return (
      <div
        style={{
          backgroundColor: "#1F2833",
          boxShadow: "5px 5px 5px 5px #000000",
          color: "white",
          fontSize: "18px",
          marginTop: "20px"
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image fluid src={artist.main_img} alt={artist.name} />
            </Grid.Column>
            <Grid.Column width={13}>
              <h1>{artist.name}</h1>
              <p>{artist.description}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ArtistShowPage;
