// Zongyu wu
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const router = express.Router()
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


router.post('/add', upload.single('courseImage'), async (req, res) => {
    try {
        const { name, discription, instructor, term, rated } = req.body
        if (!name || !discription || !instructor || !term) {
            return res.status(400).json({
                message: "Missing body params or check the params keys",
                success: false
            })
        }

        const newCourse = new course({
            name,
            discription,
            instructor,
            term,
            rated: false,
            courseImage: req.file.path
        })

        try {
            const result = await newCourse.save()
            res.status(200).json({
                message: "Course created",
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

router.get('/all', async (req, res) => {
    try {
        const result = await course.find()
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

router.get('/:id', async (req, res) => {
    try {
        const result = await course.findById(req.params.id)
        res.status(200).json({
            success: true,
            course: result,
            courseName: result.courseName
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router.put('/rate/:id', async (req, res) => {
    const { instructorRate, courseRate, comment } = req.body
    try {
        const rateCourse = await course.updateOne(
            { _id: req.params.id },
            { $set: { instructorRate, courseRate, comment, rated: true } })
        res.status(200).json({
            message: "Rating updated!",
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