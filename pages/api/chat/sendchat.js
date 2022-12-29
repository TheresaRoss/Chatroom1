import { Prisma, PrismaClient } from "@prisma/client";

import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const body = JSON.parse(req.body)
    // console.log(body.partnerid + ' ddddddddddddddddddd')
    if (req.method === "POST") {
        //Just to make sure that no one shoot api directly without signin
        const session = await getSession({ req })
        if (session) { }
        else {
            res.status(500).json({
                body: "GU ASK REAL!"
            })
            return
        }

        
        //create message
        const newmessage = await prisma.message.create({
            data:{
                chatroomId:body.chatroomid,
                senderId:body.senderId,
                details:body.details
            }
        })


        res.status(200).json({
            body: "DONE"
        })

    }
}