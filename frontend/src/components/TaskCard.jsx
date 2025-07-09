import React from "react";

const TaskCard = ({ task, onClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "border-red-200 hover:border-red-400";
      case "medium":
        return "border-yellow-200 hover:border-yellow-400";
      case "low":
        return "border-green-200 hover:border-green-400";
      default:
        return "border-gray-200 hover:border-gray-400";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-900 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-900 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-900 border-green-200";
      default:
        return "bg-gray-100 text-gray-900 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`border-2 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${getPriorityColor(task.priority)}`}
      onClick={() => onClick(task)}
    >
      {/* Header - Title and Priority */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm leading-tight flex-1 pr-2">
          {task.title
            ? task.title.charAt(0).toUpperCase() + task.title.slice(1)
            : "Untitled Task"}
        </h4>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${getPriorityBadgeColor(task.priority)}`}
        >
          {task.priority
            ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
            : "None"}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Status and Date Row */}
      <div className="flex justify-between items-center mb-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">
          {task.status}
        </span>
        <span className="text-xs text-gray-500">
          {formatDate(task.createdAt)}
        </span>
      </div>

      {/* People Info - Compact Layout */}
      <div className="space-y-1">
        <div className="flex items-center justify-start text-xs">
          <span className="text-gray-500">By:</span>
          <span className="font-medium text-gray-700 truncate ml-2">
            {task.createdBy?.fullName || "Unknown"}
          </span>
        </div>
        <div className="flex items-center justify-start text-xs">
          <span className="text-gray-500">To:</span>
          <span
            className={`font-medium truncate ml-2 ${task.assignedTo ? "text-blue-600" : "text-gray-400"}`}
          >
            {task.assignedTo?.fullName || "Unassigned"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
