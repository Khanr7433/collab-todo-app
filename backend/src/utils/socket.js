const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("taskCreated", (data) => {
      console.log("📝 Task created:", data);
      socket.broadcast.emit("taskCreated", data);
    });

    socket.on("taskUpdated", (data) => {
      console.log("✏️ Task updated:", data);
      socket.broadcast.emit("taskUpdated", data);
    });

    socket.on("taskDeleted", (data) => {
      console.log("🗑️ Task deleted:", data);
      socket.broadcast.emit("taskDeleted", data);
    });

    socket.on("taskMoved", (data) => {
      console.log("🔄 Task moved:", data);
      socket.broadcast.emit("taskMoved", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

export default socketHandler;
