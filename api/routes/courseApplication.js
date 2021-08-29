/*Author - Sowmya Busanagari*/
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const courseApplication = require('../models/courseApplication')
const course = require('../models/course')
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './images/')
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/apply/:id', async (req, res) => {
    try {
        const { studentEmail, applied } = req.body
        const courseId = req.params.id
        const courseApp = await course.findById(req.params.id)
        const courseName = courseApp.name
        const courseInstructor = courseApp.instructor
        const courseRate = courseApp.courseRate
        const courseImage = courseApp.courseImage
        console.log(courseImage)
        if (!studentEmail) {
            return res.status(400).json({
                message: "Missing body params or check the params keys",
                success: false
            })
        }

        const newApplication = new courseApplication({
            studentEmail,
            courseId,
            courseName,
            courseInstructor,
            courseRate,
            courseImage,
            applied: true
        })

        try {
            const result = await newApplication.save()
            res.status(200).json({
                message: "CourseApplication created",
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

router.get('/appliedCourses', async (req, res) => {
    try {
        const result = await courseApplication.find()
        if (!result.length) {
            res.status(404).json({
                success: false,
                message: "No course found!"
            })
        }
        res.status(200).json({
            success: true,
            course: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router.get('/existedCourse', async (req, res) => {
    try {
        const courseId = req.query.courseId
        const studentEmail = req.query.studentEmail
        console.log(courseId)
        console.log(studentEmail)
        const result = await courseApplication.findOne({ courseId: courseId, studentEmail: studentEmail })

        const applied = result.applied
        res.status(200).json({
            success: true,
            course: result,
            applied: applied
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router.get('/appliedCourses/:id', async (req, res) => {
    try {
        const result = await courseApplication.find()
        const studentEmail = result.studentEmail
        res.status(200).json({
            success: true,
            course: result,
            studentEmail: studentEmail
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router.delete('/deleteCourse/:id', async (req, res) => {
    try {
        const result = await courseApplication.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Course deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router.put('/applied/:id', async (req, res) => {
    try {
        const appliedCourse = await courseApplication.updateOne(
            { _id: req.params.id },
            { $set: { rated: true } })
        res.status(200).json({
            message: "Course Applied!",
            success: true,
            rateCourse
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