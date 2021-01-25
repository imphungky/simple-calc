import axios from "axios";

const instance = axios.create({
    baseURL: "https://grade-io.herokuapp.com/"
});

export default instance;