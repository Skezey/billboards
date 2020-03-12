import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import Styles from '../styles/ArtistStyles'

class TopThreeGrid extends Component {

  renderArtists = () => {
    const { artists } = this.props
    return(
      <Grid>
        {
          artists.map((artist, i)  =>
            i === 1 ?
            <Grid.Row
            style={Styles.TopThreeGrid}
            key={artist.id} >
              <Grid.Column width={13}>
                <h1 style={{color: 'white'}}>Rank: {artist.rank} - {artist.name}</h1>
                <p style={{color: '#969696'}}>{artist.description}</p>
              </Grid.Column>
              <Grid.Column width={3}>
                <Image style={{width:'200px', height:'200px'}} src={artist.main_img} />
              </Grid.Column>
            </Grid.Row>
            :
            <Grid.Row style={Styles.gridRow}
            key={artist.id}>
              <Grid.Column width={3}>
                <Image style={{width:'200px', height:'200px'}} src={artist.main_img} />
              </Grid.Column>
              <Grid.Column width={13}>
                <h1 style={{color: 'white'}}>Rank: {artist.rank} - {artist.name}</h1>
                <p style={{color: '#969696'}}>{artist.description}</p>
              </Grid.Column>
            </Grid.Row>
          )
        }
      </Grid>
    )
  }

  render(){
    return(
      <>
        {this.renderArtists()}
      </>
    )
  }
}

export default TopThreeGrid;
