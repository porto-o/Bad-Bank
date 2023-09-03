import axios from "./axios.js";

export const registerRequest = user => axios.post(`/signup`, user)
export const loginRequest = user => axios.post(`/signin`, user)
export const logoutRequest = () => axios.post('/signout');