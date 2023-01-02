var express= require("express");
var app=express();
var path= require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
var MongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/UserInfo";


app.post("/adddata", (req, res) =>
{
    var obj=
    {
        name:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    }
    console.log(obj);
    MongoClient.connect(url, function(err,db)
{
    if(err) throw err
    var dbase=db.db("UserInfo");
    dbase.collection("UserDetails").insertOne(obj, function(err,res)
    {
        if(err) throw err
    })
})
res.send("User detailsa are entered");
    res.redirect("/");
})





app.get("/", (req, res)=>
{
    res.render("regi");
    res.end();
})
app.listen(3456, ()=>
{
    console.log("Running mowaa");
})