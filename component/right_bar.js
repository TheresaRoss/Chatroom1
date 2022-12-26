import React, { useDebugValue } from "react";
import io from "socket.io-client";
import Styles from "../component/rightbar.module.css"
import { useState, useEffect } from "react";
export const Rightbar=(props)=>{
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = io();

    useEffect(() => {
        socketInitializer();
      }, []);

    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        await fetch("/api/socket");

 
     
        socket.on("newIncomingMessage", (msg) => {//Server call newIncoming Message
            console.log(msg) //the message that just sent
            console.log('dddddddddddddddddddd') //accept new message??
      
        
        });
    };

    const sendMessage = async (e) => {
        e.preventDefault()
        socket.emit("createdMessage",  message );//send message to api
        setMessages((currentMsg) => [
          ...currentMsg,
           e.target.box1.value ,
        ]); //update message array
        setMessage(""); //revalue message
        console.log(messages)
     
    };
return(
    <div className={Styles.mainlay}>
        YOYO
        <div className="border-t border-gray-300 w-full flex rounded-bl-md">
              <form onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="New message..."
                id="box1"
                name="box1"
                value={message}
                className="outline-none py-2 px-2 rounded-bl-md flex-1"
                onChange={(e) => setMessage(e.target.value)}
             
              />
              <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                <button
                  className="group-hover:text-white px-3 h-full"
          
                >
                  Send
                </button>
              </div>
              </form>
            </div>
    </div>
)
}