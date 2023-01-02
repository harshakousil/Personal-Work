
const express = require("express");
const createError =require("http")

const mongoose = require("mongoose");
const path = require("path");
const app = express();
const router = require("./routes/routes.js");
app.use(express.static(path.join(__dirname, "public")));
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);


let url = "mongodb://localhost:27017/todo-app";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
mongoose.pluralize(null);

db.on("error", console.error.bind(console, "There is a connection error"));


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});
module.exports = app;

app.listen(3000, () => {
  console.log("Server is running at 3000");
});















































// // importing required express and body-parser modules
// const express= require('express');
// const bodyParser=require('body-parser');
// const app= express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());



// //importng mongoose modules

// const mongoose= require("mongoose");

// // then connecting it to database using mongodb

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
//  const userSchema=mongoose.model("todo",new mongoose.Schema({
//     text:String,
//     isCompleted:Boolean
// }))
// // console.log(userSchema);
// // const data=new userSchema({
// //     text:"how are you >",
// //     isCompleted:false
// // })
// // data.save()




// app.listen(3000, ()=>
// {
//     //console.log("server is running at 3000");
// })






