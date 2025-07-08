import React from "react";
import { updateTask } from "../services/taskApi";
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL);

const ConflictResolver = ({ conflict, onClose }) => {
  const { clientTask, serverTask } = conflict;

  const handleOverwrite = async () => {
    const res = await updateTask(clientTask._id, {
      ...clientTask,
      updatedAt: serverTask.updatedAt,
    });
    socket.emit("taskUpdated", res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h3 className="text-lg font-bold mb-4">Conflict Detected</h3>
        <p className="text-sm text-red-600 mb-2">
          Server: {serverTask.description}
        </p>
        <p className="text-sm text-green-600 mb-2">
          Yours: {clientTask.description}
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleOverwrite}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Overwrite
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConflictResolver;
