const express=require("express");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine',"ejs");
app.use(express.json())

const userSchema=require("./userModel");
const blogSchema=require("./blogModel");
const { default: mongoose } = require("mongoose");

app.post("/regi", async (req,res)=>
{
   
    const username= req.body.username;
    const email=req.body.email;
    const password=req.body.password;
   var user= new userSchema(
    {
        username:username,
        email:email,
        password:password,
    }
   )
   const value= await user.save();
   if(value)
   {
    res.render("./login.ejs",{id:value.id,username:value.username,});
   }
   res.end();
})

app.post("/login/:id", async (req,res)=>
{
    const id= req.params.id;
    const find_User= await userSchema.findById({_id:id});
    const check_password= req.body.password;
    //console.log(typeof find_User.id)
     if(find_User.password === check_password)
     {
         const find_all_blogs= await blogSchema.find({userId:find_User.id},{});
        console.log(find_all_blogs);
        // if(find_all_blogs.length==0)
        // {
        //     res.send('You have to add something');
        // }
        res.render("./addBlog.ejs",{userId:find_User.id, username:find_User.username});
        res.end();
     }
     else{
            res.render("./login.ejs",{id:find_User.id,username:find_User.username});
     }
})
// app.get("/login", async (req,res)=>
// {
//     res.render("./login.ejs")
// })
app.post("/login/addBlog/:id", async (req, res)=>
{
    //console.log("You are here");
    const author= req.body.author;
    const blogHead=req.body.blogHead;
    const content=req.body.content;
    const id=req.params.id

     var add_blog =  new blogSchema(
        {
            author:author,
            blogHead:blogHead,
            content:content,
            userId:id
        }
     )
     const add_blog_result = await add_blog.save();
     console.log(add_blog_result.userId);
})
app.get("/", (req,res)=>
{
    res.render("./reg.ejs");
})

app.listen(7890, ()=>
{
    console.log("server is  running at 7890");
})