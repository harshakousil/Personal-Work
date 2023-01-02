const express= require("express");
const http=require("http");
const app=express();
const path=require("path");
const socketio= require("socket.io");
const formatMessage=require('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers}=require('./utils/users')



const Server=http.createServer(app) //creataing a Server using http by passing express as app
const io=socketio(Server);

const name='chatBot'

//setting up a environment when a cleint connectes using socket.io
io.on('connection', socket=>
{
    //socket.emit("message", formatMessage(name, 'welcome to My Chart app'))

    socket.on('joinRoom',  ({username, room})=>
    {
        const user= userJoin(socket.id,username,room);    
        socket.join(user.room);
       
       
        // sendinga  message when a user connects to the room
       // console.log("new Connnection established")
       
        socket.emit("message", formatMessage(name, 'welcome to My Chart app'))
     
     
     //broadcast when a user connects
     
     socket.broadcast.to(user.room).emit('message', formatMessage(name,`${user.username} has joined the room`));
         

    // Sending users and room information
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        })
    });







//chatMessages  to send it to client side
socket.on('chatmessage',  msg=>
{
    const user=getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
})
//Broadcas runs  when a user disconnects
socket.on('disconnect' ,()=>
{

    const user = userLeave(socket.id)
    if( user)
    {
        io.to(user.room).emit('message', formatMessage(name,`${user.username} disconnected  `));
         // Sending users and room information
        io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
    })
    
    }
    
});


})




app.use(express.static(path.join(__dirname,'public'))); 

Server.listen(3000, ()=>
{
    console.log("Server is running at 3000")
})