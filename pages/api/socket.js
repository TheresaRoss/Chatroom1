import { Server } from "socket.io";
import messageHandler from "../../component/messageHandler"
export default function SockerHandler(req,res) {
    if (res.socket.server.io) {
        console.log("Already set up!!");
        res.end();
        return;
      }

      const io = new Server(res.socket.server);
      res.socket.server.io = io;
    
      const onConnection = (socket) => {
        messageHandler(io, socket); //handle message sent
      };
    
      // Define actions inside
      io.on("connection", onConnection); // when connected, do onConnection from user
    
      console.log("Setting up socket");
      res.end();
    
}
