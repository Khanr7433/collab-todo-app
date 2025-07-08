import API from "./apiHandler.js";

const getActionLogs = () => API.get("/api/actionlogs/getlogs");

export { getActionLogs };
