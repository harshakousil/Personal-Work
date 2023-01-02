const MongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/Mongodatabase";
MongoClient.connect(url, function(err, db)
{
    if(err) throw err
    var myobj={ title: "About Food", auther: "Deepti", catgry: "Food" };
    var dbase = db.db("mydb");
    dbase.collection("blog").insertOne(myobj, function(err, res)
    {
        if(err) throw err
        console.log("object is inserted !");
        db.close();
    });
});