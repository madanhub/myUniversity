/*Author - Sowmya Busanagari*/
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const courseApplication = require('../models/courseApplication')
const course = require('../models/course')
const userInformation = require('../models/userInformation')
const grade = require('../models/grade')
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './images/')
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/add/:id', async (req, res) => {
    try {
        const courseId = req.params.id
        const courseApp = await course.findById(req.params.id)
        console.log(courseApp)
        const courseName = courseApp.name;
        const { studentName, studentEmail } = req.body;
        const gradeMark = "Not Graded";
        console.log(req.body)
        if (!courseId) {
            return res.status(400).json({
                message: "Missing body params or check the params keys",
                success: false
            })
        }

        const newGrade = new grade({
            studentEmail,
            courseId,
            courseName,
            studentName,
            gradeMark
        })

        try {
            const result = await newGrade.save()
            res.status(200).json({
                message: "Grade created",
                result,
                success: true
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                message: "Something went wrong!",
                success: false
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
})

router.get('/all/:id', async (req, res) => {
    try {
        const result = await grade.find()

        res.status(200).json({
            success: true,
            grade: result

        })

        console.log(result)

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await grade.findById(req.params.id)
        console.log(result)
        res.status(200).json({
            success: true,
            grade: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})



router.put('/marking/:id', async (req, res) => {
    const { gradeMark, feedback } = req.body
    try {
        const marking = await grade.updateOne(
            { _id: req.params.id },
            { $set: { gradeMark, feedback } })
        res.status(200).json({
            message: "Grade Updated!",
            success: true,
            marking
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }


})

module.exports = router







































