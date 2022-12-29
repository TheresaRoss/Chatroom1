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

        //find who u chat with
        const addUser = await prisma.user.findUnique({
            where: { username: body.anotherone }
        })

        //find chatroom with id 
        //where user1id = sender AND user2id = partner, OR user1id = partner AND user2id = sender
        const findChatroom = await prisma.chatroom.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            { user1Id: body.senderId },
                            { user2ID: addUser.id }
                        ]
                    },
                    {
                        AND: [
                            { user2ID: body.senderId },
                            { user1Id: addUser.id }
                        ]
                    }
                ]
            }   
        })
        res.status(200).json({
            body: findChatroom.id
        })

    }
}
        