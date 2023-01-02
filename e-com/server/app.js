const express= require("express");
const mongoose=require("mongoose");
const app= express();
const bodyParser=require("body-parser");
const productSchema= require("./model/productModel")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./routes/routes");

mongoose.connect(
    "mongodb://127.0.0.1:27017/e-com",
    {useNewUrlParser:true,useUnifiedTopology: true});

app.use("/", router);

app.listen("3456",()=>
{
    console.log("Server is Running at 3456");
})



// async function fetchAll() {
//      let res1 = await fetch("https://fakestoreapi.com/products/");
//     let products = await res1.json();
//     console.log(products)
//     for(i=0; i<products.length; i++)
//      { 
        
//         var saveProducts=  new productSchema (
//             {
//             id:products[i].id,
//             title:products[i].title,
//             price:products[i].price,
//             description:products[i].description,
//             category:products[i].category,
//             image:products[i].image,
//             rating:
//             {
//                 rate:products[i].rating.rate,
//                 count:products[i].rating.count,
//             }
//         }
//         );
//          const result =await saveProducts.save();
         
//      }   
// }
// fetchAll();