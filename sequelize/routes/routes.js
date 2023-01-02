const express =require ('express');
const router=express.Router();
const db= require("../config/db.config")
const model= require("../model/index")

router.get("/", (req,res)=>
{
    res.send("Vachav"); 
    // model.findAll()
    // .then(userdata =>
    //     {
    //         console.log(userdata);
    //         res.send("hi");
    //         res.end();
    //     })
    // .catch(err=> 
    //     {
    //         console.log(err)
    //     })
})
// adding a userdata
router.get("/add", (req, res)=>
{
    const data=
    {
        "name":"kousil",
    }
    let name=data
    model.create(
        {
            name:name
        })
        .then(userdata =>
            {
                res.redirect("/index")
            })
        .catch(err =>console.log(err))
}
)


module.exports=router