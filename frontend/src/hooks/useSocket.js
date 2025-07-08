import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

const useSocket = (setTasks) => {
  useEffect(() => {
    socket.on("createTask", (t) => setTasks((prev) => [...prev, t]));

    socket.on("updateTask", (t) =>
      setTasks((prev) => prev.map((task) => (task._id === t._id ? t : task)))
    );

    socket.on("deleteTask", (id) =>
      setTasks((prev) => prev.filter((task) => task._id !== id))
    );

    socket.on("moveTask", (data) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === data._id ? { ...task, ...data } : task
        )
      );
    });
    return () => socket.disconnect();
  }, [setTasks]);

  return socket;
};

export default useSocket;
