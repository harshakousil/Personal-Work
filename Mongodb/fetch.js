var express= require("express");
var app=express();
var path= require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
var MongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/UserInfo";
var data
MongoClient.connect(url, function(err,db){
    if(err) throw err
    var dbase=db.db("UserInfo");
    data=dbase;

});

app.post("/adddata", (req, res) =>
{
    var obj=
    {
        name:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    }
    
    data.collection("UserDetails").insertOne(obj, function(err,res)
    {
    if(err) throw err
    });  


res.redirect("/");
res.end();
})





app.get("/", (req, res)=>
{
    data.collection("UserDetails").find({}).toArray(function(err, result) {  
        if (err) throw err; 
        console.log(result); 
        res.render("fetch", {result:result});    
   
    }); 
})
app.listen(4456, ()=>
{
    console.log("Running mowaa");
})