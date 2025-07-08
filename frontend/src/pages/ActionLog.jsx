import React, { useEffect, useState } from "react";
import API from "../services/api";

const ActionLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="action-log">
      <h4>Action Log</h4>
      <ul>
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
