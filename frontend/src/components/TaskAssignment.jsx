import React, { useState, useEffect } from "react";
import { getProjects, assignTaskToProject } from "../services/projectApi.js";
import { fetchTasks } from "../services/taskApi.js";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TaskAssignment = ({ isOpen, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes] = await Promise.all([
        getProjects(),
        fetchTasks(),
      ]);
      
      setProjects(projectsRes.data.data.projects || []);
      setTasks(tasksRes.data.data.tasks || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignment = async (e) => {
    e.preventDefault();
    
    if (!selectedTask || !selectedProject) {
      toast.error("Please select both a task and a project");
      return;
    }

    try {
      setLoading(true);
      await assignTaskToProject({
        taskId: selectedTask,
        projectId: selectedProject,
      });
      
      toast.success("Task assigned to project successfully");
      onClose();
      setSelectedTask("");
      setSelectedProject("");
    } catch (error) {
      console.error("Error assigning task:", error);
      toast.error(error.response?.data?.message || "Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  const getUnassignedTasks = () => {
    return tasks.filter(task => !task.project);
  };

  const getUserProjects = () => {
    const userId = user?.data?.user?._id || user?._id;
    return projects.filter(project => 
      project.owner?._id === userId || 
      project.members?.some(member => member._id === userId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Assign Task to Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        ) : (
          <form onSubmit={handleAssignment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Task *
              </label>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Choose a task...</option>
                {getUnassignedTasks().map((task) => (
                  <option key={task._id} value={task._id}>
                    {task.title} ({task.status})
                  </option>
                ))}
              </select>
              {getUnassignedTasks().length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No unassigned tasks available
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Project *
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Choose a project...</option>
                {getUserProjects().map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name} ({project.status})
                  </option>
                ))}
              </select>
              {getUserProjects().length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No projects available
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !selectedTask || !selectedProject}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Assigning..." : "Assign Task"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskAssignment;
