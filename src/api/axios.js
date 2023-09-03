import axios from "axios";

const instance = axios.create({
    baseURL:'https://bad-bank-server.onrender.com/api',
    withCredentials: true,
})

export default instance;