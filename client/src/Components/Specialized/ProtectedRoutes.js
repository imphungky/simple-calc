import React, {useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAccessToken} from "../../utils/accessToken";
import { loadUser } from '../../Actions/userActions';

/**
 * 
 *  Check if the user has an access Token in memory, redirect if they are not authorized
 * on a protected route
 * 
 */


function ProtectedRoute({component: Component, verified, loadUser, isLoaded, ...rest}) {
    if(isLoaded && !getAccessToken()) {
        return <Redirect to="/"/>;
    }

    return <Route 
    {...rest} render={(props) => {
        return <Component {...props} />;
    }}/>
}

function mapDispatchToProps(dispatch) {
    return {
        loadUser: () => {
            dispatch(loadUser());
        }
    }
};

function mapStateToProps(state) {
    return {
        verified: state.user.verified,
        isLoaded: state.user.isLoaded
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);