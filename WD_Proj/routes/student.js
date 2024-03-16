const student = require('../models/student');
const application = require('../models/application');
const slot = require('../models/slot');
const course = require('../models/course');
const teacherCourse = require('../models/teacherCourse');

var express = require('express');
const teacher = require('../models/teacher');
var router = express.Router();

router.use(async (req, res, next) => {
    if(req.user.role == "teacher") return res.json({ msg: "TEACHER NOT AUTHORIZED" })
    else next()
})


router.get('/viewMyApplications', async (req, res) => {
    try {
        let user = await student.findOne({ email: req.user.email });
        let sv = await application.find({student: user._id }).populate('slot');
        if (!sv || sv.length === 0) return res.json({ msg: 'No applications found ' });
        return res.json({ sv });
    } catch (error) {
        console.error(error);
    }
});

router.get('/viewAllslots', async (req, res) => {
    try {
        let sv = await slot.find({}).populate('teacher');     
    
        if (!sv) return res.json({ msg: 'No slots found' });
        return res.json({ sv });
    } catch (error) {
        console.error(error);
    }
});

router.post('/getAllSlotbyteacherId', async (req, res) => {
    try {
        const { teacherId } = req.body;
        let tv = await teacher.find({ teacherId: teacherId });
        let sv = await slot.find({ teacher: tv._id });
        if (!sv) return res.json({ msg:'The teacher has not opened any slots'});
        return res.json({ sv });
    } catch (error) {
        console.error(error);
    }
});
 
router.post('/getAllSlotsbyCourseId', async (req, res) => {
    try {
        const { courseId } = req.body;
        let cv = await course.find({ courseId: courseId });
        let sv = await slot.find({ course: cv._id });
        if (!sv) return res.json({ msg: 'No slots found for this course' });
        return res.json({ sv });
    } catch (error) {
        console.error(error);
    }
});

router.post('/getTeacherInfo', async (req, res) => {
    try {
        const { teacherId } = req.body;
        let tv = await teacher.findOne({ teacherId: teacherId }).select('email firstName lastName department coursesTeaching');
        if (!tv) return res.json({ msg: 'Teacher not found' });
        return res.json({ tv });
    } catch (error) {
        console.error(error);
    }
});


router.post('/applyforSlot', async (req, res) => {
    try {
        const { sectionId } = req.body;
        let user = await student.findOne({ email: req.user.email });
        let sv = await slot.findOne({ sectionId });
        if (!sv) return res.json({ msg: 'Slot not open for this Section' });
        let app1 = await application.findOne({ slot: sv._id, student: user._id }).populate('slot');
    
        if (app1) return res.json({ msg: 'Application already exists' });    
        await application.create({ student: user._id, slot:sv._id });
        return res.json({ msg: 'APPLICATION CREATED' });
    } catch (error) {
        console.error(error);
    }
});

router.post('/deleteApplication', async (req, res) => {
    try {
        const { sectionId } = req.body;
        let user = await student.findOne({ email: req.user.email });
        let sv = await slot.findOne({ sectionId });
        if (!sv) return res.json({ msg: 'Slot not open for this Section' });
        let app = await application.findOne({ slot: sv._id, student: user._id });
        
        if(!app) return res.json({ msg: 'Application not found' });
        
        await application.deleteOne({ slot: sv._id, student: user._id});
        return res.json({ msg: 'Application deleted successfully' });
    } catch (error) {
        console.error(error);
    }
});




module.exports = router;



