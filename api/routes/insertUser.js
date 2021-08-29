/* Author - Akash Madan */

const express = require('express');
const mongoose = require('mongoose')

const router = express.Router();

const residence = require('../models/residence');

router.post("", (req, res) => {

    try {
        const { studentID, name, number, gender, emailID, location, bedroomType, meal, term } = req.body
        if (!studentID || !name || !number || !gender || !emailID || !location || !bedroomType || !meal || !term) {
            return res.status(400).json({
                message: "Missing body params or check the params keys",
                success: false
            })
        }

        const newResidenceApplication = new residence({
            studentID,
            name,
            number,
            gender,
            emailID,
            location,
            bedroomType,
            meal,
            term
        })

        try {
            newResidenceApplication.save().then(result => {
                return res.status(200).json({
                    message: "Residence application submitted",
                    success: true
                })
            })
        } catch (err) {
            return res.status(500).json({
                message: "Something went wrong",
                errorMessage: err,
                success: false
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            errorMessage: err,
            success: false
        })
    }

})


module.exports = router;