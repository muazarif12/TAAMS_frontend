const admin = require("../models/admin");
const teacher = require("../models/teacher");
const slot = require("../models/slot");
const course = require("../models/course");
const application = require("../models/application");
const student = require("../models/student");

var express = require("express");
var router = express.Router();


router.post("/getSlotbySectionId", async (req, res) => {
    try{
        const {sectionId} = req.body
        let sv = await slot.find({sectionId: sectionId}).populate(
            [{path:"teacher", select:'teacherID email firstName lastName'}, 
             {path:"course", select: 'courseId courseName'}]
            ).select('sectionId requirements duration workHours applicationDeadline createdAt')
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
        const {sectionId, courseID} = req.body 
        let sv = await slot.findOne({sectionId})
        if(sv) return res.json({msg: "Slot already exists"})

        let user = await teacher.findOne({email: req.user.email})
        if(!user) return res.json({msg: "Teacher not found"})
        
        let cv = await course.findOne({courseID: courseID})
        if(!cv) return res.json({msg: "Course not found"})
       
        await slot.create({...req.body, teacher: user._id, course: cv._id, teacherName: user.firstName + " " + user.lastName, teacherEmail: user.email})

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
        if (!sv) return res.json({ msg: "Slot not found " });
        await slot.deleteOne({ sectionId: sectionId, teacher: user._id}); // here the user._id is not necessary because the sectionId is unique
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
        await slot.updateOne({ sectionId: updatedsectionId, ...req.body});
        return res.json({ msg: "Slot updated successfully" });
    } catch (error) {
        console.error(error);
    }
})

router.post("/viewApplicationsbySectionId", async (req, res) => {
    try{
        const {sectionId} = req.body
        let user = await teacher.findOne({email: req.user.email})
        if (!user) {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        let sv = await slot.findOne({ teacher: user._id, sectionId: sectionId })
            .populate("applications")
        //console.log(sv);
        if (!sv || sv.length === 0) {
            return res.json({ msg: "No slots found" });
        }
        //console.log("yooo");
        if (sv.applications.length === 0) {
            return res.json({ msg: "No applications found" });
        }
        
        for (let application of sv.applications) {
            console.log(`Student Name: ${application.studentName}, Student Email: ${application.studentEmail}`);
        }

        const applicationDetails = sv.applications.map(application => ({
            studentName: application.studentName,
            studentEmail: application.studentEmail
        }));        
        
        if(!sv) return res.json({msg: "No applications found"})
        return res.json({ applications: applicationDetails });

    }catch(error){
        console.error(error)
    }
});

router.post("/viewStudentProfile", async (req, res) => {
    try {
        const { studentEmail } = req.body;
        let stv = await student.findOne({ email: studentEmail }).select('-_id email firstName lastName degreeProgram semester');
        if (!stv) return res.json({ msg: "Student not found" });
        return res.json({ stv });
    } catch (error) {
        console.error(error);
    }
});

router.patch("/acceptApplication/:sectionId/:studentEmail", async (req, res) => {
    try {
        const { sectionId, studentEmail } = req.params;
        let sv = await slot.findOne({ sectionId: sectionId }).populate("applications");
        if (!sv) return res.json({ msg: "Slot not found" });
        let application = sv.applications.find(application => application.studentEmail === studentEmail);
        if (!application) return res.json({ msg: "Application not found" });
        if (application.status === "accepted") return res.json({ msg: "Application already accepted" });
        await application.updateOne({ status: "accepted" });
        return res.json({ msg: "Application accepted" });
    } catch (error) {
        console.error(error);
    }
});

router.put("/rejectApplication/:sectionId/:studentEmail", async (req, res) => {
    try {
        const { sectionId, studentEmail } = req.params;
        let sv = await slot.findOne({ sectionId: sectionId }).populate("applications");
        if (!sv) return res.json({ msg: "Slot not found" });
        let application = sv.applications.find(application => application.studentEmail === studentEmail);
        if (!application) return res.json({ msg: "Application not found" });
        if (application.status === "accepted") return res.json({ msg: "Application already accepted" });
        await application.updateOne({ status: "rejected" });
        return res.json({ msg: "Application rejected" });
    } catch (error) {
        console.error(error);
    }
});

router.put("/makeFavourite/:sectionId/:studentEmail", async (req, res) => {
    try {
        const { sectionId, studentEmail } = req.params;
        let sv = await slot.findOne({ sectionId: sectionId }).populate("applications");
        if (!sv) return res.json({ msg: "Slot not found" });
        let application = sv.applications.find(application => application.studentEmail === studentEmail);
        if (!application) return res.json({ msg: "Application not found" });
        await application.updateOne({ favourite : true });
        return res.json({ msg: "Application marked favourite" });
    } catch (error) {
        console.error(error);
    }
});


    


 






module.exports = router;



