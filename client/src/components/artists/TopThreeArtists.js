import React, { Component } from 'react';
import axios from 'axios';
import TopThreeGrid from './TopThreeGrid';

class TopThreeArtists extends Component {

  state = { artists: [] }

  componentDidMount(){
    axios.get('/api/artists')
    .then(res => {
      this.setState({ artists: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }


	render() {
    const { artists } = this.state
    let topArtists = artists.slice(0, 3)
		return(
      <div>
        <TopThreeGrid artists={topArtists} />
      </div>
    )
	}

}

export default TopThreeArtists;
