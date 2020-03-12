import React, { Component } from "react";
import { Header, Image } from "semantic-ui-react";
import UserPosts from "./UserPosts";

const styles = {
  CardStyle: {
    height: "500px",
    width: "800px",
    backgroundColor: "white"
  }
};

class UserShowPage extends Component {
  render() {
    const { user } = this.props.location.state;
    return (
      <div style={styles.CardStyle}>
        <div>
          <Header>User Info</Header>
          <Image src={user.image} alt={`${user.name}'s profile`} />
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Last Login:</strong> {user.last_sign_in_at}
          </p>
        </div>
        <div>
          <br />
          <Header>User Posts</Header>
          <hr />
          <UserPosts id={user.id} />
        </div>
      </div>
    );
  }
}

export default UserShowPage;
