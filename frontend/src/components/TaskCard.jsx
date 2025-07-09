import React from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TaskCard = ({ task, onClick, onDelete }) => {
  const { user } = useAuth();

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

  const isCurrentUser = (userId) => {
    const currentUserId = user?.data?.user?._id || user?._id;
    return currentUserId === userId;
  };

  const getDisplayName = (userObj, isCreator = false) => {
    if (!userObj) {
      return isCreator ? "Unknown" : "Unassigned";
    }

    const name = userObj.fullName || "Unknown";
    const isYou = isCurrentUser(userObj._id);

    return isYou ? `${name} (You)` : name;
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click

    toast(
      (t) => (
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <svg
              className="w-5 h-5 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="font-medium text-gray-900">Delete Task</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete "{task.title}"? This action cannot
            be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onDelete(task._id);
              }}
              className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep toast open until user interacts
        style: {
          maxWidth: "400px",
          padding: "16px",
        },
      }
    );
  };

  const handleCardClick = () => {
    onClick(task);
  };

  return (
    <div
      className={`border-2 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${getPriorityColor(
        task.priority
      )}`}
      onClick={handleCardClick}
    >
      {/* Header - Title and Priority */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm leading-tight flex-1 pr-2">
          {task.title
            ? task.title.charAt(0).toUpperCase() + task.title.slice(1)
            : "Untitled Task"}
        </h4>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${getPriorityBadgeColor(
            task.priority
          )}`}
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

      {/* People Info with Delete Button */}
      <div className="space-y-1 justify-between items-start flex">
        <div className="flex flex-col items-start justify-start text-xs">
          <div className="flex items-center">
            <span className="text-gray-500">By:</span>
            <span
              className={`font-medium truncate ml-2 ${
                isCurrentUser(task.createdBy?._id)
                  ? "text-green-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {getDisplayName(task.createdBy, true)}
            </span>
          </div>

          <div className="flex items-center justify-start text-xs">
            <span className="text-gray-500">To:</span>
            <span
              className={`font-medium truncate ml-2 ${
                task.assignedTo
                  ? isCurrentUser(task.assignedTo._id)
                    ? "text-blue-700 font-semibold"
                    : "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              {getDisplayName(task.assignedTo, false)}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleDeleteClick}
            className="p-1 rounded hover:bg-red-100 hover:text-red-600 text-gray-400 transition-all"
            title="Delete task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
