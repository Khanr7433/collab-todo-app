import React from "react";

const TaskCard = ({ task, setSelectedTask }) => (
  <div className="task" onClick={() => setSelectedTask(task)}>
    <strong>{task.title}</strong>
    <p>{task.description}</p>
    <p>👤 {task.assignedTo?.name || "Unassigned"}</p>
  </div>
);

export default TaskCard;
