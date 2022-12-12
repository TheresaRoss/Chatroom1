import React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import  { useRouter } from 'next/router'

export default function Login(){    const [regis,setRegis] = useState(false)
    const router = useRouter()
    const [errorsignin,setErrorsignin] = useState('')
    const clickRegis=(e)=>{
        setRegis(true)
    }
    const timeout = (time) =>{
        window.setTimeout(()=>{
            setErrorsignin('')
        },time)
    }
    const ErrorSignin = ()=>{
        if(errorsignin === 'wrongpass'){
           
            console.log('ddddd')
            timeout(3000)
            return <h3 className="text-danger mt-3">Wrong Username or Password!</h3>
        }
        else if(errorsignin === 'samedata'){
            timeout(3000)
            return <h3 className="text-danger mt-3">These username is already taken</h3>
        }
        else{
            return <></>
        }
    }

    const handleSignin= async(e)=>{
        e.preventDefault();
            const username= e.target.username.value
            const password= e.target.password.value
    
        let au = await signIn("credentials", {username: username,password: password,redirect: false}) //Normally sign in
        if(au.status === 401){
            console.log("u fucked up!")
            setErrorsignin('wrongpass')
        }
        else{
            router.push('Main/main')
        }

    } 

    const handleRegis = async(e)=>{
        e.preventDefault()
        const newuser = {
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value
        }
        const response = await fetch("/api/authentication/register",{ //Set register request
            method: "POST",
            body: JSON.stringify(newuser)
        })
        const responseData = await response.json();
        
        if(responseData.body === "DONE"){ //If successfully log in
            await signIn("credentials", {username: newuser.username,password: newuser.password,callbackUrl: '/Main/main'}) //Let next Auth do its job
        
            
        }   
        else{ //Register error
            setErrorsignin('samedata')
        }
        

    }
    const ShowRegis=()=>{
        if(regis){
            return(
                <form onSubmit={handleRegis} >
                    <label className="form-label mt-3 " >Name</label>
                    <input type="text" className="form-control" id="name" name="name" required ></input>
                    <label className="form-label mt-2" >Username</label>
                    <input type="email" className="form-control" id="username" name="username" required></input>
                    <label className="form-label mt-2"  >Password</label> 
                    <input className="form-control" type="password" id="password" name="password" required></input>
                    <button className="btn btn-primary mt-3" type="submit">Go</button>
                    <button className="btn btn-warning mt-3 float-end" type="button" onClick={()=>setRegis(false)}>Back</button>
                </form>
            )
        }
        else
            return<></>
    }
    return (
        <>
            <div className="container" >
            <div className="mt-4 text-center">
                <img src="/museconnect.png"  width="100" height="100"></img>
            </div>
            <form onSubmit={handleSignin}>
                <label className="form-label mt-5">Username</label>
                <input type="email" className="form-control" id="username" name = "username"></input>
                <label className="form-label mt-2">Password</label> 
                <input className="form-control" type="password" id="password" name="password"></input>
                {!regis && <button className="btn btn-primary mt-3" type="submit">Go</button>}
                {!regis && <button className="btn btn-primary mt-3 float-end" type="button" onClick={clickRegis}>Register</button>}
            </form>         
            <ErrorSignin/>
         
        
            <ShowRegis/>
           </div>
       </>
    )
}