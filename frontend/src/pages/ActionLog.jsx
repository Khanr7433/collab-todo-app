import React, { useEffect, useState } from "react";

const ActionLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="bg-white p-3 rounded shadow mt-4">
      <h3 className="font-bold mb-2">Action Log</h3>
      <ul className="text-sm text-gray-600 max-h-40 overflow-y-auto">
        {logs.map((log) => (
          <li key={log._id}>
            {log.user?.name} - {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ActionLog;
