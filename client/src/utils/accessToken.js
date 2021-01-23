/**
 *  Keep our access token in memory as a global variable
 */


var accessToken = undefined;

function getAccessToken() {
    return accessToken;
}

function setAccessToken(token) {
    accessToken = token;
    setTimeout(() => {
        accessToken = undefined;
    }, 30000)
}


export {getAccessToken, setAccessToken};