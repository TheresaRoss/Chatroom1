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
        socket.on("join",async function(chat){
        //console.log(chat+ 'NULLYOURMUM!')
         const newchat = chat.toString()
         console.log("nowchatwith "+newchat)
         console.log(typeof newchat + ' dddddddddddddddddd')
          //console.log(chat+' dsdsss')
          await socket.join(newchat)
          console.log('joined    '+socket.rooms)

        })

        socket.on("leave",function(id){
      
          const newid = id.toString()
          console.log("leave "+newid)
          socket.leave(newid)
        })
  

        messageHandler(io, socket); //handle message sent

      };
      
  


      // Define actions inside
      io.on("connection", onConnection); // when connected, do onConnection from user
    
      console.log("Setting up socket");
      res.end();
    
}

