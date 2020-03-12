import React, { Component } from "react";
import axios from "axios";
import { Tab } from "semantic-ui-react";
import GenresForm from "./GenresForm";
import GenreShowPage from "./GenreShowPage";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";
import Styles from "../styles/GenreStyles";

class GenreIndex extends Component {
  state = { genres: [], editing: false };

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  componentDidMount() {
    axios
      .get("/api/genres")
      .then(res => {
        this.setState({ genres: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addGenre = genre => {
    axios
      .post("/api/genres", { genre })
      .then(res => {
        const { genres } = this.state;
        this.setState({ genres: [...genres, res.data] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateGenre = (id, genre) => {
    axios
      .put(`/api/genres/${id}`, { genre })
      .then(res => {
        const genre = this.state.genres.map(genre => {
          if (genre.id === id) return res.data;
          return genre;
        });
        this.setState({ genre });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteGenre = id => {
    axios.delete(`/api/genres/${id}`).then(res => {
      alert(res.data.message);
      const { genres } = this.state;
      this.setState({ genres: genres.filter(genre => genre.id !== id) });
    });
  };

  renderTabs = () => {
    let panes = this.state.genres.map(genre => {
      return {
        menuItem: genre.title,
        render: () => (
          <Tab.Pane
            style={{
              backgroundColor: "#171717",
              boxShadow: "5px 5px 5px 5px #000000"
            }}
            attached={false}
          >
            {<GenreShowPage genre={genre} />}
          </Tab.Pane>
        )
      };
    });
    if (panes.length > 6) {
      return panes.slice(0, 6);
    } else {
      return panes;
    }
  };

  renderAddButton = () => {
    const {
      auth: { user }
    } = this.props;
    return (
      <>
        {user ? (
          user.role === "admin" ? (
            <GenresForm add={this.addGenre} />
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}
      </>
    );
  };

  render() {
    return (
      <div style={Styles.MainContainer}>
        <div>
          {this.renderAddButton()}
          <Tab
            style={Styles.TabBackground}
            menu={{
              style: {
                backgroundColor: "black",
                fontSize: "20px"
              },
              inverted: true,
              attached: false,
              tabular: false
            }}
            panes={this.renderTabs()}
          />
        </div>
      </div>
    );
  }
}

export class ConnectedGenres extends Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <GenreIndex {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedGenres);
