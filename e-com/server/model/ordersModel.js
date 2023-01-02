const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/e-com")


const ordersSchema = new mongoose.Schema(
    {

        products: [
            { productDetails: { type: mongoose.Schema.Types.ObjectId, ref: "products" }, count: Number }
        ],
        total: Number,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model("orders", ordersSchema);