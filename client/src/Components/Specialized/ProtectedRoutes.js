import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { loadUser } from "../../Actions/userActions";
import { getAccessToken } from "../../utils/accessToken";

/**
 *
 *  Check if the user has an access Token in memory, redirect if they are not authorized
 * on a protected route
 *
 */

function ProtectedRoute({ component: Component, isLoaded, ...rest }) {
  if (isLoaded && !getAccessToken()) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

function mapDispatchToProps(dispatch) {
  return {
    loadUser: () => {
      dispatch(loadUser());
    },
  };
}

function mapStateToProps(state) {
  return {
    verified: state.user.verified,
    isLoaded: state.user.isLoaded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
