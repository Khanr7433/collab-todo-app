import React from "react";

const TaskCard = ({ task, onClick }) => (
  <div
    onClick={() => onClick(task)}
    className="rounded shadow p-3 mb-2 cursor-pointer hover:scale-105 transition"
  >
    <h4 className="font-bold">{task.title}</h4>
    <p className="text-sm">{task.description}</p>
    <p className="text-xs text-gray-500 mt-1">
      👤 {task.assignedTo?.name || "Unassigned"}
    </p>
  </div>
);

export default TaskCard;
