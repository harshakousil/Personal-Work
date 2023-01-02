const express=require("express");
const sessions =require("express-session");
const cookieparser=require("cookie-parser");
const path=require('path');
var app=express();
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
var session

app.use(sessions({
     secret: "this is secret key",
     saveUninitialized:true,
     resave:false,
     cookie :{maxAge:1000000000000}

}));
app.post('/user',(req,res)=> {
    session=req.session;
    session.username=req.body.username;
    session.email=req.body.email;

    var errors =[];
    if(session.username==="")
    {
        errors.push("Invalid user name");
        
    }
   if(session.email==="")
    {
        errors.push("Invalid email");
    }
    if(errors.length!==0){
        res.render("authentication",{
           
            errors:errors  
        });
    }
    else{
        res.render('success',{
            username:req.session.username,
            email:req.session.email,
        })
    }
  
        // res.end();
    // res.redirect("/");
   
});
app.get("/",(req,res) =>
{
    res.render("authentication");
    res.end();
 
});



app.listen(1234, ()=>

{
    console.log("Server is running at 1234");
})