import React, {useState} from 'react';
import { Image } from 'semantic-ui-react';

const PlaylistShowPage = ({ playlist }) => (
  <div style={{width: '400px', marginTop: '20px', position: 'relative', right: 0}}>
    <a
      href={playlist.link}
      target='_blank'
      rel="noopener noreferrer"
    >
      <Image fluid src={playlist.image}/>
    </a>
  </div>
)

export default PlaylistShowPage;
