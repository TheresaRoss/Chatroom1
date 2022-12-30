import SendmailTransport from "nodemailer/lib/sendmail-transport";

export default (io, socket) => {
    const createdMessage = (msg) => {
      const newmsg = msg.toString()
      //console.log(typeof newmsg,' tyoe that')
      //socket.broadcast.emit("newIncomingMessage", msg); //sent the msg back to client 
      console.log(newmsg+' to send')
      
      socket.to(newmsg).emit("new","HI") //send to room newmsg
   
      console.table( socket.rooms)
      //Bug?, send to everyone including sender
    };
   
    socket.on("createdMessage", createdMessage);
    //when client emit createdMessage, do createdMessage
  };