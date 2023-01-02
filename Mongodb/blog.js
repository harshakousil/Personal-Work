const MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost:27017/ MongoDatabase";  
MongoClient.connect(url, function(err, db) {  
if (err) throw err;  
var dbase = db.db("mydb");
dbase.createCollection("matter", function(err, res) {  
if (err) throw err;  
console.log("Collection is created!");  
db.close();  
});  
});