import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const useSocket = (setTasks, currentUser = null) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const isCurrentUserAction = (actionUser) => {
      if (!currentUser || !actionUser) return false;
      const currentUserId = currentUser?.data?.user?._id || currentUser?._id;
      const actionUserId = actionUser._id || actionUser;
      return currentUserId === actionUserId;
    };

    const getUserDisplayName = (user) => {
      if (!user) return "Someone";
      return user.fullName || user.name || "Unknown User";
    };

    // Emit user online status when connected
    if (currentUser) {
      const userId = currentUser?.data?.user?._id || currentUser?._id;
      if (userId) {
        socket.emit("userOnline", userId);
      }
    }

    // Handle online users updates
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Handle notifications
    socket.on("receiveNotification", ({ message, type = "info" }) => {
      const toastOptions = {
        duration: 4000,
        style: {
          color: "white",
        },
      };

      switch (type) {
        case "success":
          toast.success(message, {
            ...toastOptions,
            style: { ...toastOptions.style, background: "#10B981" },
          });
          break;
        case "error":
          toast.error(message, {
            ...toastOptions,
            style: { ...toastOptions.style, background: "#EF4444" },
          });
          break;
        case "warning":
          toast(message, {
            ...toastOptions,
            icon: "⚠️",
            style: { ...toastOptions.style, background: "#F59E0B" },
          });
          break;
        default:
          toast(message, {
            ...toastOptions,
            icon: "ℹ️",
            style: { ...toastOptions.style, background: "#3B82F6" },
          });
      }
    });

    // Existing task-related events
    socket.on("taskCreated", (taskData) => {
      const newTask = taskData.data?.task || taskData;
      const creator = newTask.createdBy;

      setTasks((prev) => {
        const exists = prev.some((task) => task._id === newTask._id);
        if (exists) return prev;
        return [...prev, newTask];
      });

      if (!isCurrentUserAction(creator)) {
        toast.success(
          `${getUserDisplayName(creator)} created a new task: "${newTask.title}"`,
          {
            icon: "✨",
            duration: 4000,
            style: {
              background: "#10B981",
              color: "white",
            },
          }
        );
      }
    });

    socket.on("taskUpdated", (taskData) => {
      const updatedTask = taskData.data?.task || taskData;
      const updater = updatedTask.createdBy;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );

      if (!isCurrentUserAction(updater)) {
        toast(
          `${getUserDisplayName(updater)} updated task: "${updatedTask.title}"`,
          {
            icon: "📝",
            duration: 3000,
            style: {
              background: "#3B82F6",
              color: "white",
            },
          }
        );
      }
    });

    socket.on("taskDeleted", (taskData) => {
      const taskId = taskData.data?.taskId || taskData._id || taskData;
      const deletedTask = taskData.data?.task || {};
      const deleter = taskData.data?.deletedBy || deletedTask.createdBy;

      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      if (!isCurrentUserAction(deleter)) {
        toast.error(
          `${getUserDisplayName(deleter)} deleted task: "${deletedTask.title || "Untitled"}"`,
          {
            icon: "🗑️",
            duration: 3000,
            style: {
              background: "#EF4444",
              color: "white",
            },
          }
        );
      }
    });

    socket.on("taskMoved", (taskData) => {
      const movedTask = taskData.data?.task || taskData;
      const fromStatus = taskData.data?.fromStatus;
      const toStatus = taskData.data?.toStatus;
      const mover = movedTask.createdBy;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === movedTask._id ? { ...task, ...movedTask } : task
        )
      );

      if (!isCurrentUserAction(mover)) {
        const statusDisplay = {
          todo: "Todo",
          "in-progress": "In Progress",
          done: "Done",
        };

        toast(
          `${getUserDisplayName(mover)} moved "${movedTask.title}" from ${statusDisplay[fromStatus] || fromStatus} to ${statusDisplay[toStatus] || toStatus}`,
          {
            icon: "🚀",
            duration: 4000,
            style: {
              background: "#8B5CF6",
              color: "white",
            },
          }
        );
      }
    });

    // Project-related events
    socket.on("projectCreated", (projectData) => {
      const newProject = projectData.data?.project || projectData;
      const creator = newProject.owner;

      if (!isCurrentUserAction(creator)) {
        toast.success(
          `${getUserDisplayName(creator)} created a new project: "${newProject.name}"`,
          {
            icon: "🏗️",
            duration: 4000,
            style: {
              background: "#10B981",
              color: "white",
            },
          }
        );
      }
    });

    socket.on("taskAssignedToProject", (data) => {
      const task = data.data?.task || data.task;
      const project = data.data?.project || data.project;
      const assigner = data.data?.user || data.user;

      if (!isCurrentUserAction(assigner)) {
        toast(
          `${getUserDisplayName(assigner)} assigned task "${task?.title}" to project "${project?.name}"`,
          {
            icon: "📋",
            duration: 4000,
            style: {
              background: "#8B5CF6",
              color: "white",
            },
          }
        );
      }
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      // Re-emit user online status on reconnect
      if (currentUser) {
        const userId = currentUser?.data?.user?._id || currentUser?._id;
        if (userId) {
          socket.emit("userOnline", userId);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("reconnect", () => {
      console.log("Socket reconnected");
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("receiveNotification");
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
      socket.off("taskMoved");
      socket.off("projectCreated");
      socket.off("taskAssignedToProject");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnect");
    };
  }, [setTasks, currentUser]);

  // Function to send notification to a specific user
  const sendNotification = (toUserId, message, type = "info") => {
    socket.emit("sendNotification", { toUserId, message, type });
  };

  return { socket, onlineUsers, sendNotification };
};

export default useSocket;
