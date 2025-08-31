import React, { useState, useEffect, useCallback } from "react";
import { getProjectTasks } from "../services/projectApi.js";
import { TaskCard } from "../components";
import toast from "react-hot-toast";

const ProjectTasks = ({ project, isOpen, onClose }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjectTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProjectTasks(project._id);
      setTasks(response.data.data.tasks || []);
    } catch (error) {
      console.error("Error fetching project tasks:", error);
      toast.error("Failed to load project tasks");
    } finally {
      setLoading(false);
    }
  }, [project._id]);

  useEffect(() => {
    if (isOpen && project?._id) {
      fetchProjectTasks();
    }
  }, [isOpen, project, fetchProjectTasks]);

  const getTasksForStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const statuses = ["Todo", "in-progress", "Done"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-black border border-gray-700 rounded-xl p-8 w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">{project?.name}</h2>
            <p className="text-gray-400 mt-1">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in this project
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
            {tasks.length === 0 ? (
              <div className="text-center py-16 bg-gray-900/50 rounded-lg border border-gray-800">
                <svg
                  className="mx-auto h-16 w-16 text-gray-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-lg font-medium text-white mb-2">No tasks</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  This project doesn't have any tasks assigned yet. Assign tasks from the Kanban board to see them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statuses.map((status) => {
                  const statusTasks = getTasksForStatus(status);
                  const taskCount = statusTasks.length;

                  return (
                    <div
                      key={status}
                      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                        <h3 className="text-lg font-semibold text-white">
                          {status === "in-progress"
                            ? "In Progress"
                            : status.charAt(0).toUpperCase() + status.slice(1)}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30">
                          {taskCount}
                        </span>
                      </div>

                      <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                        {taskCount > 0 ? (
                          statusTasks.map((task) => (
                            <TaskCard
                              key={task._id}
                              task={task}
                              onClick={() => {}} // Disabled for this view
                              onDelete={() => {}} // Disabled for this view
                              isDragging={false}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-sm text-gray-500">
                              No {status.toLowerCase()} tasks
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTasks;
