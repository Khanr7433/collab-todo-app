import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const useSocket = (setTasks) => {
  useEffect(() => {
    socket.on("taskCreated", (taskData) => {
      console.log("Received taskCreated:", taskData);
      const newTask = taskData.data?.task || taskData;
      setTasks((prev) => {
        const exists = prev.some((task) => task._id === newTask._id);
        if (exists) return prev;
        return [...prev, newTask];
      });
    });

    socket.on("taskUpdated", (taskData) => {
      console.log("Received taskUpdated:", taskData);
      const updatedTask = taskData.data?.task || taskData;
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    });

    socket.on("taskDeleted", (taskData) => {
      console.log("Received taskDeleted:", taskData);
      const taskId = taskData.data?.taskId || taskData._id || taskData;
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    socket.on("taskMoved", (taskData) => {
      console.log("Received taskMoved:", taskData);
      const movedTask = taskData.data?.task || taskData;
      setTasks((prev) =>
        prev.map((task) =>
          task._id === movedTask._id ? { ...task, ...movedTask } : task
        )
      );
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
      socket.off("taskMoved");
    };
  }, [setTasks]);

  return socket;
};

export default useSocket;
