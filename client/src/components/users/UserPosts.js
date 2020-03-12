import React, { Component } from 'react';
import axios from 'axios';


class UserPosts extends Component {

  state = { posts: [] }

  componentDidMount(){
    axios.get(`/api/users/${this.props.id}/posts`)
    .then(res => {
      this.setState({ posts: res.data })
    })
    .catch(err =>{
      console.log(err)
    })
  }

  renderUserPosts = () => {
    const { posts } = this.state
    return(
      <div>
        {
          posts.map(post =>
            post.user_id === this.props.id ?
            <div key={post.id}>
              <hr/>
              <p>{post.body}</p>
              <p>Forum: {post.forum_id}</p>
              <p>User: {post.user_id}</p>
              <hr/>
            </div>
            :
            <div></div>
          )
        }
      </div>
    )
  }

	render() {
		return(
      <div>
      {this.renderUserPosts()}
      </div>
    )
	}

}

export default UserPosts;
