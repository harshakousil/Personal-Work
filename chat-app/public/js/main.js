
const chatForm=document.getElementById("chat-form");

const chatmessages=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name');
console.log(roomName);
const userList=document.getElementById('users');



//Get user name and room from URL
  const {username, room}=Qs.parse(location.search, { ignoreQueryPrefix:true})
  console.log(username,room)

const socket=io();
// Mesaage from server


//join chat room
socket.emit('joinRoom',{username,room})


 //get  room and users

 socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
 });




socket.on('message', message=>
{
     console.log(message);
     outputMessage(message);


     // code to scroll down automatically while client enter a messages
     chatmessages.scrollTop=chatmessages.scrollHeight;
})

chatForm.addEventListener("submit",(e)=>
{
   e.preventDefault();
    
  //getting message from the client/front page
   const msg=e.target.elements.msg.value
   //sconsole.log(msg);

   //emiting that message to server
   socket.emit('chatmessage', msg)

   //clear the input after user enters a message 
   e.target.elements.msg.value='';
   e.target.elements.msg.focus();
})


//output message to DOM/Front-END

function outputMessage(message)
{
 const div=document.createElement('div',)
 div.classList.add('message');
 div.innerHTML= `<p class="meta">${message.username} <span>${message.time}</span></p>
 <p class="text">
${message.text}
 </p>`;
 document.querySelector('.chat-messages').appendChild(div);

}


// Add room name to front-end

function outputRoomName(room)
{
roomName.innerText=room;
}

// Add userList to Front-end

function outputUsers(users)
{
  userList.innerHTML= `${users.map( user =>  `<li>${user.username}</li>`).join('')}`;
}