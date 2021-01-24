import {setAccessToken, getAccessToken} from "../utils/accessToken.js";
import setAuth from "../utils/setAuth";
import {Redirect} from "react-router-dom";
import axiosConfig from "../utils/axiosConfig";

export const login = (user, pass) => async (dispatch) => {
    const url = "/users/login";
    const body = {username: user, password: pass};
    axiosConfig.post(url, body, {withCredentials: true})
    .then((res) => {
        //dispatch to state
        setAccessToken(res.data.token);
        dispatch({
            type: "LOGIN",
            payload: res.data
        });
        setAuth(getAccessToken());
        dispatch(loadUser());
        return <Redirect to="/profile"/>
    })
    .catch((err) => {
        if(err.response) {
            if(err.response.status === 409 && err.response.data.type === "password") {
                dispatch({
                    type: "INVALID_PASS"
                });
            }
            else if(err.response.status === 409 && err.response.data.type === "username") {
                console.log("invaliduser");
                dispatch({
                    type: "INVALID_USER"
                })
            }
        }
    });
}

export const resendVerify = () => async (dispatch) => {
    let url = "/users/resend"
    axiosConfig.post(url)
    .then((response) => {
        dispatch({
            type: "EMAIL_SENT"
        })
    })
    .catch((err) => {
        dispatch({
            type: "SEND_EMAIL_ERROR"
        });
    })
}

export const verify = (id) => async (dispatch) => {
    let body = {id: id};
    axiosConfig.post('/users/verify', body)
    .then((res) => {
        if(res.status != 200) {
        }
        else {
            dispatch({
                type: "EMAIL_VERIFIED"
            });
        }
    })
}

export const expiredSession = () => async dispatch => {
    dispatch({
        type: "EXPIRED_SESSION"
    });
    dispatch(logout());
}

export const register = (email, username, password) => async (dispatch) => {
    let body = {email: email, username: username, password: password};
    axiosConfig.post('/users/register', body)
    .then((res) => {
        dispatch(login(username, password));
        dispatch(loadUser());
        return <Redirect to="profile" />
    })
    .catch((err) => {
        if(err.response) {
            if(err.response.status === 409 && err.response.data === "INVALID_USER") {
                dispatch({
                    type: "INVALID_USER"
                });
            }
            else if(err.response.status === 409 && err.response.data === "INVALID_EMAIL") {
                dispatch ({
                    type: "INVALID_EMAIL"
                });
            }
        }
    });
}

/**
 * On logout clear the refresh token in their cookie
 */

export const logout = () => async (dispatch) => {
    let url = "/users/clearcookie";
    axiosConfig.delete(url, {withCredentials: true}).then((response) => {
        dispatch({
            type: "LOGOUT"
        });
    })
}


/**
 * On every page load, fetch the data if we were able to get the data from the server,
 * dispatch to state. Else dispatch that the user was not able to be loaded
 */

export const loadUser = () => async dispatch => {
    let url = "/courses/fetch";
    axiosConfig.get(url, {withCredentials: true})
    .then((courses) => {
        console.log(courses.data);
        url = "/users/loadverify";
        axiosConfig.get(url).then((verified) => {
            console.log(courses.data);
            dispatch({
                type: "USER_LOADED",
                payload: {courses: courses.data, verified: verified.data}
            })
        });
    })
    .catch((err) => {
        dispatch({
            type: "USER_NOT_LOADED"
        });
    })
}
