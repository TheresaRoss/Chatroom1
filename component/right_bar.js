import React, { useDebugValue } from "react";
import io from "socket.io-client";
import Styles from "../component/rightbar.module.css"
import { useState, useEffect } from "react";
export const Rightbar = (props) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    let allmes = []
    const socket = io();

    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        await fetch("/api/socket");


        socket.on("new", (msg) => { 

            console.log(msg + '  dddddddddddddddddddddd')
            allmes.push(msg) //push every new msg to array
            //console.log(allmes)
            //setMessages(allmes)
  
            setMessages((currentMsg) => [
                ...currentMsg,
                msg,
            ]); //update message array
            console.log(messages)
          
          
        })
    };


    const AllMsg = () => {
        const aa = messages.map((msg, index) =>
            <div className="bg-primary text-dark">{msg}</div>)
 
        return aa
    }



    const sendMessage = async (e) => {
        e.preventDefault()
        socket.emit("createdMessage", message);//send message to api
        //  setMessages((currentMsg) => [
        //      ...currentMsg,
        //      e.target.box1.value,
        //  ]); //update message array
        setMessage(""); //revalue message
    };
    return (
        <div className={Styles.mainlay}>
            <div className={Styles.chatbox}>
                <AllMsg/>
            </div>
            <div className={Styles.sendbox}>
                <form className="form-inline" onSubmit={sendMessage}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="New message..."
                            id="box1"
                            name="box1"
                            value={message}
                            className="form-control"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>

        </div>
    )
}