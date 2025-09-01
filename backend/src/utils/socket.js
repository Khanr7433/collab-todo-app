// Track online users
const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    // Client connected

    // Handle user going online
    socket.on("userOnline", async (userData) => {
      try {
        // Extract userId from userData (can be just ID or full user object)
        const userId = userData._id || userData;

        // Store user data with socket ID
        onlineUsers.set(userId, {
          socketId: socket.id,
          userData: userData,
        });

        // Get all online users data
        const onlineUsersData = Array.from(onlineUsers.entries()).map(
          ([userId, data]) => ({
            _id: userId,
            ...data.userData,
          })
        );

        io.emit("onlineUsers", onlineUsersData);
      } catch (error) {
        // Error handling userOnline - fail silently
      }
    });

    // Handle sending notifications
    socket.on("sendNotification", ({ toUserId, message, type = "info" }) => {
      const userEntry = onlineUsers.get(toUserId);
      if (userEntry && userEntry.socketId) {
        io.to(userEntry.socketId).emit("receiveNotification", {
          message,
          type,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Existing task-related events
    socket.on("taskCreated", (data) => {
      socket.broadcast.emit("taskCreated", data);
    });

    socket.on("taskUpdated", (data) => {
      socket.broadcast.emit("taskUpdated", data);
    });

    socket.on("taskDeleted", (data) => {
      socket.broadcast.emit("taskDeleted", data);
    });

    socket.on("taskMoved", (data) => {
      socket.broadcast.emit("taskMoved", data);
    });

    // Project-related events
    socket.on("projectCreated", (data) => {
      socket.broadcast.emit("projectCreated", data);
    });

    socket.on("taskAssignedToProject", (data) => {
      socket.broadcast.emit("taskAssignedToProject", data);
    });

    socket.on("disconnect", () => {
      // Client disconnected

      // Remove user from online users when they disconnect
      for (let [userId, userEntry] of onlineUsers.entries()) {
        if (userEntry.socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      // Get updated online users data
      const onlineUsersData = Array.from(onlineUsers.entries()).map(
        ([userId, data]) => ({
          _id: userId,
          ...data.userData,
        })
      );

      // Emit updated online users list
      io.emit("onlineUsers", onlineUsersData);
    });
  });
};

export default socketHandler;
