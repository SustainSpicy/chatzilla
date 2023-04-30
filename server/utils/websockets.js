class WebSockets {
  constructor() {
    this.users = [];
    this.activeUsers = [];
  }
  connection = (client) => {
    console.log("connected", client.id);
    console.log("==========================");

    client.on("identity", (newUserId) => {
      console.log("identity", newUserId);
      console.log("==========================");
      if (!this.users.some((user) => user.userId === newUserId)) {
        this.users.push({
          socketId: client.id,
          userId: newUserId,
        });
      }
      console.log(this.users.length, " total users active");
    });
    client.on("online", (userId) => {
      console.log("online", userId);
      console.log("==========================");
      if (!this.activeUsers.some((user) => user.userId === userId)) {
        this.activeUsers.push({
          socketId: client.id,
          userId: userId,
        });
      }

      console.log(this.activeUsers.length, " users online");
      // send all active users to new user
      io.emit("get-online-users", this.activeUsers);
    });
    client.on("offline", (userId) => {
      console.log("offline", userId);
      console.log("==========================");
      this.activeUsers = this.activeUsers.filter(
        (user) => user.userId != userId
      );

      console.log(this.activeUsers.length, " users online");
      // send all active users to new user
      io.emit("get-online-users", this.activeUsers);
    });
    client.on("new_message", (data) => {
      console.log("new message");
      const { room } = data;

      client.join(room);
      io.to(room).emit("new_message", data);
    });
    // subscribe person to chat & other user as well
    client.on("subscribe-to-chat", (data) => {
      console.log("subscribe-to-chat");
      const { room, otherMemberId } = data;
      console.log("room1", room);
      client.join(room);
      this.subscribeOtherUser(room, otherMemberId);
    });
    client.on("typing", (data) => {
      const { room, username } = data;
      console.log("room2", room);
      client.join(room);
      client.broadcast.emit("typing", username);
    });
    client.on("disconnect", () => {
      console.log("disconnect");
    });

    client.on("unsubscribe", () => {
      console.log("unsubscribe");
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      console.log("unsubscribe");
      client.leave(room);
    });
  };
  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );

    userSockets.map((userInfo) => {
      // const socketConn = global.io.sockets.connected(userInfo.socketId);
      // console.log("socketConn", socketConn);
      // if (socketConn) {
      //   socketConn.join(room);
      // }
    });
  }
}
export default new WebSockets();
