import axiosConfig from "../utils/axiosConfig";
import {getAccessToken, setAccessToken} from "../utils/accessToken";
import setAuth from "../utils/setAuth";
const authAction = (action, params) => async dispatch => {
    try {
        if(!getAccessToken()) {
            axiosConfig.get('/users/refreshtoken', {withCredentials: true})
            .then((response) => {
                setAccessToken(response.data.token);
                setAuth(response.data.token);
                if(params) {
                    dispatch(action(...params));
                }
                else {
                    dispatch(action());
                }
            })
            .catch((err) => {
                dispatch({
                    type: "USER_NOT_LOADED"
                });
            })
        }
        else {
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
        dispatch({
            type: "USER_NOT_LOADED"
        });
    }
}

export default authAction;