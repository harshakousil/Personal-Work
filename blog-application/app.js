// importing the files

//  using express files
var express= require('express');
var app= express();
var fs = require('fs');
var path = require('path');
// var busboy = require('connect-busboy');
const fileUpload = require("express-fileupload");
const multer=require('multer');
const BlogModel= require("./blog_model")
// mongooose files 
// var mongoo= require("mongoose");
// mongoo.connect("mongodb://localhost:27017/blog-app")

// using body-parser to get the data fromejs file
const bodyParser= require("body-parser");
const { default: mongoose } = require('mongoose');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static("uploads"));
// Using Ejs files to work with Front end part.
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');
//creating a mongoose schema and model/collection/table to that schema

// var blogSchema= new mongoo.Schema(
//     {  author:String,
//         blog_head:String,
//         img:{
//         data: Buffer,
//         contentType: String},
//         body: String,
//      },

//     {versionKey: false}
//     );

//var addBlog= mongoo.model("Blogs",blogSchema);


// all the working routes

// app.get("/", (req, res)=>
// {
//     let Hi="Welcome to this page"
//    res.render("first", {Hi});
// })

// Using multer to store the images in the middleware.
const Storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,callback)=>
    {
        callback(null, file.originalname);
    },
 })
 const upload_image=multer(
    {
        storage:Storage,
    },
    {limits : {
        fieldNameSize: 100,
        files: 2,
        fields: 5
    } }
 ).single('image')

app.post("/addBlogPost",(req, res)=>
{
    if(!req.files){
        console.log('error no file selected')
        // console.log(req.body);
        res.send({error:'No File selected'})
        return
    }
    console.log("You are in Add Blog");
    const {img}=req.files
    // console.log(img);
    // console.log(req.files);
    var post= new  BlogModel(
        {
            author:req.body.author,
            blog_head:req.body.blog_head,
            img:
            {
                data:img.name,
                contentType:img.mimetype,
            },
            body:req.body.newblog
        });
        // console.log(post)
    // console.log(req.body);
    // console.log(req.files);
    res.json({post})
    console.log(req.body);
    //res.json({message:'successfully uploaded'})
    upload_image(req, res, ()=>
    {
                if ( post.body ===' ')
                {
                    res.send("Pleae enter some data")
                }
                else{
            
                    async function addblog()
                    {
                    const value= await post.save(); 
                    if(value)
                    {
                        console.log(value);
                        res.redirect('/'); 
                    }
                    else{
                        console.log("something went wrong")
                    }     
                    }
                    
                    addblog();
                 }
       
    })
})
app.post("/deleteblog/:id", async (req, res)=>
{
    var id= new mongoo.Types.ObjectId(req.params.id);
    await addBlog.findByIdAndDelete({_id:id})
    res.redirect("/");
})
app.get("/addblog" ,(req, res)=>
{
    res.render("./Main_page.ejs")
})
app.get("/",(req, res)=>
{
    
    BlogModel.find({}, (err, result)=>
    {
        //console.log(result[0].img.data);
        res.render('first', {blogs:result});   // try to convert it into aync await function
    });
});
// app.get("/addblog", (req, res)=>
// {
//     res.render("addblog")
// })


app.listen(3456, ()=>
{
    console.log("Server is running at 3456");
})