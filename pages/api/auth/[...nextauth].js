import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { Prisma,PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { useTransition } from "react";
const prisma = new PrismaClient()
export default NextAuth({
    session: {
        strategy:"jwt"
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    providers:[
        CredentialsProvider({
            name: "credentails",
            credentails: {},
            async authorize(credentails,req){
                const {username,password} = credentails //accept 2 params as username and password
                console.log('ddd')
                const user = await prisma.user.findUnique({
                    where: {username:username}
                })
              
                if(user){
                    console.log(user)
                    if(user.password === password){

                    
                    return {name:username} //set Session name to username
                    }
                    else{
                        return null
                    }
                }   
           
                // if(username !== "f@d"){  //Doing register Authentication such as checking password
                //     throw new Error("test")
                // }
                console.log("User do not exist!")
                return null 
            }
        })
    ],
    callbacks: {
        async session({session, token, user}) {
            session = {
                ...session,
                user: {
                    id: 5, //set id here
                    ...session.user
                }
            }
            return session
        }
    },
    adapter: PrismaAdapter(prisma)
})