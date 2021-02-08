import { Redirect } from "react-router-dom";

import { getAccessToken, setAccessToken } from "../utils/accessToken.js";
import axiosConfig from "../utils/axiosConfig";
import setAuth from "../utils/setAuth";

export const login = (user, pass) => async (dispatch) => {
  const url = "/users/login";
  const body = { username: user, password: pass };
  axiosConfig
    .post(url, body, { withCredentials: true })
    .then((res) => {
      //dispatch to state
      setAccessToken(res.data.token);
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      setAuth(getAccessToken());
      dispatch(loadUser());
      return <Redirect to="/profile" />;
    })
    .catch((err) => {
      if (err.response) {
        if (
          err.response.status === 409 &&
          err.response.data.type === "password"
        ) {
          dispatch({
            type: "INVALID_PASS",
          });
        } else if (
          err.response.status === 409 &&
          err.response.data.type === "username"
        ) {
          console.log("invaliduser");
          dispatch({
            type: "INVALID_USER",
          });
        }
      }
    });
};

export const resendVerify = () => async (dispatch) => {
  let url = "/users/resend";
  axiosConfig
    .post(url)
    .then(() => {
      dispatch({
        type: "EMAIL_SENT",
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SEND_EMAIL_ERROR",
      });
    });
};

export const verify = (id) => async (dispatch) => {
  let body = { id: id };
  axiosConfig.post("/users/verify", body).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: "EMAIL_VERIFIED",
      });
    }
  });
};

export const expiredSession = () => async (dispatch) => {
  dispatch({
    type: "EXPIRED_SESSION",
  });
  dispatch(logout());
};

export const register = (email, username, password) => async (dispatch) => {
  let body = { email: email, username: username, password: password };
  axiosConfig
    .post("/users/register", body)
    .then(() => {
      dispatch(login(username, password));
      dispatch(loadUser());
      return <Redirect to="profile" />;
    })
    .catch((err) => {
      if (err.response) {
        if (
          err.response.status === 409 &&
          err.response.data === "INVALID_USER"
        ) {
          dispatch({
            type: "INVALID_USER",
          });
        } else if (
          err.response.status === 409 &&
          err.response.data === "INVALID_EMAIL"
        ) {
          dispatch({
            type: "INVALID_EMAIL",
          });
        }
      }
    });
};

/**
 * On logout clear the refresh token in their cookie
 */

export const logout = () => async (dispatch) => {
  let url = "/users/clearcookie";
  axiosConfig.delete(url, { withCredentials: true }).then(() => {
    dispatch({
      type: "LOGOUT",
    });
  });
};

/**
 * On every page load, fetch the data if we were able to get the data from the server,
 * dispatch to state. Else dispatch that the user was not able to be loaded
 */

export const loadUser = () => async (dispatch) => {
  let promise1 = axiosConfig.get("/courses/fetch", { withCredentials: true });
  let promise2 = axiosConfig.get("/users/loadverify", {
    withCredentials: true,
  });
  let promise3 = axiosConfig.get("/users/fetchtasks", {
    withCredentials: true,
  });
  let promise4 = axiosConfig.get("/users/fetchstatuses", {
    withCredentials: true,
  });
  Promise.all([promise1, promise2, promise3, promise4])
    .then((responses) => {
      console.log("loaded");
      dispatch({
        type: "USER_LOADED",
        payload: {
          courses: responses[0].data,
          verified: responses[1].data,
          tasks: responses[2].data.tasks,
          statuses: responses[3].data.statuses,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: "USER_NOT_LOADED",
      });
    });
};

export const taskActions = (type, data) => async (dispatch) => {
  if (type == "ADD") {
    //hit add endpoint
    axiosConfig.post("/users/addtask", data).then((response) => {
      dispatch({
        type: "TASK",
        payload: response.data.tasks,
      });
    });
  } else if (type == "UPDATE") {
    //hit update endpoint
    axiosConfig.post("/users/updatetask", data).then((response) => {
      dispatch({
        type: "TASK",
        payload: response.data.tasks,
      });
    });
  } else if (type == "GET") {
    //hit get endpoint
    axiosConfig.get("/users/fetchtasks").then((response) => {
      dispatch({
        type: "TASK",
        payload: response.data.tasks,
      });
    });
  } else {
    //hit delete endpoint
    axiosConfig.delete("/users/removetask", data).then((response) => {
      dispatch({
        type: "TASK",
        payload: response.data.tasks,
      });
    });
  }
};

export const statusActions = (type, data) => async (dispatch) => {
  if (type == "ADD") {
    //hit add endpoint
    axiosConfig.post("/users/addstatus", data).then((response) => {
      dispatch({
        type: "STATUS",
        payload: response.data.statuses,
      });
    });
  } else if (type == "UPDATE") {
    //hit update endpoint
    axiosConfig.post("/users/updatestatus", data).then((response) => {
      dispatch({
        type: "STATUS",
        payload: response.data.status,
      });
    });
  } else if (type == "GET") {
    //hit get endpoint
    axiosConfig.get("/users/fetchstatuses").then((response) => {
      dispatch({
        type: "STATUS",
        payload: response.data.status,
      });
    });
  } else {
    //hit delete endpoint
    axiosConfig.delete("/users/removestatus").then((response) => {
      dispatch({
        type: "STATUS",
        payload: response.data.status,
      });
    });
  }
};
