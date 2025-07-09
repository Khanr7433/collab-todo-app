import React, { useEffect, useState } from "react";
import { getActionLogs } from "../services/actionLogApi";
import toast from "react-hot-toast";

const ActionLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getActionLogs();
        toast.success("Logs fetched successfully!");
        setLogs(response.data.data.logs || []);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch logs. Please try again.";
        toast.error(errorMessage);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionIcon = (action) => {
    switch (action) {
      case "Task Created":
        return (
          <div className="w-8 h-8 rounded-full border flex items-center justify-center">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        );
      case "Task Updated":
        return (
          <div className="w-8 h-8 rounded-full border flex items-center justify-center">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        );
      case "Task Deleted":
        return (
          <div className="w-8 h-8 rounded-full border flex items-center justify-center">
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
          </div>
        );
      case "Task Status Updated":
        return (
          <div className="w-8 h-8 rounded-full border flex items-center justify-center">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full border flex items-center justify-center">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  const formatActionText = (log) => {
    const { user, action, task } = log;
    const userName = user?.fullName || "Unknown User";
    const taskTitle = task?.title;

    switch (action) {
      case "Task Created":
        return (
          <span>
            <span className="font-medium">{userName}</span> created task{" "}
            {taskTitle ? (
              <span className="font-medium hover:text-blue-600 transition-all">
                "{taskTitle}"
              </span>
            ) : (
              <span className="font-medium">(Task deleted)</span>
            )}
          </span>
        );
      case "Task Updated":
        return (
          <span>
            <span className="font-medium">{userName}</span> updated task{" "}
            {taskTitle ? (
              <span className="font-medium hover:text-blue-600 transition-all">
                "{taskTitle}"
              </span>
            ) : (
              <span className="font-medium">(Task deleted)</span>
            )}
          </span>
        );
      case "Task Deleted":
        return (
          <span>
            <span className="font-medium">{userName}</span> deleted a task
          </span>
        );
      case "Task Status Updated":
        return (
          <span>
            <span className="font-medium">{userName}</span> updated task status{" "}
            {taskTitle ? (
              <span>
                for{" "}
                <span className="font-medium hover:text-blue-600 transition-all">
                  "{taskTitle}"
                </span>
              </span>
            ) : null}
          </span>
        );
      default:
        return (
          <span>
            <span className="font-medium">{userName}</span> performed{" "}
            {action.toLowerCase()}{" "}
            {taskTitle ? (
              <span>
                on{" "}
                <span className="font-medium hover:text-blue-600 transition-all">
                  "{taskTitle}"
                </span>
              </span>
            ) : null}
          </span>
        );
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return (
        date.toLocaleDateString() +
        " at " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border rounded-lg shadow-md">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h3 className="text-lg leading-6 font-medium">Action Log</h3>
            <p className="mt-1 max-w-2xl text-sm">
              Recent activities and changes in your workspace
            </p>
          </div>
          <div className="text-center py-8">
            <div className="text-sm">Loading activity logs...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="border rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h3 className="text-lg leading-6 font-medium">Action Log</h3>
          <p className="mt-1 max-w-2xl text-sm">
            Recent activities and changes in your workspace
          </p>
        </div>

        <div>
          {logs.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y">
                {logs.map((log) => (
                  <li
                    key={log._id}
                    className="px-4 py-4 sm:px-6 hover:border-l-4 hover:border-l-blue-600 transition-all"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Action Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {getActionIcon(log.action)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">{formatActionText(log)}</div>
                        <div className="mt-1 text-xs">
                          {formatTimestamp(log.createdAt)}
                        </div>
                      </div>

                      {/* Action Badge */}
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border">
                          {log.action}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium">No activity logs</h3>
              <p className="mt-1 text-sm">
                Activity logs will appear here when actions are performed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionLog;
