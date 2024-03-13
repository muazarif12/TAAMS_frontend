const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const student = require("../models/student");
const teacher = require("../models/teacher");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signUp", async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;
        let user;

        // Choose the appropriate model based on the role
        switch (role) {
            case "admin":
                user = await admin.findOne({ email });
                break;
            case "student":
                user = await student.findOne({ email });
                break;
            case "teacher":
                user = await teacher.findOne({ email });
                break;
            default:
                return res.status(400).json({ message: "Invalid role" });
        }

        if (user) return res.json({ msg: "User already exists" });

        switch (role) {
            case "admin":
                await admin.create({ ...req.body, password: await bcrypt.hash(password, 5) });
                break;
            case "student":
                await student.create({ ...req.body, password: await bcrypt.hash(password, 5) });
                break;
            case "teacher":
                await teacher.create({ ...req.body, password: await bcrypt.hash(password, 5) });
                break;
            default:
                return 0;
        }

        return res.json({ msg: "CREATED" });
    } catch (error) {
        console.error(error);
    }
});
 
router.post("/login", async (req, res) => {
    try {
        const {email, password, role} = req.body
        let user;
        switch (role) {
            case "admin":
                user = await admin.findOne({ email })
                break;
            case "student":
                user = await student.findOne({ email })
                break;
            case "teacher":
                user = await teacher.findOne({ email })
                break;
            default:
                return res.status(400).json({ message: "Invalid role" });

        }
        
        if (!user) return res.json({ msg: "User does not exist" });

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "Invalid credentials" });

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            role: user.role,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "Logged in",token
        })
    } catch (error) {
        console.error(error);
    }

});

module.exports = router;



