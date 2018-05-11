module.exports = io => {
  io.on("connection", socket => {
    console.log("New user connect");

    socket.on("disconnect", () => {
      console.log("User was disconnected");
    });
  });
};
