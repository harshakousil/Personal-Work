const mongoose= require("mongoose");
// const mongodb="mongodb://localhost:27017/todo-app"
// mongoose.connect(mongodb)
// .then(()=>
// {
//     console.log("database connection is sucessfull");
// })
// .catch(()=>
// {
//     console.log(err);
// })
var userSchema=mongoose.model("todo", new mongoose.Schema({
    text: String,
    isCompleted: { type: Boolean, default: false },
}))
module.exports=userSchema;
