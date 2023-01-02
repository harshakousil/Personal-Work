const users=[];


//join user to chat when they log into particulat room
function userJoin(id, username,room)
{
    const user={id,username,room};

    users.push(user);
    return user;

}

//get Current user

function getCurrentUser(id)
{
   return users.find(user=> user.id ===id)
}


//uRemoving user when  he leaves a room
 function userLeave(id)
 {
    const index =users.find(user=>user.id ===id);


    if(index !==-1)
    {
        return users.splice(index,1)[0]
    }
 }


 // get Room users list to display on the side

 function  getRoomUsers(room)
 {
    return users.filter( user =>user.room === room )
 }

module.exports=
{
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}