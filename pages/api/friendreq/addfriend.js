
import { Prisma, PrismaClient } from "@prisma/client";
import { getCsrfToken } from "next-auth/react"
import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    console.log(req.body)
    const body = JSON.parse(req.body)
    if (req.method === "POST") {
        const session = await getSession({ req })
        if(session){}
        else{
            res.status(500).json({
                body: "GU ASK REAL!"
            })
            return
        }
        console.log(body)
        console.log(session)
        // console.log('ggggggggggggggggggggggggggggggg')
        // const csrfToken = await getCsrfToken({req})
        // console.log(csrfToken)
        let addUser;
        //find who u gonna add
        addUser = await prisma.user.findUnique({
            where: { username: body.fusername }

        })

        if (addUser === null) {
            res.status(500).json({ body: "Can't find user" })
            return //add return everytime after respone na

        }
        console.log(addUser)

        //don't add yourself
        if (body.id === addUser.id) {

            res.status(500).json({
                body: "Can't add yourself"
            })
            return
        }

        //ไม่อยู่ใน FriendThat ของตัวเอง (ไม่เคยรับ req เค้า)
        const Look = await prisma.friend.findMany({
            where: {
                AND: [
                    { friendWithId: addUser.id },
                    { friendThatId: body.id }
                ]
            }

        })
        // didn't qualify
        if (Look.length !== 0) {
            res.status(500).json({ body: "Already in your friends list" })
            return
        }
        //ไม่อยู่ใน FriendWith ของตัวเอง (ไม่เคย add เค้า)
        const Look2 = await prisma.friend.findMany({
            where: {
                AND: [
                    { friendThatId: addUser.id },
                    { friendWithId: body.id }
                ]
            }
        })
        //same
        if (Look2.length !== 0) {
            res.status(500).json({ body: "Already in your friends list" })
            return
        }

        //Create new friend link
        try {
            const newUser = await prisma.friend.create({
                data: {
                    friendWithId: body.id,
                    friendThatId: addUser.id

                }
            })
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    console.log('same data inserted')

                    res.status(500).json({
                        body: "Already in your friends list"
                    })


                }
            }
            throw e
        }

        //create new chatroom too
        const newUser = await prisma.chatroom.create({
            data: {
                user1Id: body.id,
                user2ID: addUser.id
            }
        })

        res.status(200).json({
            body: "DONE"
        })
    }

}