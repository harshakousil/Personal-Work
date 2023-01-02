// const MongoClient = require('mongodb').MongoClient;  
// var url = "mongodb://localhost:27017/MongoDatabase";  
// MongoClient.connect(url, function(err, db) {  
// if (err) throw err;  
// console.log("Database created!");  
// db.close();  
// });
const MongoClient=require("Mongodb").MongoClient;
var url="mongodb://localhost:27017/MongoDatabase";
MongoClient.connect(url,function(err, db)
{
    if(err) throw err;
    console.log("database created sucessfully");
    db.close();
})
