//Dhruvi
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const libraryuser = require('../models/libraryuser');

router.post("login", async (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    try {
        const Data = await libraryuser.findOne({ Email: Email });

        console.log(Data)
        const id = Data._id;
        const EncryptedPassword = Data.Password;

        console.log(Data);
        bcrypt.compare(Password, EncryptedPassword)
            .then(isMatch => {
                if (isMatch) {
                    req.session.authenticated = true;
                    req.session.user = {
                        Email, Password, id
                    };
                    const sessionUser = req.session;
                    res.status(200).json({
                        message: "valid!!",
                        success: true,
                        Email,
                        Password,
                        id,
                        sessionUser

                    })

                } else {
                    res.status(400).json({
                        passwordIncorrect: "Password is incorrect",
                        success: false
                    });
                }
            })
    } catch (err) {
        res.status(404).json({
            emailNotFound: "Email is not found",
            success: false
        })
    }

});

router.get('/getDetails/:id', async (req, res) => {
    try {
        const result = await libraryuser.findById(req.params.id)
        console.log(result)
        res.status(200).json({
            success: true,
            result: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})



module.exports = router



