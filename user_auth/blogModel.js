var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog-app");

 var Blog_Schema = new mongoose.Schema(
    {
        author:String,
        blogHead:String,
        content:String,
        userId:String,
    },
    {
        versionKey:false,
    }
 )

 module.exports=mongoose.model("blogs",Blog_Schema);