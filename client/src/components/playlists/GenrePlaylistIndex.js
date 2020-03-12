import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";
import axios from "axios";
import styled from "styled-components";

const HoverDiv = styled.div`
  :hover {
    transform: translateY(-10px);
    cursor: pointer;
  }
`;

class GenrePlaylistIndex extends Component {
  state = { playlists: [] };

  componentDidMount() {
    axios
      .get(`/api/genres/${this.props.id}/genre_playlists`)
      .then(res => {
        this.setState({ playlists: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      console.log(this.props.id);

      axios
        .get(`/api/genres/${this.props.id}/genre_playlists`)
        .then(res => {
          this.setState({ playlists: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  renderPlaylists = () => {
    const { playlists } = this.state;
    let displayedPlaylists = playlists.slice(0, 5);
    return (
      <div>
        {displayedPlaylists.length > 0 ? (
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src="/playlists.png"
                  width={40}
                  height={40}
                  style={{ float: "left" }}
                />
                <p
                  style={{ fontSize: "20px", color: "#616161", float: "left" }}
                >
                  {this.props.genre} Playlists
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {displayedPlaylists.map(playlist => (
                <HoverDiv
                  style={{
                    marginLeft: "6px",
                    marginRight: "6px",
                    backgroundColor: "#353535",
                    boxShadow: "5px 5px 5px 5px #000000"
                  }}
                  key={playlist.id}
                >
                  <Grid.Column width={2}>
                    <a
                      href={playlist.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image width={175} height={200} src={playlist.image} />
                      <h1
                        style={{
                          color: "#616161",
                          fontSize: "20px",
                          textAlign: "center"
                        }}
                      >
                        {playlist.title}
                      </h1>
                    </a>
                  </Grid.Column>
                </HoverDiv>
              ))}
            </Grid.Row>
          </Grid>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px"
        }}
      >
        {this.renderPlaylists()}
      </div>
    );
  }
}

export default GenrePlaylistIndex;
