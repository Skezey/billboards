import React from 'react';
import Home from './components/shared/Home';
import Nomatch from './components/shared/Nomatch';
import Navbar from './components/shared/Navbar';
import SideNav from './components/shared/SideNav';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import FetchUser from './components/auth/FetchUser';
import ProtectedRoute from './components/shared/ProtectedRoute';
import AdminRoute from './components/shared/AdminRoute';
import GenreIndex from './components/genres/GenreIndex';
import ArtistShowPage from './components/artists/ArtistShowPage';
import ForumIndex from './components/forum/ForumIndex';
import ForumShowPage from './components/forum/ForumShowPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UserShowPage from './components/users/UserShowPage';
import TopArtists from './components/artists/TopArtists';
import ConnectedProfile from './components/shared/Profile';
import EventIndex from './components/events/EventIndex';
import styled from 'styled-components';

const AppBackground = styled.div`
  background-image: url('/background.png');
`
const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 9999;
`

const App = () => (
  <div>
    <AppBackground>
    <Sticky><Navbar /></Sticky>
      <div style={{minHeight:'1200px' ,height: '5000px'}}>
      <FetchUser>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/genres" component={GenreIndex} />
            <Route exact path="/artists/:artist_name" component={ArtistShowPage} />
            <Route exact path="/artists" component={TopArtists} />
            <Route exact path="/events" component={EventIndex} />
            <ProtectedRoute exact path="/forums" component={ForumIndex} />
            <ProtectedRoute exact path="/forums/:forum_id" component={ForumShowPage} />
            <ProtectedRoute exact path="/profile" component={ConnectedProfile} />
            <AdminRoute exact path="/admin" component={AdminDashboard} />
            <AdminRoute exact path="/users/:user_id" component={UserShowPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={Nomatch} />
          </Switch>
        </Container>
      </FetchUser>
      </div>
    </AppBackground>
  </div>
)

export default App;
