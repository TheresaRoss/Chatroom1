import { Prisma, PrismaClient } from "@prisma/client";

import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const body = JSON.parse(req.body)
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
        //console.log(body.chatroomid + ' ddddddddddddddd')

        //find every message where chatroomid is the right one
        const allmes = await prisma.message.findMany({
            where:{chatroomId:body.chatroomid}
        })

        //console.log(allmes)

        res.status(200).json({
            body: allmes
        })


      





    }
}