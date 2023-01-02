//requireing mongoose in our data

var mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog-app")


//creating a mongoose schema and model/collection/table to that schema

var blogSchema= new mongoose.Schema(
    {   author: String,
        blog_head:String,
        img:{
        data: Buffer,
        contentType: String},
        body: String,
     },

    {versionKey: false}
    );
module.exports= BlogModel=mongoose.model("Blogs", blogSchema)