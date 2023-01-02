var express= require ('express');
var app= express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");



//creating a array for storing todo's
 var todoArray=[];


 //use post method to add a task into a todoArray.
 app.post("/addTodo", (req, res) =>
 {
    const newTodo = req.body.newtodo
    todoArray.push(newTodo);
    res.redirect("/");
 });
 app.post("/deletetodo/:id", (req, res) =>
 {
    const {id}= req.params
    todoArray.splice(id,1);
    res.redirect("/");
 })
 app.get("/" ,(req, res) =>
 {
   
    res.render("index", {todoArray});
 })
 app.listen(8081, () =>
 {
    console.log("Server is runnig at 8081");
 })
