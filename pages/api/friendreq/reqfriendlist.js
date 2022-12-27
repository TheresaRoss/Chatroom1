import { Prisma, PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react"
import { resolve } from "styled-jsx/css";

const prisma = new PrismaClient()
//bug where sometime friend list sorted, sometime not
export default async function handler(req, res) {

    const body = parseInt(req.body)

    if (req.method === "POST") {


        let sendfriendinfo = [{
            username: "",
            name: ""
        }]
        sendfriendinfo.pop()
        const friendlist = await prisma.friend.findMany({
            where: { friendWithId: body }
        }
        ) //friendlist[0].friendThatId access your friends id

        let thattfriend = ""
        let nesw = {}

        let thattfriend2 = ""
        let nesw2 = {}

        //do that same thing as above, but with friendthat case
        const friendlist2 = await prisma.friend.findMany({
            where: { friendThatId: body }
        }
        ) //friendlist[0].friendThatId access your friends id

        function yo1() {
            return new Promise((resolve) => {
                if(friendlist.length === 0){
                    resolve()
                }
                friendlist.forEach(async (x, i) => {

                    // console.log(friendlist[i]),

                    thattfriend = await prisma.user.findUnique({
                        where: { id: x.friendThatId }
                    }),
                        nesw = {
                            username: thattfriend.username,
                            name: thattfriend.name
                        },
                        // console.log(nesw),
                        sendfriendinfo.push(nesw)

                    if (i === (friendlist.length - 1)) {
                        resolve()// fulfill promise using resolve when finish looping last element
                    }
                }
                )


            }

            )


        }



        function yo2() {
            return new Promise((resolve) => {
                if(friendlist2.length === 0){
                    resolve()
                }
                friendlist2.forEach(async (x, i) => {
                    // console.log(friendlist[i]),
            

                    thattfriend2 = await prisma.user.findUnique({
                        where: { id: x.friendWithId }
                    }),
                        nesw2 = {
                            username: thattfriend2.username,
                            name: thattfriend2.name
                        },
                        // console.log(nesw2),
                        sendfriendinfo.push(nesw2)
                    if (i === (friendlist2.length - 1)) {
                        resolve() // fulfill promise using resolve when finish looping last element
                    }
                }
                )

            })


        }

        async function send() {
            await yo1()
            await yo2()

            res.status(200).json({
                body: sendfriendinfo
            })

        }
        send()


        



    }

}