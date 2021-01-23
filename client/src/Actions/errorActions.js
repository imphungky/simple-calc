
export const invalidUser = () => async (dispatch) => {
    dispatch({
        type:"INVALID_USER"
    });
}

export const clearErr = () => async (dispatch) => {
    dispatch({
        type: "CLEAR_ERR"
    });
}