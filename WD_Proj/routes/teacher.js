const admin = require("../models/admin");
const teacher = require("../models/teacher");
const slot = require("../models/slot");

var express = require("express");
var router = express.Router();


router.post("/getSlotsbySectionId", async (req, res) => {
    try{
        const {sectionId} = req.body
        let sv = await slot.find({sectionId: sectionId}).populate("teacher")
        if(!sv) return res.json({msg: "No slots found"})
        return res.json({sv})
    }catch(error){
        console.error(error)
    }
});


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

router.post("/deleteSlot", async (req, res) => {
    try {
        const { sectionId } = req.body;
        //console.log("User:", req.user);
        let user = await teacher.findOne({ email: req.user.email });
        let sv = await slot.findOne({ sectionId: sectionId, teacher: user._id});
        if (!sv) return res.json({ msg: "Slot not found or you are not authorized to delete it" });
        await slot.deleteOne({ sectionId: sectionId, teacher: user._id});
        return res.json({ msg: "Slot deleted successfully" });
    } catch (error) {
        console.error(error);
    }

})

router.post("/updateSlot", async (req, res) => {
    try {
        const { sectionId, updatedsectionId } = req.body;  // over here only section updated later when front end is ready we can add more fields
        let user = await teacher.findOne({ email: req.user.email });
        let sv = await slot.findOne({ sectionId: sectionId, teacher: user._id });
        if (!sv) return res.json({ msg: "Slot not found or you are not authorized to update it" });
        await slot.updateOne({ sectionId: updatedsectionId});
        return res.json({ msg: "Slot updated successfully" });
    } catch (error) {
        console.error(error);
    }
})




module.exports = router;



