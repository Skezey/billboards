import React, { Component } from 'react';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Button, Icon, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import styled from 'styled-components'
import Styles from '../styles/SideNavStyles'

const HoverDiv = styled.div`
	:hover {
		cursor: pointer;
	}
`

const NavHover = styled.div`
	:hover {
		background-color: #212121;
	}
`

class SideNav extends Component {

  state = { visible: false }

  toggleVisible = () => this.setState({ visible: !this.state.visible })

  showMenu = () => {
    const { auth: { user } } = this.props
    const { visible } = this.state
    return(
      <div>
      {
        visible ?
        <>
        <HoverDiv>
          <Icon size={'big'} inverted onClick={this.toggleVisible} name='bars'/>
        </HoverDiv>
        <div>
          <Menu
          style={Styles.NavMenu}
          vertical
          inverted
          >
          <NavHover>
            <Link to='/'>
              <Menu.Item
                style={Styles.NavItems}
                name='home'
                id='home'
                active={this.props.location.pathname === '/'}
              />
            </Link>
          </NavHover>
          <NavHover>
            <Link to='/artists'>
              <Menu.Item
                style={Styles.NavItems}
                name='artists'
                id='artists'
                active={this.props.location.pathname === '/artists'}
              />
            </Link>
          </NavHover>
          <NavHover>
            <Link to='/genres'>
              <Menu.Item
                style={Styles.NavItems}
                name='genres'
                id='genres'
                active={this.props.location.pathname === '/genres'}
              />
            </Link>
          </NavHover>
          <NavHover>
            <Link to='/events'>
              <Menu.Item
                style={Styles.NavItems}
                name='events'
                id='events'
                active={this.props.location.pathname === '/events'}
              />
            </Link>
          </NavHover>
            <>
              {
                user ?
                  user.role === 'admin' ?
                  <>
									<NavHover>
                    <Link to='/forums'>
                      <Menu.Item
												style={Styles.NavItems}
                        name='forums'
                        id='forums'
                        active={this.props.location.pathname === '/forums'}
                      />
                    </Link>
										</NavHover>
										<NavHover>
                      <Link to='/admin'>
                        <Menu.Item
													style={Styles.NavItems}
                          name='admin'
                          id='admin'
                          active={this.props.location.pathname === '/admin'}
                        />
                      </Link>
											</NavHover>
                    </>
                  :
									<NavHover>
                    <Link to='/forums'>
                      <Menu.Item
												style={Styles.NavItems}
                        name='forums'
                        id='forums'
                        active={this.props.location.pathname === '/forums'}
                      />
                    </Link>
									</NavHover>
                :
                  <div></div>
              }
            </>
          </Menu>
        </div>
        </>
        :
        <HoverDiv>
          <Icon
					size={'big'}
					inverted
					onClick={this.toggleVisible}
					name='bars'
					/>
        </HoverDiv>
      }
      </div>
    )
  }

	render() {
		return(
      <div
      >
        {this.showMenu()}
      </div>
    )
	}

}

export class ConnectedSideNav extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <SideNav { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedSideNav);
