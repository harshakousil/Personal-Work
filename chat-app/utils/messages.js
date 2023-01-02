const moment=require('moment');


function formatMessage(username,text)
{
    Obj=
    {
        username,
        text,
        time:moment().format('h:mm a')
    };
    return Obj
}
module.exports= formatMessage ;