import axios from "./axios.js";

export const myMoneyRequest = (operation, amount, user) => axios.post("/operation", { operation, amount, user });
export const historyRequest = (user) => axios.get("/history", user);222