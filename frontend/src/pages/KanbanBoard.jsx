import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  smartAssign,
} from "../services/taskApi";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";
import TaskModal from "../modal/TaskModal";
import { ConflictResolver, TaskCard } from "../components";
import toast from "react-hot-toast";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [loading, setLoading] = useState(true);

  useSocket(setTasks);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetchTasks();
        setTasks(Array.isArray(res.data.data.tasks) ? res.data.data.tasks : []);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch tasks. Please try again.";
        toast.error(errorMessage);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const statuses = ["Todo", "in-progress", "Done"];
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const getTasksForStatus = (status) => {
    return safeTasks.filter((task) => task.status === status);
  };

  const getTaskCount = (status) => {
    return getTasksForStatus(status).length;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <div className="text-lg">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Task Board</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total: {safeTasks.length} tasks
          </p>
        </div>
        <button
          onClick={() => setSelectedTask({})}
          className="border px-4 py-2 rounded hover:text-blue-600 hover:border-blue-600 transition-all"
        >
          + Add Task
        </button>
      </div>

      {/* Changed from grid to flex to allow independent column heights */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start">
        {statuses.map((status) => {
          const statusTasks = getTasksForStatus(status);
          const taskCount = statusTasks.length;

          return (
            <div
              key={status}
              className="flex-1 border rounded-lg p-4 shadow-md"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b">
                <h3 className="text-lg font-semibold">
                  {status
                    ? status.charAt(0).toUpperCase() + status.slice(1)
                    : "None"}
                </h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border bg-gray-50 text-black">
                  {taskCount}
                </span>
              </div>

              {/* Tasks Container */}
              <div className="space-y-3">
                {taskCount > 0 ? (
                  statusTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onClick={setSelectedTask}
                    />
                  ))
                ) : (
                  <div className="text-center py-6 border-2 border-dashed rounded-lg">
                    <svg
                      className="mx-auto h-6 w-6 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">No tasks</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Drop tasks here
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        setConflict={setConflict}
      />

      {conflict && (
        <ConflictResolver
          conflict={conflict}
          onClose={() => setConflict(null)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
