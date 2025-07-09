import API from "./apiHandler.js";

const fetchTasks = () => API.get("/api/tasks/gettask");
const createTask = (data) => API.post("/api/tasks/createtask", data);
const updateTask = (id, data) => API.patch(`/api/tasks/updatetask/${id}`, data);
const updateTaskStatus = (id, status) =>
  API.patch(`/api/tasks/updatetaskstatus/${id}`, status);
const deleteTask = (id) => API.delete(`/api/tasks/deletetask/${id}`);
const smartAssign = (id) => API.post(`/api/tasks/assigntask/${id}`);

export {
  fetchTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  smartAssign,
};
