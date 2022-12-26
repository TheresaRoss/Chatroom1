import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { Prisma,PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { use, useTransition } from "react";
const prisma = new PrismaClient()
export default NextAuth({
    session: {
        strategy:"jwt"
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login"

    },
    providers:[
        CredentialsProvider({
            name: "credentails",
            credentails: {},
            async authorize(credentails,req){
                const {username,password} = credentails //accept 2 params as username and password
              
                const user = await prisma.user.findUnique({
                    where: {username:username}
                })
    
                if(user){
                
                    if(user.password === password){
                       
                    
                    return {name:user.name,id:user.id,email:user.username} //set Session name to username
                    }
                    else{
                        return null
                    }
                }   
           
                // if(username !== "f@d"){  //Doing register Authentication such as checking password
                //     throw new Error("test")
                // }
                console.log("User do not exist!")
                return  null //throw error name
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user){
                token.uid = user.id
                token.username = user.username
            }
            return token
          },
        async session({session, token, user}) {
            session = {
                ...session,
                user: {
              
                    id: token.uid, //set id here
                    
                    ...session.user
                }
            }
            return session
        }
    },
    adapter: PrismaAdapter(prisma)
})