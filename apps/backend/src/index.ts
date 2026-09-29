import express from "express";
import {prisma} from "@repo/db";

const app = express();
app.use(express.json());

app.get("/users",async (req, res)=>{
    try{
        const users = await prisma.user.findMany();
        res.json(users);

    }catch(e){
        res.status(500).json({error:"error in fetching users from db"});
    }
})

app.post("/user",async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        res.status(400).json({error:"username and password are required"});
        return
    }
    try{
        const user = await prisma.user.create({
        data:{
            username:username,
            password:password
        }
        })
        res.status(200).json(user);
    }catch(e){
        console.log(e);
        res.status(500).json({error:"there is an error"})
    }
    
})

app.listen(3001);