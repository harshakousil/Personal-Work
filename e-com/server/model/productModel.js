const mongoose=require("mongoose");

// mongoose.connect("mongodb://localhost:27017/e-com");

const productSchema= new mongoose.Schema(
    {
        id:Number,
        title:String,
        price:Number,
        description:String,
        category:String,
        image:String,
        rating:
        {
            rate:Number,
            count:Number
        }
    },
    {
        versionKey:false
    }
)

module.exports= mongoose.model("products", productSchema);