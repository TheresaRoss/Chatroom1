import React from "react";
import Styles from "../component/leftbar.module.css"
import { useState } from "react";
export const LeftChat=(props)=>{
    const SendFriends=async(e)=>{
        e.preventDefault()
        console.log(props.id)
        if(e.target.Fusername.value === props.username){
            console.log("STOP!")
            return
        }
        const addUser = {
            fusername: e.target.Fusername.value,
            id: props.id
        }
    const response = await fetch("/api/friendreq/addfriend",{
        method: "POST",
        body: JSON.stringify(addUser)
    })
    const res = await response.json()
    console.log(res)
    }
    return (
        <div className={Styles.mainlay}>
            <h2 className="bg-success p-1 pb-2 m-0 text-center mg"> Add Friends</h2>
            <div className="bg-white text-center "><form className="form-inline" onSubmit={SendFriends}>
                <div className="input-group">
                    <input type="email" className="form-control" id="Fusername" name="Fusername" placeholder="Your Friends Username here!"/>
                    <button className="btn btn-primary" type="submit">Find</button>
                </div>
                </form></div>
        </div>
    )

}