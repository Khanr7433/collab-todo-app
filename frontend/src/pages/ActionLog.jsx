import React, { useEffect, useState } from "react";

const ActionLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {}, []);

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
                {logs.map((log, index) => (
                  <li
                    key={log._id || index}
                    className="px-4 py-4 sm:px-6 hover:border-blue-600 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {log.user?.name || "Unknown User"}
                        </p>
                        <p className="text-sm mt-1">{log.action}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="text-xs">
                          {log.timestamp
                            ? new Date(log.timestamp).toLocaleString()
                            : "Now"}
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
