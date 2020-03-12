import React, { Component } from 'react';
import { Responsive, Grid, Image } from 'semantic-ui-react';
import axios from 'axios'
import styled from 'styled-components';
import PlaylistShowPage from './PlaylistShowPage'

const HoverDiv = styled.div`
	:hover {
		transform: translateX(10px);
		cursor: pointer;
		border-left: 10px solid #00FFFF;

	}
`

class PlaylistIndex extends Component {
  state = { playlists: [] }

  componentDidMount(){
    axios.get('/api/playlists')
    .then(res => {
      this.setState({playlists: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  addPlaylist = (playlist) => {
     axios.post('/api/playlists', { playlist })
       .then( res => {
         const { playlists } = this.state
         this.setState({ playlists: [...playlists, res.data] })
       })
       .catch( err => {
         console.log(err)
       })
   }

   updatePlaylist = (id, playlist) => {
     axios.put(`/api/playlists/${id}`, { playlist } )
       .then( res => {
         const playlists = this.state.genres.map( playlist => {
           if (playlist.id === id)
             return res.data
           return playlists
         })
         this.setState({ playlist })
       })
       .catch( err => {
         console.log(err)
       })
   }

   deletePlaylist = (id) => {
     axios.delete(`/api/playlists/${id}`)
       .then( res => {
         alert(res.data.message)
         const { playlists } = this.state
         this.setState({
           playlists: playlists.filter( playlist => playlist.id !== id)
         })
       })
   }

  renderPlaylists = () => {
    const { playlists } = this.state
    return(
      <div>
        <Responsive as={Grid}>
          <Grid.Row>
            <Grid.Column>
            <Image
            src='/playlists.png'
            width={40} height={40}
            style={{float: 'left'}}
            />
            <p
            style={{fontSize: '20px', color: '#616161', float: 'left'}}
            >Popular Playlists</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column>
            {playlists.map( playlist =>
              <HoverDiv style={{
                marginLeft: '6px',
                marginRight: '6px',
                backgroundColor: '#333333',
                boxShadow: '5px 5px 5px 5px #000000'}}
                key={playlist.id}
                >
                <Grid.Row width={2}>
                	< PlaylistShowPage
									playlist={playlist}
									update={this.updatePlaylist}
									delete={this.deletePlaylist}
									/>
                </Grid.Row>
              </HoverDiv>
            )}
          </Grid.Column>
        </Responsive>
      </div>
    )
  }

	render() {
		return(
      <div>
        {this.renderPlaylists()}
      </div>
    )
	}

}

export default PlaylistIndex;
