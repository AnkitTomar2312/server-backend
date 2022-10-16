const express = require('express');
let app = express();
let cors = require('cors');
app.use(cors());
const socket = require('socket.io')

const server = app.listen(3001, ()=>{
    console.log("Listening..")
})

const io = socket(server, {
    cors: {
        origin: '*',
    }
})

io.on("connection", (socketClient)=>{
    console.log(socketClient.id);
    socketClient.on("Message", (data)=>{
        console.log(data)
    socketClient.emit("Message","Salame ishq from backend")
    })
    socketClient.on("Broadcast", (clientData)=>{
        console.log(clientData)
        io.emit("Broadcast", "Salme ishq to all from backend")
    })
    socketClient.on("exclusiveBroadcast", (exclusive)=>{
        console.log(exclusive)
        socketClient.broadcast.emit("exclusiveBroadcast", "Exclusive Message")
    })

    socketClient.on("JoinTheRoom", (clientData)=>{
        console.log(clientData)
        socketClient.join("Chatting_Room");
        socketClient.emit("joinSuccess", "CLient Joined Succesfully");
    })

    socketClient.on("sendRoomMessage", (clientData)=>{
        console.log(clientData)
        io.to("Chatting_Room").emit("sendRoomMessage", clientData)
    })
})
4
app.get("/",(req,res)=>{
    res.send("Hello Ankit !")
})