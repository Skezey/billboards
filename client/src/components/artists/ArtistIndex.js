import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArtistForm from './ArtistForm';
import { Button, Icon, Tab } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import ArtistShowPage from './ArtistShowPage'


class ArtistIndex extends Component {

  state = { artists: [],
            editing: false,
            addForm: false,
          }



  toggleEdit = () => this.setState({ editing: !this.state.editing })
  toggleAddForm = () => this.setState({ addForm: !this.state.addForm })


  componentDidMount(){
    console.log(this.props.id)

    axios.get(`/api/genres/${this.props.id}/artists`)
    .then(res => {
      this.setState({ artists: res.data })
    })
    .catch( err => {
      console.log(err)
    })

  }

  componentDidUpdate(prevProps){
    if(prevProps.id !== this.props.id) {
      console.log(this.props.id)

      axios.get(`/api/genres/${this.props.id}/artists`)
      .then(res => {
        this.setState({ artists: res.data })
      })
      .catch( err => {
        console.log(err)
      })
    }
  }

  addArtist = (artist) => {
     axios.post(`/api/genres/${this.props.id}/artists`, { artist })
       .then( res => {
         const { artists } = this.state
         this.setState({ artists: [...artists, res.data] })
       })
       .catch( err => {
         console.log(err)
       })
   }

   updateArtist = (id, artist) => {
     axios.put(`/api/genres/${this.props.id}/artists/${id}`, { artist } )
       .then( res => {
         const artist = this.state.artists.map( artist => {
           if (artist.id === id)
             return res.data
           return artist
         })
         this.setState({ artist })
       })
       .catch( err => {
         console.log(err)
       })
   }

   deleteArtist = (id) => {
     axios.delete(`/api/genres/${this.props.id}/artists/${id}`)
       .then( res => {
         alert(res.data.message)
         const { artists } = this.state
         this.setState({ artists: artists.filter( artist => artist.id !== id) })
       })
   }

  renderArtists = () => {
    const { artists, editing } = this.state
    const { auth: { user } } = this.props
    return(
      artists.map( artist =>
        <div key={artist.id} >
        {
          editing ?
          <div>
            <ArtistForm
            update={this.updateArtist}
            toggleEdit={this.toggleEdit}
            id={artist.id}
            />
            <Button onClick={this.toggleEdit}>
              Cancel Edit
            </Button>
          </div>
          :
          <div style={{fontSize: '20px'}}>
            <Link to={{
              pathname: `/artists/${artist.name.toLowerCase()}`,
              state: { artist: artist, id: this.props.id }
            }}>{artist.name}</Link>
            {
              user ?
              user.role === 'admin' ?
                <div>
                <Button onClick={this.toggleEdit}>
                  <Icon name='pencil' />
                </Button>
                <Button onClick={ () => this.deleteArtist(artist.id) }>
                  <Icon name='trash' />
                </Button>
                </div>
                :
                <div></div>
              :
              <div></div>
            }
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
          <ArtistForm add={this.addArtist}/>
          <Button onClick={this.toggleAddForm}>Close</Button>
        </div>
        :
        <Button onClick={this.toggleAddForm}>Add Artist</Button>
      }
      </div>
    )
  }

  renderTabs = () => {
    let panes = this.state.artists.map( artist => {
      return({
        menuItem: artist.name,
        render: () =>
        <Tab.Pane
          style={{backgroundColor: 'transparent'}}
          attached={false}
        >
          {<ArtistShowPage artist={artist} />}
         </Tab.Pane>
      })
    })
    return panes;
  }

	render() {
    const { auth: { user }, id } = this.props
		return(
      <div key={id} >
      {
        user ?
          user.role === 'admin' ?
           this.showAddMenu()
          :
          <div></div>
        :
        <div></div>
      }
      <div>
      <Tab
        menu={{ vertical: true, inverted: true, attached: true, tabular: false }}
        panes={this.renderTabs()}
      />
      </div>
      </div>
    )
	}

}

export class ConnectedArtists extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <ArtistIndex { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedArtists);
