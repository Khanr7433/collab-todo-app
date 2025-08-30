// Track online users
const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // Handle user going online
    socket.on("userOnline", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`👤 User ${userId} is now online`);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    // Handle sending notifications
    socket.on("sendNotification", ({ toUserId, message, type = "info" }) => {
      const targetSocket = onlineUsers.get(toUserId);
      if (targetSocket) {
        io.to(targetSocket).emit("receiveNotification", { 
          message, 
          type,
          timestamp: new Date().toISOString()
        });
        console.log(`📨 Notification sent to user ${toUserId}: ${message}`);
      } else {
        console.log(`⚠️ User ${toUserId} is not online to receive notification`);
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
      console.log("🔴 Client disconnected:", socket.id);
      
      // Remove user from online users when they disconnect
      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          console.log(`👋 User ${userId} is now offline`);
          break;
        }
      }
      
      // Emit updated online users list
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};

export default socketHandler;
