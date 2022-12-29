import React from "react"
import { useSession } from "next-auth/react"

import { useState } from "react"
import { Layout } from "../../component/layout"
import { LeftChat } from "../../component/left_bar"
import { Rightbar } from "../../component/right_bar"



export default function(){
    const  {data:session, status} = useSession()

    const [friendid,setFriendid] = useState('')
    const [chatroomid, setChatroomid] = useState()

    var username,id,name

    const handleTest = (data)=>{
        setTest1(data)
        console.log(data) //accept data from layout, and can use it in main compo
    }

    const setFriendtoChat = (data) =>{
        setFriendid(data)
        // console.log(data + ' ddddddddddddddddddddd')
    }

    const setChatroomidd = (data) =>{
        setChatroomid(data)
        console.log('chatroom '+ data)
        }
    
  
    if(session && status === "authenticated"){ //easiest way to acess value need to authenticated first
        console.log(session)
 
        username = session.user.email
        id = session.user.id
        name= session.user.name
    }
    const UserInfo =()=>{
    if(session){ //must pass if session everytime?
       
        return(
            <div className="container mt-3">
                  
      
        </div>
            )}
    else{
        return<></>
    }
    }
    return(<>
        <Layout yoyo={username}  />
        <LeftChat id={id} chatpartner={setFriendtoChat} chatroomna={setChatroomidd}/>
        <Rightbar yourpar={friendid} id={id} chatroomid={chatroomid}/>

    
       <UserInfo/>
        </>)
}