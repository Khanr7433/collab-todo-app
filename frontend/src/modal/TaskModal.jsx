import React, { useEffect, useState } from "react";
import { createTask, updateTask, smartAssign } from "../services/taskApi";
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL);

const TaskModal = ({ task, onClose, setConflict }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
  });

  useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  if (!task) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      let res;
      if (form._id) {
        res = await updateTask(form._id, form);
        socket.emit("taskUpdated", res.data);
      } else {
        res = await createTask(form);
        socket.emit("taskCreated", res.data);
      }
      onClose();
    } catch (err) {
      if (err.response?.status === 409) setConflict(err.response.data);
    }
  };

  const handleSmartAssign = async () => {
    const res = await smartAssign(form._id);
    socket.emit("taskUpdated", res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-bold mb-4">Edit Task</h3>
        <input
          name="title"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full mb-3 p-2 border rounded"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSmartAssign}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Smart Assign
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
