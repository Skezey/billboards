import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Header, Button, Icon } from "semantic-ui-react";
import ForumForm from "./ForumForm";
import styled from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";

const Left = styled.div`
  margin-right: 30%;
`;
const Right = styled.div`
  width: 30%;
  float: right;
  top: 0;
  padding: 20px;
  background-color: #333333;
  margin-left: 40px;
`;
const HoverDiv = styled.div`
  :hover {
    transform: translateX(-10px);
  }
`;

class ForumIndex extends Component {
  state = { forums: [], editing: false };

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  componentDidMount() {
    axios
      .get("/api/forums")
      .then(res => {
        this.setState({ forums: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addForum = forum => {
    const {
      auth: { user }
    } = this.props;
    axios
      .post("/api/forums", { forum })
      .then(res => {
        const { forums } = this.state;
        this.setState({ forums: [...forums, res.data] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateForum = (id, forum) => {
    axios
      .put(`/api/forums/${id}`, { forum })
      .then(res => {
        const forums = this.state.forums.map(forum => {
          if (forum.id === id) return res.data;
          return forum;
        });
        this.setState({ forums });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteForum = id => {
    axios.delete(`/api/forums/${id}`).then(res => {
      alert(res.data.message);
      const { forums } = this.state;
      this.setState({ forums: forums.filter(forum => forum.id !== id) });
    });
  };

  renderForums = () => {
    const { forums, editing } = this.state;
    const {
      auth: { user }
    } = this.props;
    return forums.map(forum => (
      <Left key={forum.id}>
        {editing ? (
          <>
            <ForumForm
              update={this.updateForum}
              toggleEdit={this.toggleEdit}
              id={forum.id}
            />
            <Button onClick={this.toggleEdit}>Cancel Edit</Button>
          </>
        ) : (
          <HoverDiv
            style={{
              backgroundColor: "#333333",
              marginTop: "5px",
              marginLeft: "20px"
            }}
          >
            <hr />
            <Link
              to={{
                pathname: `/forums/${forum.id}`,
                state: { forum: forum }
              }}
            >
              {forum.title}
            </Link>
            {user ? (
              user.role === "admin" ? (
                <div>
                  <Button onClick={this.toggleEdit}>
                    <Icon name="pencil" />
                  </Button>
                  <Button onClick={() => this.deleteForum(forum.id)}>
                    <Icon name="trash" />
                  </Button>
                </div>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}
            <hr />
          </HoverDiv>
        )}
      </Left>
    ));
  };

  render() {
    return (
      <div>
        <Right>
          <h1>Create new forum</h1>
          <ForumForm add={this.addForum} />
        </Right>
        <Header>Forum</Header>
        {this.renderForums()}
      </div>
    );
  }
}

export class ConnectedForums extends Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ForumIndex {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedForums);
