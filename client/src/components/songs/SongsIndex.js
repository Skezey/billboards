import React, { Component } from 'react';
import axios from 'axios';
import SongForm from './SongForm'
import { Button, Icon } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';

class SongsIndex extends Component {

  state = { songs: [], editting: false, addForm: false }
  toggleEdit = () => this.setState({ editing: !this.state.editing })

  toggleAddForm = () => this.setState({ addForm: !this.state.addForm })


  componentDidMount(){
    axios.get(`/api/artists/${this.props.id}/songs`)
    .then( res => {
      this.setState({ songs: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }

  addSong = (song) => {
     axios.post(`/api/artists/${this.props.id}/songs`, { song })
       .then( res => {
         const { songs } = this.state
         this.setState({ songs: [...songs, res.data] })
       })
       .catch( err => {
         console.log(err)
       })
   }

   updateSong = (id, song) => {
     axios.put(`/api/artists/${this.props.id}/songs/${id}`, { song } )
       .then( res => {
         const song = this.state.songs.map( song => {
           if (song.id === id)
             return res.data
           return song
         })
         this.setState({ song })
       })
       .catch( err => {
         console.log(err)
       })
   }

   deleteSong = (id) => {
     axios.delete(`/api/artists/${this.props.id}/songs/${id}`)
       .then( res => {
         alert(res.data.message)
         const { songs } = this.state
         this.setState({ songs: songs.filter( song => song.id !== id) })
       })
   }

  renderSongs = () => {
    const { songs, editing } = this.state
    const { auth: { user } } = this.props
    return(
      songs.map( song =>
        <div key={song.id} >
        {
          editing ?
          <div>
            <hr />
            <SongForm
            update={this.updateSong}
            toggleEdit={this.toggleEdit}
            id={song.id}
            />
            <Button onClick={this.toggleEdit}>
              Cancel Edit
            </Button>
            <hr />
          </div>
          :
          <div>
            <hr/>
              <p>Title: {song.title}</p>
              <p>Album: {song.album}</p>
              <p>Year: {song.year}</p>
              {
                user ?
                  user.role === 'admin' ?
                  <div>
                  <Button onClick={this.toggleEdit}>
                    <Icon name='pencil' />
                  </Button>
                  <Button onClick={ () => this.deleteSong(song.id) }>
                    <Icon name='trash' />
                  </Button>
                  </div>
                  :
                  <div></div>
                :
                <div></div>
              }
            <hr/>
          </div>
        }
        </div>
      )
    )
  }

  showAddMenu = () => {
    const { addForm } = this.state
    return(
      <div>
      {
        addForm ?
        <div>
          <SongForm add={this.addSong}/>
          <Button onClick={this.toggleAddForm}>Close</Button>
        </div>
        :
        <Button onClick={this.toggleAddForm}>Add Song</Button>
      }
      </div>
    )
  }

	render() {
    const { auth: { user } } = this.props
		return(
      <div>
        {
          user ?
            user.role === 'admin' ?
            this.showAddMenu()
            :
            <div></div>
          :
          <div></div>
        }
        {this.renderSongs()}
      </div>
    )
	}
}

export class ConnectedSongs extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <SongsIndex { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedSongs);
