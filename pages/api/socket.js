import { Server } from "socket.io";
import messageHandler from "../../component/messageHandler"
export default function SockerHandler(req,res) {
    if (res.socket.server.io) {
        console.log("Already set up!!");
        res.end();
        return;
      }
      //Fail file, can't use SOCKET TT
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
    
  
      
      // Define actions inside
      io.on("connection", (socket) => {
        socket.on("join",async function(chat){
        //console.log(chat+ 'NULLYOURMUM!')
         const newchat = chat.toString()
         console.log("nowchatwith "+newchat)
         //console.log(typeof newchat + ' dddddddddddddddddd')
          //console.log(chat+' dsdsss')
          await socket.join(newchat)
          console.log(socket.rooms)
          console.log("up is room when joined")

        })

        socket.on("createdMessage", function(msg){
          const newmsg = msg.toString()
          //console.log(typeof newmsg,' tyoe that')
          //socket.broadcast.emit("newIncomingMessage", msg); //sent the msg back to client 
          console.log(newmsg+' to send')
          
          socket.to(newmsg).emit("new","HI") //send to room newmsg
       
          console.log(socket.rooms)
          //Bug?, send to everyone including sender
        })

        socket.on("leave",function(id){
          console.log(socket.rooms)
        //   const newid = id.toString()
        //   console.log("leave "+newid)
        //   socket.leave(newid)
         })


       
      }); // when connected, do onConnection from user
    
      console.log("Setting up socket");
      res.end();
    
}

