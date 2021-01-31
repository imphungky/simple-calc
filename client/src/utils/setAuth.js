import axiosConfig from "./axiosConfig";

/**
 * For every authorized action set AuthToken is called to set the access token in the header
 * to the server
 */

const setAuthToken = (token) => {
  if (token) {
    axiosConfig.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosConfig.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
