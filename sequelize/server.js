var express= require("express");
var exphbs =require("express-handlebars");
const bodyParser = require("body-parser");
const path= require('path')
const cors=require("cors");
const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// calling the database connection from  folder config/db.config.js fileas db

const db= require('./config/db.config')


const { Connection } = require("pg");
// Creating a connection using sequelize


// Testing the Connection
// async  function Connection()
// {
//  try {
//    await db.authenticate();
//     console.log('Connected to database Sucessfully .');
//   } 
//   catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
//}

// code to check whether authentication happend or not
try{
  db.authenticate()
  .then(()=>console.log("Database Connected Sucessfully"))
  .catch((err)=> console.log("Error")+err);
}
catch(err)
{
  console.log("Error in  calling  connection code "+ err);
}


const db1 = require("./model/index");

 app.get("/", (req, res)=>
 {
    res.send("Hello");
 })

// Whenever we want to use routes call Routes/routes.js
 app.use("/index", require("./routes/routes.js"))
app.listen(7878, ()=>
{
    console.log("Server is Running at 7878");
})