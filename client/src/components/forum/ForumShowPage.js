import React, { Component } from "react";
import PostsIndex from "./posts/PostsIndex";

class ForumShowPage extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#333333",
          boxShadow: "5px 5px 5px 5px #000000",
          color: "white"
        }}
      >
        <div
          style={{
            height: "400px",
            border: " 5px double black",
            padding: "15px"
          }}
        >
          <h1
            style={{
              border: " 5px double black"
            }}
          >
            {this.props.location.state.forum.title}
          </h1>
          <p
            style={{
              height: "300px",
              border: " 5px double black"
            }}
          >
            {this.props.location.state.forum.body}
          </p>
        </div>
        <hr />
        <PostsIndex id={this.props.location.state.forum.id} />
      </div>
    );
  }
}

export default ForumShowPage;
