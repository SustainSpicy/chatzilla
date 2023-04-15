class WebSockets {
  connection(client) {
    this.users = [];
    this.activeUsers = [];

    client.on("new_message", (data) => {
      console.log("new message");

      client.join(data.room);
      io.to(data.room).emit("new_message", data);
    });

    client.on("message_read", (room) => {
      console.log("message_read");
      // client.join(room);

      io.to(room.roomId).emit("message_read", room);
    });
    client.on("typing", (data) => {
      // console.log("typing");
      client.join(data.room);

      io.to(data.room).emit("typing", data.username);
    });

    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      console.log("disconnect");

      this.activeUsers = this.users.filter(
        (user) => user.socketId !== client.id
      );
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });

    // add identity of user mapped to the socket id
    client.on("identity", (newUserId) => {
      console.log("identity", newUserId);
      if (!this.activeUsers.some((user) => user.userId === newUserId)) {
        this.activeUsers.push({
          socketId: client.id,
          userId: newUserId,
        });
      }
      // send all active users to new user
      io.emit("get-online-users", this.activeUsers);
    });

    client.on("isActive", (newUserId) => {
      console.log("isActive");
      if (!this.activeUsers.some((user) => user.userId === newUserId)) {
        this.activeUsers.push({
          socketId: client.id,
          userId: newUserId,
        });
      }

      // send all active users to new user
      io.emit("get-online-users", this.activeUsers);
    });

    client.on("offline", () => {
      console.log("offline");
      // remove user from active users

      this.activeUsers = this.activeUsers.filter(
        (user) => user.socketId !== client.id
      );

      // send all active users to all users
      io.emit("get-online-users", this.activeUsers);
    });

    // subscribe person to chat & other user as well
    client.on("subscribe-to-chat", (room, otherUserId = "") => {
      console.log("subscribe-to-chat");
      // this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      console.log("unsubscribe");
      client.leave(room);
    });
  }
  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}

export default new WebSockets();
