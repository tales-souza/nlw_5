import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";


io.on("connect", (socket) => {

  const connectionsService = new ConnectionsService();
  const userService = new UsersService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;
    let user_id = null;


    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await connectionsService.findByUserId(userExists.id);
      

      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;

        await connectionsService.create(connection);
      }
    }
  const messagesService = new MessagesService();
    await messagesService.create({text, user_id});

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages",allMessages)

  })
});




