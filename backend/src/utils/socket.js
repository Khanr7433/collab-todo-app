const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected");

    socket.on("createTask", (data) => {
      socket.broadcast.emit("taskCreated", data);
    });

    socket.on("updateTask", (data) => {
      socket.broadcast.emit("taskUpdated", data);
    });

    socket.on("deleteTask", (id) => {
      socket.broadcast.emit("taskDeleted", id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected");
    });
  });
};

export default socketHandler;
