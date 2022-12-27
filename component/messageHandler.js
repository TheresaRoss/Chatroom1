
export default (io, socket) => {
    const createdMessage = (msg) => {
      //socket.broadcast.emit("newIncomingMessage", msg); //sent the msg back to client 
      socket.to("1").emit("new",msg) //send to room 1  
      //Bug?, send to everyone including sender
    };
  
    socket.on("createdMessage", createdMessage);
    //when client emit createdMessage, do createdMessage
  };