import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer, } from "../../providers/AuthProvider";
import Nomatch from './Nomatch';

const AdminRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    { auth =>
      <Route
        { ...rest }
        render={ props => (
          auth.authenticated ?
            auth.user.role === 'admin' ?
              <Component { ...props } />
            :
              <Nomatch />
          :
            <Nomatch />
          )}
      />
    }
  </AuthConsumer>
)

export default AdminRoute;
