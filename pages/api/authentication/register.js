
import { Prisma,PrismaClient } from "@prisma/client";

const  prisma = new PrismaClient()
export default async function handler(req, res) {
    // Get data submitted in request's body.
    if(req.method === 'POST'){
      console.log("dddddddddddddddddd")
      console.log(req.body)
      const body = JSON.parse(req.body)
    
      // Optional logging to see the responses
      // in the command line where next.js app is running.
      console.log('body: ', body)
      try{
        const newUser= await prisma.user.create({
            data:{
              name: body.name,
              username: body.username,
              password: body.password
            }})
    
        }
    catch(e){
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            if (e.code ==='P2002'){
                console.log('same data inserted')
           
                res.status(500).json({
                  body:"We fucked up"
                })

               
            }
        }
        throw e
    }

      // Guard clause checks for first and last name,
      // and returns early if they are not found

    
      // Found the name.
      // Sends a HTTP success code
      // await signIn("credentials", {username: body.username})
      console.log( "Logged in" )
      res.status(200).json({
        body: "DONE"
      })
    }
    else{

    }
  }