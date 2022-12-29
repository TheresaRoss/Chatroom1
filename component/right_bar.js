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
                        <p className="bg-info text-dark  d-inline"> {msg.senderId}</p> {/*sender na*/}
                        <p className="bg-info text-dark m-3 d-inline">{msg.details}</p>
                    </div>
                </div>
            </div>)

        return aa
    }



    const sendMessage = async (e) => {
        e.preventDefault()
        // socket.emit("createdMessage", message);//send message to api
        // //  setMessages((currentMsg) => [
        // //      ...currentMsg,
        // //      e.target.box1.value,
        // //  ]); //update message array
        // setMessage(""); //revalue message

        const yourmessage = {
            partnerid: props.yourpar, //user who you sent message to
            details: e.target.box1.value,
            senderId: props.id,
            chatroomid: props.chatroomid  //got it from leftchat
        }
        setMessage("") //can  clear input with this method too
        const response = await fetch("/api/chat/sendchat", {
            method: "POST",
            body: JSON.stringify(yourmessage)
        })
        const res = await response.json()
        console.log(res, 'fffffffffffffffffffff')

        reqChat()
    };

    const reqChat = async () => {
        const yourchatroom = {

            chatroomid: props.chatroomid
        }
        const response = await fetch("/api/chat/reqchat", {
            method: "POST",
            body: JSON.stringify(yourchatroom)
        })
        const res = await response.json()
        console.log(res.body, 'ddddddddddddddddddddd')
        setMessages(res.body)

    }

    const Show = () => {
        if (props.chatroomid) {
            return (
                <>
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
                                     //link message to value in input too
                                    className="form-control"
                                  
                                />
                                <button className="btn btn-primary">Send</button>
                                <button className="btn btn-secondary" type="button" onClick={reqChat}>RW</button>
                            </div>
                        </form>
                    </div>
                </>
            )
        }
        else {
            return <></>
        }
    }

return (
    <div className={Styles.mainlay}>
       <Show/>
    </div>
)
}