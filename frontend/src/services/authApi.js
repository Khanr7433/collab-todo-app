import API from "./apiHandler.js";

const registerUser = (data) => API.post("/api/auth/register", data);
const loginUser = (data) => API.post("/api/auth/login", data);
const logoutUser = () => API.post("/api/auth/logout");

export { registerUser, loginUser, logoutUser };
