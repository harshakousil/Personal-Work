var express= require("express");
let app=express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var path = require("path");
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
app.use(express.static(path.join(__dirname, "public")));
var url='mongodb://localhost:27017/todo'
//creating a database called todo and a collection called tododata
// MongoClient.connect(url, function(err, db){
//     if (err) throw err
//    let dbase=db.db("todo")
//     dbase.createCollection("tododata", function(err, res)
//     {
//         if(err) throw err
//         console.log("collection is created sucessfully");

//     })
// })

app.get("/", (req,res)=>
{

 async function Connect(){
    try{ 
   const db= await MongoClient.connect (url)  
    {
        
        let dbase=db.db("todo");
       const itemsleft= await dbase.collection('tododata').countDocuments({iscompleted:false})
        {
            
            res.render('todomongo', {itemsleft}) ;
        }
        }
    }
        catch(err)
        {
            console.log("err occured :" +err);
        }
   
}
Connect();
})


app.post("/addtodo", (req,res)=>
{  
     try{
        async function Add (){
            var input=req.body.checkbox;
            const textData= req.body.text;
            const todos={text:textData, iscompleted:false}
            const db= await MongoClient.connect(url)
            {
                let dbase=db.db("todo");
                await dbase.collection('tododata').insertOne(todos)
                const count = await  dbase.collection("tododata").countDocuments({iscompleted:false})
                const result= await dbase.collection("tododata").find({}).toArray();
                db.close();
                return  res.render("todomongo",{result, count});  
            }
        }
        Add();
}
catch(err)
{
    console.log('err occured'+err);
}
  
})

app.post("/changecheck/:id", (req,res) =>
{    
    try{
    async function check(){
    let id= new mongo.ObjectId(req.params.id);
    const db= await MongoClient.connect(url)
    let dbase=db.db("todo");
    var value= req.body.checkbox;
     if(value==="false")
    {
        let iscompleted=true;
        const find= await dbase.collection("tododata").findOneAndUpdate({_id:id,},{ $set:{iscompleted}})
        const itemsleft= await dbase.collection("tododata").countDocuments({iscompleted:false});
        const result = await dbase.collection("tododata").find({}).toArray();
        return res.render("todomongo",{result ,itemsleft});                    
    }
 if( value  === undefined)
        {
            let iscompleted= false;
            const findone= await  dbase.collection("tododata").findOneAndUpdate({_id:id,},{ $set:{iscompleted}})
            const itemsleft= await   dbase.collection("tododata").countDocuments({iscompleted:false})  
            const result= await dbase.collection("tododata").find({}).toArray();
            return  res.render("todomongo",{result,itemsleft});
        }

    }
    check();
}
catch(err)
{
    console.log("Error occured"+err);
}
})
app.get("/deletetodo/:id" ,(req,res) =>
{ 
    try{
        async function deletetodo(){
        const db= await MongoClient.connect(url)
        let dbase=db.db("todo");
        let id= new mongo.ObjectId(req.params.id);
        const del= await dbase.collection("tododata").findOneAndDelete({_id:id})
        const itemsleft= await dbase.collection("tododata").countDocuments({iscompleted:false})
        const result = await dbase.collection("tododata").find({}).toArray();
        return res.render("todomongo",{result,itemsleft});
    }

    deletetodo()
}
    catch(err)
    {
        console.log("err occured :" +err)
    }


});
app.get("/showall" ,(req,res) =>
{

    MongoClient.connect(url, (err,db) =>
    {
       let dbase=db.db("todo");
  
        dbase.collection("tododata").find({}).toArray((err,result) =>
        {
            if(err) throw err
            dbase.collection("tododata").countDocuments({iscompleted:false}, (err, itemsleft)=>
            {
            if(err) throw err;
            db.close();
            return  res.render("todomongo",{result,itemsleft});
        })
    });

    })

});
app.get("/showactive", (req,res)=>
{
    MongoClient.connect(url,(err,db)=>
    {
        let dbase=db.db("todo");
        dbase.collection("tododata").countDocuments({iscompleted:false}, (err, itemsleft)=>
        {
            dbase.collection("tododata").find({iscompleted:false}).toArray((err,result) =>
            {
                if(err) throw err;
                db.close();
                console.log(result);
            return res.render('todomongo',{result,itemsleft})

            });
        });

    })
})
app.get("/showcomplete", (req,res)=>
{
    MongoClient.connect(url,(err,db)=>
    {
        let dbase=db.db("todo");
        dbase.collection("tododata").countDocuments({iscompleted:false}, (err, itemsleft)=>
        {
            dbase.collection("tododata").find({iscompleted:true}).toArray((err,result) =>
            {
                if(err) throw err;
                db.close();
            return res.render('todomongo',{result,itemsleft})

            });
        });

    })
})
app.get("/clearcompleted", (req,res)=>
{
    MongoClient.connect(url,(err,db)=>
    {
        let dbase=db.db("todo");

            dbase.collection("tododata").deleteMany({iscompleted:true},(err,result)=>
            {
                dbase.collection("tododata").countDocuments({iscompleted:false}, (err, itemsleft)=>
                {
                if(err) throw err;
                return res.render('todomongo',{result,itemsleft})
            })
            
        });

    })
})
app.post("/updatetext/:id", (req, res)=>
{
    let id= new mongo.ObjectId(req.params.id);
    let name=req.body.name;
    console.log("idhi ikkada");
    MongoClient.connect(url, (err, db)=>
    {
         if(err) throw err
       let dbase=db.db('todo');
       console.log("ikkada");
       dbase.collection("tododata").findOneAndUpdate({_id:id,},{ $set:{text:name}},(err, userdata) =>{
        if(err) throw err;
        dbase.collection("tododata").countDocuments({iscompleted:false}, (err, itemsleft)=>
        {
            if(err)throw err
            dbase.collection("tododata").find({}).toArray((err, result) =>
            {
                if(err) throw err;
                // console.log(result);
                db.close();
            return  res.render("todomongo",{result,itemsleft});
            });
        });
    });

    })
})
app.listen(4567, ()=>
{
    console.log("server is listening at 4567");
})