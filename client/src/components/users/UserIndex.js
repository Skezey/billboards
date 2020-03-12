import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Icon } from "semantic-ui-react";
import UserForm from "./UserForm";
import styled from "styled-components";

const Left = styled.div`
  margin-right: 30%;
`;
const Right = styled.div`
  width: 30%;
  float: right;
  top: 0;
  padding: 20px;
`;

class UserIndex extends Component {
  state = { users: [], editing: false, showForm: false };
  toggleEdit = () => this.setState({ editing: !this.state.editing });
  toggleAddUser = () => this.setState({ showForm: !this.state.showForm });

  componentDidMount() {
    axios
      .get("/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addUser = user => {
    axios
      .post(`/api/users`, { user })
      .then(res => {
        const { users } = this.state;
        this.setState({ users: [...users, res.data] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateUser = (id, user) => {
    axios
      .put(`/api/users/${id}`, { user })
      .then(res => {
        const user = this.state.users.map(user => {
          if (user.id === id) return res.data;
          return user;
        });
        this.setState({ user });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteUser = id => {
    axios.delete(`/api/users/${id}`).then(res => {
      alert(res.data.message);
      const { users } = this.state;
      this.setState({ users: users.filter(user => user.id !== id) });
    });
  };

  renderUsers = () => {
    const { users, editing } = this.state;
    return (
      <div>
        {users.map(user => (
          <div key={user.id}>
            {editing ? (
              <div>
                <UserForm
                  update={this.updateUser}
                  toggleEdit={this.toggleEdit}
                  id={user.id}
                />
              </div>
            ) : (
              <Left>
                <Card style={{ padding: "10px", margin: "10px" }}>
                  <Link
                    to={{
                      pathname: `/users/${user.id}`,
                      state: { user: user }
                    }}
                  >
                    {user.email}
                  </Link>
                  <div>
                    <Button onClick={this.toggleEdit}>
                      <Icon name="pencil" />
                    </Button>
                    <Button onClick={() => this.deleteUser(user.id)}>
                      <Icon name="trash" />
                    </Button>
                  </div>
                </Card>
              </Left>
            )}
          </div>
        ))}
      </div>
    );
  };

  showAddMenu = () => {
    const { showForm } = this.state;
    return (
      <div style={{ backgroundColor: "white" }}>
        {showForm ? (
          <div>
            <UserForm add={this.addUser} />
            <Button onClick={this.toggleAddUser}>Close</Button>
          </div>
        ) : (
          <Button onClick={this.toggleAddUser}>Add User</Button>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Right>
          <h1>Add User</h1>
          {this.showAddMenu()}
        </Right>
        {this.renderUsers()}
      </div>
    );
  }
}

export default UserIndex;
