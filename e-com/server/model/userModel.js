const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/e-com");


const userSchema = new mongoose.Schema(
    {
        username: String,
        email:
        {
            type: String,
            unique: true
        },
        password: String,
        cart: [
            {
                productDetails:
                {
                    type: mongoose.Schema.Types.ObjectId, ref: "products",
                },
                count: Number,
                isOrdered: {
                    type: Boolean,
                    default: false
                },
            },
            

        ]
        // orders: [
        //     {
        //         orderDetails:
        //         {
        //             type: mongoose.Schema.Types.ObjectId, ref: "products",
        //         },
        //         count: Number
        //     }
        // ]
    },
    {
        versionKey: false,
    },
    {strict:false}
)

module.exports = mongoose.model("users", userSchema);