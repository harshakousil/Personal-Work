var express = require("express");
// const productSchema= require("../model/productModel")

const router = express.Router();

const controllers = require("../controllers/controller.js");

const userDeatils = require("../controllers/regi.js");


router.post("/signup", userDeatils.addUser);

router.post("/login", userDeatils.getUser);

router.post('/getallproducts/:userId/:page', controllers.getallProducts);

router.put('/addcart/:userId/:productId/:value', controllers.addCart);

router.get('/getproduct/:id/:userId', controllers.getOneProduct);

router.post('/deleteCartItem/:userId/:productId', controllers.deleteOneItem);

router.get('/getcart/:userId', controllers.getCart);

router.put('/editcart/:userId', controllers.editcart);

router.post('/orders/:userId', controllers.placeOrder);

router.get('/profile/:userId', controllers.profile)


module.exports = router;