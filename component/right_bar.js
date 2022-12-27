import React, { useDebugValue } from "react";
import io from "socket.io-client";
import Styles from "../component/rightbar.module.css"
import { useState, useEffect } from "react";
export const Rightbar = (props) => {
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
            //accept new message??


        });
    };

    const sendMessage = async (e) => {
        e.preventDefault()
        socket.emit("createdMessage", message);//send message to api
        setMessages((currentMsg) => [
            ...currentMsg,
            e.target.box1.value,
        ]); //update message array
        setMessage(""); //revalue message
        console.log(messages)

    };
    return (
        <div className={Styles.mainlay}>
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