import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.grade-calc.com"
});

export default instance;