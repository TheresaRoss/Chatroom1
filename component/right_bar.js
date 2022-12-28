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


    const AllMsg = () => { //custom chat box
        const aa = messages.map((msg, index) =>
            <div className="container bg-transparent  p-0">
                <div className="row  bg-transparent mb-1 mt-2">
                    <div className="d-flex justify-content-center bg-transparent align-items-center text-center p-0 m-0 col-1 ">
                        <img className="rounded-circle" src="/profilenoob.png" width='25' height='25' />
                    </div>
                    <div className="bg-info border border-dark col-10 rounded-pill   ps-2">
                        <p className="bg-info text-dark  d-inline"> {props.yourpar}</p> {/*sender na*/}
                        <p className="bg-info text-dark m-3 d-inline">{msg}</p>
                    </div>
                </div>
            </div>)

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
                <AllMsg />
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