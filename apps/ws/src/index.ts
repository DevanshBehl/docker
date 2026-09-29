import { prisma } from "@repo/db";
import {WebSocketServer} from "ws";

const wss = new WebSocketServer({
    port:3002
})

wss.on("connection",(ws)=>{
    console.log("client connected");

    ws.on("message",async()=>{
        try{
            const user = await prisma.user.create({
            data:{
                username:"devansh",
                "password":"devansh"
            }
            })

            ws.send("user created successfully")

        }catch(e){
            ws.send("there was an error while creating a user")
        }
    })
})