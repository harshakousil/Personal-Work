var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;

app.get("/", (req, res) => {
  return res.render("formvalidate");
});

app.post("/add", (req, res) => {
  var url = "mongodb://localhost:27017/UserInfo";

  var name=req.body.name;
  var email=req.body.email;
  var phoneno=req.body.phoneno;
  var address=req.body.address;

  const details = {
    name: name,
    email: email,
    phoneno: phoneno,
    address: address,
  };

  let userdata;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    dbase.listCollections().next((err, callinfo) => {
      if (!callinfo) {
        dbase.createCollection("userDetails", (err, res) => {
          if (err) throw err;
        });
      }
    });

    dbase.collection("userDetails").insertOne(details, (err, result) => {
      if (err) throw err;

      dbase.collection("userDetails").find({}).toArray((err, result) => {
          if (err) throw err;
         userdata = result ;
           res.render("formvalidate", { userdata: userdata });
           db.close();
        });
    });
  });
});

app.get("/update/:id", (req, res) => {
  var url = "mongodb://localhost:27017/UserInfo";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    let id = new mongo.ObjectId(req.params.id);
    dbase.collection("userDetails").findOne({ _id: id }, (err, userdata) => {
      if (err) throw err;
      db.close();
     res.render("formupdate", { userdata: userdata });
     console.log(userdata);
    });
  });
});
app.get("/delete/:id", (req, res) => {
    var url = "mongodb://localhost:27017/UserInfo";
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbase = db.db("UserInfo");
      let id = new mongo.ObjectId(req.params.id);
      dbase.collection("userDetails").findOneAndDelete({ _id: id }, (err, userdata) => {
        if (err) throw err;
        dbase.collection("userDetails").find({}).toArray((err, result) => {
            if (err) throw err;
            db.close();
            return res.render("formvalidate", { userdata: result });
          });
      });
    }); 
  });
app.post("/save/:id", (req, res) => {
  var url = "mongodb://localhost:27017/UserInfo";
  var name=req.body.name;
  var email=req.body.email;
  var phoneno=req.body.phoneno;
  var address=req.body.address;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    let id = new mongo.ObjectId(req.params.id);
    dbase.collection("userDetails").findOneAndUpdate(
      { _id: id },
      {
        $set:{
          name: name,
          email: email,
          phoneno: phoneno,
          address: address,
        },
      },
      (err, userdata) => {
        if (err) throw err;
        dbase.collection("userDetails").find({}).toArray((err, result) => {
            if (err) throw err;
            db.close();
            return res.render("formvalidate", { userdata: result });
          });
      }
    );
  });
});


app.listen(1234, function(req, res)
{
    console.log("server is running at 1234")
});
