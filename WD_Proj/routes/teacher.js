const admin = require("../models/admin");
const teacher = require("../models/teacher");
const slot = require("../models/slot");

var express = require("express");
var router = express.Router();



router.use(async (req, res, next) => {
    if(!req.user.role == "teacher") return res.json({ msg: "NOT TEACHER" })
    else next()
})



router.post("/createSlot", async (req, res) => {
    try{
        const {sectionId} = req.body 
        let sv = await slot.findOne({sectionId})
        let user = await teacher.findOne({email: req.user.email})
        if(sv) return res.json({msg: "Slot already exists"})
        //console.log("Teacher ID:", user);
        await slot.create({...req.body, teacher: user._id})

        return res.json({msg: "SLOT CREATED"})
    }catch(error){
        console.error(error)
    }
});

module.exports = router;



