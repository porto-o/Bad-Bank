import axios from "./axios.js";

export const myMoneyRequest = (operation, amount, user) => axios.post("/operation", { operation, amount, user });
export const historyRequest = (user) => axios.get("/history", user);
export const transferRequest = (amount, user, email) => axios.post("/transfer", { amount, user, email });