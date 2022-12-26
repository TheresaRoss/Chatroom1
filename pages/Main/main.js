import React from "react"
import { useSession } from "next-auth/react"

import { useState } from "react"
import { Layout } from "../../component/layout"
import { LeftChat } from "../../component/left_bar"
import { Rightbar } from "../../component/right_bar"



export default function(){
    const  {data:session, status} = useSession()
    var username,id
  
    if(session && status === "authenticated"){ //easiest way to acess value need to authenticated first
        //console.log(session)
 
        username = session.user.email
        id = session.user.id
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
        <Layout yoyo={username}/>
        <LeftChat id={id}/>
        <Rightbar/>

    
       <UserInfo/>
        </>)
}