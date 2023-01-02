
const { equal } = require("assert");
const { getToken, verifyToken } = require("../jwt.js");
const ordersModel = require("../model/ordersModel.js");

const productSchema = require("../model/productModel.js");
const userModel = require("../model/userModel.js");


//function to get all the prodcts from database and return the productData
exports.getallProducts = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });

    var userId = req.params.userId;
try{
    var userData = await userModel.findById(userId);
}catch(err)
{
 return res.json({msg:"error"})
}
    let page = req.params.page;
    let userCartlength = userData.cart.length;
    let { filter, search, price } = req.body;
    let cartIcon = 0;
    for (let i = 0; i < userCartlength; i++) {
        if (userData.cart[i].isOrdered == false) {
            cartIcon = cartIcon + 1;
        }
    }
    let productData;
    if (filter || search || price) {
        productData = await productSchema.find({});
    }
    else {
        productData = await productSchema.find({}).skip(5 * page).limit(5).exec();

    }


    res.json({
        productData: productData,
        cartLength: cartIcon,
    });

}

//function to add an item to the cart withe the count of item
exports.addCart = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });

    let { userId, productId, value } = req.params;
try{
    var product = await productSchema.findById(productId)
    var userDet = await userModel.findById(userId);
}
catch(err)
{
   return res.json({msg:"error"})
}
    if (userDet.cart.length == 0) {
        let pushValue = { productDetails: product, count: value, isOrdered: false }
        try{
        await userModel.findByIdAndUpdate(userId, { $push: { 'cart': pushValue } }, { new: true })
        const user = await userModel.findById(userId).populate('cart');
        return res.status(200).json({ msg: "Added" });
        }
        catch(err)
        {
            return res.json({msg:"error"})
        }
    }
    else { 
        for (i = 0; i <userDet.cart.length; i++) {
            if (userDet.cart[i].isOrdered == false) {
                if (userDet.cart[i].productDetails.equals(product._id)) {
                    let updatedValue = parseInt(userDet.cart[i].count) + parseInt(value);
                    try{
                        await userModel.findOneAndUpdate(
                        {
                            _id: userId, "cart.productDetails": userDet.cart[i].productDetails
                        },
                        {
                            $set: {
                                "cart.$.count": updatedValue,
                            }
                        },
                    )
                        const user = await userModel.findById(userId).populate('cart');
                        let cart = user.cart;
                        let products = [];
                        for (let i = 0; i < cart.length; i++) {
                            if (cart.isOrdered == false) {
                                products.push(await productSchema.findById(cart[i]));
                            
                            }
                        }
                    return res.status(200).json({ msg: "Added" });
                    }
                    catch(err)
                    {
                        return res.json({msg:"error"})
                    }
                   
                }
            }

        }
        let pushValue = { productDetails: product, count: value, isOrdered: false }
        try{
            await userModel.findByIdAndUpdate(userId, { $push: { 'cart': pushValue } }, { new: true })
        
        
            var user = await userModel.findById(userId).populate('cart');
        }
        catch(err){
            return res.json({msg:"error"})
        }
            const cart = user.cart;
            let products = [];
            for (let i = 0; i < cart.length; i++) {
            try{
                products.push(await productSchema.findById(cart[i]));
            }
            catch(err)
            {
                return res.json({msg:"error"})
            }
            }
    }
    return res.status(200).json({ msg: "Added" });
}

//function to get the items that are stored in cart array in userschema

exports.getCart = async (req, res) => {
    const token = getToken(req);

    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });

    const { userId } = req.params;

    try{
        var user = await userModel.findById(userId)
    }
    catch(err)
    {
        return res.json({msg:"error"})
    }
    let userCartlength = user.cart.length;
    let cartIcon = 0;
    for (let i = 0; i < userCartlength; i++) {
        if (user.cart[i].isOrdered == false) {
            cartIcon = cartIcon + 1;
        }
    }

try{
    await user.populate('cart.productDetails');
    var cart = await user['cart'];
}
catch(err)

{
return res.json({msg:"error"});
}
    let rem_cart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].isOrdered == false) {
            rem_cart.push(cart[i]);
        }
    }
    return res.json({ cart: rem_cart, cartLength: cartIcon })

}


// function to get one particular product details to display it when user clicked on one product

exports.getOneProduct = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });

    let userId = req.params.userId;
    //console.log(userId);
    try{
    var user = await userModel.findById(userId);
    var product = await productSchema.findById(req.params.id);
    let userCartlength = user.cart.length;
    var cartIcon = 0;
    for (let i = 0; i < userCartlength; i++) {
        if (user.cart[i].isOrdered == false) {
            cartIcon = cartIcon + 1;
        }
    }
    }catch(err)
    {
        return res.json({msg:"error"});
    }
    
    return res.json({ product: product, cartLength: cartIcon });

}

//function to update the cartItem dta when user is ready to checkout 
exports.editcart = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });
    const userId = req.params.userId;
    let arr = req.body.cartArr;
    count_res = arr.filter((_, i) => (i % 2));
    pId_res = arr.filter((_, i) => !(i % 2));
    let userDet = await userModel.findById(userId);
    for (let i = 0; i < userDet.cart.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (userDet.cart[i].productDetails.equals(arr[j])) {
                let updatedVlaue = count_res[i];
                await userModel.updateOne(
                    {
                        _id: userId,
                        "cart.productDetails": userDet.cart[i].productDetails,
                        "cart.$.isOrdered": false
                    },
                    {
                        $set: {
                            "cart.$.count": updatedVlaue,

                        }
                    }
                )
            }
        }
    }
    try {
        const user = await userModel.findById(userId);
    }
    catch (error) {
        return res.status(404).json({ msg: "Failed" });
    }

    return res.status(200).json({ msg: "Added" });
}
// function to delete Item that is added to cart by using product Id.

exports.deleteOneItem = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });
    const prodcutId = req.params.productId;
    const userId = req.params.userId;
 try{
    var user = await userModel.findById(userId);
 }
 catch(err)
 
 {
    return res.json({msg:"error"});
 }
    let userCart = user.cart
    let filteredCart = userCart.filter((item) => {

        if (item.productDetails != prodcutId && item.isOrdered == false) {
            return item
        }
    })
    try {
        const response = await userModel.findByIdAndUpdate(userId, { cart: filteredCart }, { new: true });
        res.json({
            msg: "success"
        })
    }
    catch (err) {

        res.json({
            msg: "failed"
        })
    }

}

// pushing all the items in the cart to orders array when place an order is clicked.
exports.placeOrder = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });
    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });
    const userId = req.params.userId;
    const total = req.body.total;
    try{
    var user = await userModel.findById(userId);
    }
    catch(err)
    {
        return res.json({msg:"error"})
    }
    let userCart = user.cart
    userCart = userCart.filter((cart) => {
        return cart.isOrdered == false
    });

    console.log(userCart);
    const order = new ordersModel({
        products: userCart,
        total: total,
        userId: userId
    })
    try{
    await order.save();
    for (let i = 0; i < userCart.length; i++) {
        await userModel.updateOne(

            {
                _id: userId, "cart.isOrdered": false
            },
            {
                $set: {
                    "cart.$.isOrdered": true
                }
            }

        )
    }
}
catch(err)
{
    return res.json({msg:"error"})
}
    res.json({
        msg: "success"
    })
}

// profile page of an user when a user clicks on his profile.
exports.profile = async (req, res) => {
    const token = getToken(req);
    if (token === null) return res.status(403).json({ msg: "No token available" });

    const isValid = verifyToken(token);
    if (!isValid) return res.status(403).json({ msg: "token is invalid" });
    const userId = req.params.userId;
    try{
    const user = await userModel.findById(userId);
    var orders = await ordersModel.find({ userId: userId });
    let userCartlength = user.cart.length;
    var cartIcon = 0;
    for (let i = 0; i < userCartlength; i++) {
        if (user.cart[i].isOrdered == false) {
            cartIcon = cartIcon + 1;
        }
    }

    for (let i = 0; i < orders.length; i++) {
        await orders[i].populate('products.productDetails');
    }
}catch(err)
{
    return res.json({msg:"error"});
}

    return res.json({ orders: orders, cartLength: cartIcon })
}