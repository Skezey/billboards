import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import MainBanner from "../shared/MainBanner";
import Styles from "../styles/ArtistStyles";

class TopArtists extends Component {
  state = { artists: [] };

  componentDidMount() {
    axios
      .get("api/artists")
      .then(res => {
        this.setState({ artists: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderArtists = () => {
    const { artists } = this.state;
    let topHundred = artists.slice(0, 100);
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Rank</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {topHundred.map(artist => (
              <Table.Row key={artist.id} style={Styles.rowStyle}>
                <Table.Cell>
                  <Link
                    to={{
                      pathname: `/artists/${artist.name.toLowerCase()}`,
                      state: { artist: artist, id: this.props.id }
                    }}
                  >
                    {artist.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{artist.rank}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  };

  render() {
    return (
      <div>
        <MainBanner />
        <div style={Styles.tableStyle}>
          <h1>Top 100</h1>
          {this.renderArtists()}
        </div>
      </div>
    );
  }
}

export default TopArtists;
