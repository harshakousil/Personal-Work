// var express= require("express");
// var cookieparser=require("cookie-parser");
// const cookieParser = require("cookie-parser");
// var app= express();
// app.use(cookieParser());




// app.get("/", function(req, res) 
// {
//     res.cookie('name' , 'express', { expire:'3600' +Date.now()})
//     res.cookie('name', 'nodejs',{maxAge:'5000'})
//     res.send('cookie set');
// })
// app.listen(3000, () =>
// {
//     console.log("Running at 3000")
// })
const express= require("express");
const session = require("express-session");
const cookieparser= require("cookie-parser");
var app=express();
app.use(cookieparser());
app.use(session({secret :"your secret key"}));


app.get("/", (req, res) =>
{
    var page_view_count=0;
    if(page_view_count)
    {
        page_view_count++;
        res.send(" you have viewed this page for" + page_view_count +" times")
    }
    else{
        page_view_count =1;
        res.send(" welcome to the page for first time");
    }
})
app.listen(4567, () =>
{
    console.log(" running at 4567");
})

