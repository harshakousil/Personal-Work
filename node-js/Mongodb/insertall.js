const MongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/MongoDatabase";

MongoClient.connect(url, function(err,db)
{
    if(err) throw err
    var dbase=db.db("MongoDatabase");
    var myobj=[
        { title: "About Food", auther: "Deepti", catgry: "Food"},  
        { title: "How to play Guitar", auther: "Sanket", catgry: "Music"},  
        {title: "Design home like palace", auther: "Megha", catgry: "Decor"}
    ]
    dbase.collection("blogs").insert(myobj, function(err, res)
    {
        if(err) throw err
        console.log("all objects are inserted !");
        console.log(res.insertedCount);
        db.close();
    });
});