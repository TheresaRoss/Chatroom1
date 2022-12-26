
export default (io, socket) => {
    const createdMessage = (msg) => {
      socket.broadcast.emit("newIncomingMessage", msg); //sent the msg back to client 
      //For now, sent back to the sender first
    };
  
    socket.on("createdMessage", createdMessage);
    //when client emit createdMessage, do createdMessage
  };