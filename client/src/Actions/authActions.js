import axiosConfig from "../utils/axiosConfig";
import {getAccessToken, setAccessToken} from "../utils/accessToken";
import setAuth from "../utils/setAuth";
const authAction = (action, params) => async dispatch => {
    try {
        if(!getAccessToken()) {
            console.log("fetch token");
            axiosConfig.get('/users/refreshtoken', {withCredentials:'include'})
            .then((response) => {
                console.log(response.data.token);
                setAccessToken(response.data.token);
                console.log(getAccessToken());
                setAuth(response.data.token);
                if(params) {
                    dispatch(action(...params));
                }
                else {
                    dispatch(action());
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: "USER_NOT_LOADED"
                });
            })
        }
        else {
            console.log(getAccessToken());
            setAuth(getAccessToken());
            if(params) {
                dispatch(action(...params));
            }
            else {
                dispatch(action());
            }
        }
    }
    catch(err){
        console.log(err);
        return;
    }
}

export default authAction;