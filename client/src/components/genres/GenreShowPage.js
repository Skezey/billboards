import React, { Component } from "react";
import ArtistIndex from "../artists/ArtistIndex";
import GenrePlaylistIndex from "../playlists/GenrePlaylistIndex";
import { Header } from "semantic-ui-react";

class GenreShowPage extends Component {
  state = { genre: this.props.genre, editing: false };

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  componentWillReceiveProps(nextProps) {
    this.setState({ genre: nextProps.genre });
  }

  render() {
    return (
      <div
        style={{
          minHeight: "800px"
        }}
      >
        <Header
          style={{
            fontSize: "40px",
            color: "white"
          }}
        >
          {this.state.genre.title}
        </Header>
        <div style={{ marginLeft: "-2px" }}>
          <GenrePlaylistIndex
            genre={this.state.genre.title}
            id={this.props.genre.id}
          />
        </div>
        <br />
        <ArtistIndex id={this.props.genre.id} />
      </div>
    );
  }
}

export default GenreShowPage;
