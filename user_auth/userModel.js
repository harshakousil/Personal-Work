
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog-app");


var userSchema= new mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
    },
    {versionKey:false}
)

module.exports =  mongoose.model("users",userSchema);












