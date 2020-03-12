import React, { Component } from 'react';
import axios from 'axios';
import PostsForm from './PostsForm';
import { Button, Icon } from 'semantic-ui-react';
import { AuthConsumer } from '../../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';

class PostsIndex extends Component {

  state = { posts: [], editing: false }

  toggleEdit = () => this.setState({ editing: !this.state.editing })

  componentDidMount(){
    axios.get(`/api/forums/${this.props.id}/posts`)
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  addPost = (post) => {
    const { auth: { user }, id } = this.props
     axios.post(`/api/forums/${this.props.id}/posts`,
      { body:post.body, user_id:user.id, forum_id:id })
       .then( res => {
         const { posts } = this.state
         this.setState({ posts: [...posts, res.data] })
       })
       .catch( err => {
         console.log(err)
       })
   }

   updatePost = (id, post) => {
     axios.put(`/api/forums/${this.props.id}/posts/${id}`, { post } )
       .then( res => {
         const post = this.state.posts.map( post => {
           if (post.id === id)
             return res.data
           return post
         })
         this.setState({ post })
       })
       .catch( err => {
         console.log(err)
       })
   }

   deletePost = (id) => {
     axios.delete(`/api/forums/${this.props.id}/posts/${id}`)
       .then( res => {
         alert(res.data.message)
         const { posts } = this.state
         this.setState({ posts: posts.filter( post => post.id !== id) })
       })
   }

  renderPosts = () => {
    const { posts, editing } = this.state
    const { auth: { user } } = this.props
    return(
      posts.map( post =>
        <div key={post.id} >
        {
          editing ?
          <PostsForm
            update={this.updatePost}
            toggleEdit={this.toggleEdit}
            id={post.id}
          /> :
          <div>
            <hr />
            <p>User id: {post.user_id}</p>
            <p>Body: {post.body}</p>
            <p>Post id: {post.id}</p>
            {
              user.id === post.user_id || user.role === "admin" ?
              <div>
                <Button onClick={this.toggleEdit}>
                  <Icon name='pencil' />
                </Button>
                <Button onClick={ () => this.deletePost(post.id) }>
                  <Icon name='trash' />
                </Button>
              </div>
              :
              <div></div>
            }
            <hr />
          </div>
        }
        </div>
      )
    )
  }

	render() {
		return(
      <div>
      <PostsForm add={this.addPost} />
        {this.renderPosts()}
      </div>
    )
	}
}

export class ConnectedPosts extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <PostsIndex { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedPosts);
