import API from "./apiHandler.js";

const createProject = (data) => API.post("/api/projects", data);
const getProjects = () => API.get("/api/projects");
const updateProject = (id, data) => API.put(`/api/projects/${id}`, data);
const getProjectTasks = (id) => API.get(`/api/projects/${id}/tasks`);
const assignTaskToProject = (data) => API.post("/api/projects/assign-task", data);
const addMemberToProject = (id, data) => API.post(`/api/projects/${id}/add-member`, data);
const removeMemberFromProject = (id, data) => API.post(`/api/projects/${id}/remove-member`, data);

export { 
  createProject, 
  getProjects, 
  updateProject, 
  getProjectTasks, 
  assignTaskToProject, 
  addMemberToProject, 
  removeMemberFromProject 
};
