import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import SideNav from "./SideNav";
import Styles from "../styles/NavStyles";

const NavHover = styled.div`
  :hover {
    background-color: #212121;
  }
`;

class Navbar extends React.Component {
  rightNavItems = () => {
    const {
      auth: { user, handleLogout },
      location
    } = this.props;

    if (user) {
      return (
        <Menu.Menu position="right">
          <>
            <NavHover>
              <Link to="/profile">
                <Menu.Item
                  id="profile"
                  name={user.name}
                  active={location.pathname === "/profile"}
                />
              </Link>
            </NavHover>
            <NavHover>
              <Menu.Item
                name="logout"
                onClick={() => handleLogout(this.props.history)}
              />
            </NavHover>
          </>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <NavHover>
            <Link to="/login">
              <Menu.Item
                id="login"
                name="login"
                active={location.pathname === "/login"}
              />
            </Link>
          </NavHover>
          <NavHover>
            <Link to="/register">
              <Menu.Item
                id="register"
                name="register"
                active={location.pathname === "/register"}
              />
            </Link>
          </NavHover>
        </Menu.Menu>
      );
    }
  };

  render() {
    const {
      auth: { user }
    } = this.props;
    return (
      <div>
        <Menu style={Styles.Background} inverted>
          <div style={Styles.MenuStyles}>
            <SideNav />
          </div>
          {this.rightNavItems()}
        </Menu>
      </div>
    );
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Navbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedNavbar);
