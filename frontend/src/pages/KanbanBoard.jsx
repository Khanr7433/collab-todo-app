import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskApi";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";
import TaskModal from "../modal/TaskModal";
import ActionLog from "../pages/ActionLog";
import { ConflictResolver, TaskCard } from "../components";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]); // Initialize as empty array
  const [selectedTask, setSelectedTask] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useSocket(setTasks);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetchTasks();

        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const statuses = ["Todo", "In Progress", "Done"];

  // Ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

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
        <h2 className="text-2xl font-semibold">Task Board</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statuses.map((status) => (
          <div
            key={status}
            className="border rounded-lg p-4 min-h-[300px] shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
              {status}
            </h3>
            <div className="space-y-3">
              {safeTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onClick={setSelectedTask}
                  />
                ))}
              {safeTasks.filter((task) => task.status === status).length ===
                0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <p className="text-sm">No tasks in {status}</p>
                </div>
              )}
            </div>
          </div>
        ))}
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
