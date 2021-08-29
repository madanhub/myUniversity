/* Author - Akash Madan */

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const residence = require('../models/withdrawResidence');

try {
    router.get("/:id", (req, res) => {

        try {
            residence.find({ withdrawStudentID: req.params.id }).then(result => {
                if (result.length == 0) {
                    return res.status(200).json({
                        message: "No user found",
                        success: false
                    })
                }
                return res.status(200).json({
                    message: "You have already applied for the residence.",
                    residence: result,
                    success: true
                })
            })
        }
        catch (err) {
            return res.status(500).json({
                message: "Something went wrong while getting user",
                errorMessage: err,
                success: false
            })
        }
    })
}
catch (err) {
    return res.status(500).json({
        message: "Internal server error while getting user",
        errorMessage: err,
        success: false
    })
}

module.exports = router;