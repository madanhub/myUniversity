// Sri Sai Bhargav Nuthakki
const express = require('express')
const mongoose = require('mongoose')
const router1 = express.Router();
const userInformation = require('../models/userInformation');
const session = require('express-session');
const bcrypt = require('bcryptjs');


router1.post('/add', async (req, res) => {

    try {
        const { FirstName,
            LastName,
            Password,
            ConfirmPassword,
            Email,
            Role,
            SecurityAnswer,
            PhoneNumber } = req.body
        if (!FirstName || !Password || !ConfirmPassword || !Email || !SecurityAnswer || !PhoneNumber || !Role) {
            return res.status(400).json({
                message: "Missing body params or check the params keys",
                success: false
            })
        }

        const newUserInformation = new userInformation({
            FirstName,
            LastName,
            Password,
            ConfirmPassword,
            Email,
            Role,
            SecurityAnswer,
            PhoneNumber
        })


        try {
            userInformation.findOne({
                Email: Email
            }).then(userInformation => {
                if (userInformation) {
                    res.status(400).json({
                        message: "Email already exists"
                    });
                }
                else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.Password, salt, (err, hash) => {
                            if (err) throw err;
                            console.log(hash)
                            newUserInformation.Password = hash;
                            const result = newUserInformation.save()
                            res.status(200).json({
                                message: "New User Added!!",
                                success: true,
                                result
                            })

                        })
                    })

                }
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






router1.post('/login', async (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    try {
        const userData = await userInformation.findOne({ Email: Email });

        console.log(userData)
        const Role = userData.Role;
        const id = userData._id;
        const EncryptedPassword = userData.Password;

        console.log(userData);
        bcrypt.compare(Password, EncryptedPassword)
            .then(isMatch => {
                if (isMatch) {
                    req.session.authenticated = true;
                    req.session.user = {
                        Email, Password, Role, id
                    };
                    const sessionUser = req.session;
                    res.status(200).json({
                        message: "User valid!!",
                        success: true,
                        Role,
                        Email,
                        Password,
                        id,
                        sessionUser

                    })

                } else {
                    res.status(400).json({
                        passwordIncorrect: "Password incorrect",
                        success: false
                    });
                }
            })
    } catch (err) {
        res.status(404).json({
            emailNotFound: "Email is not registered",
            success: false
        })
    }

});


router1.get('/all', async (req, res) => {
    try {
        const result = await userInformation.find()
        if (!result.length) {
            res.status(404).json({
                success: false,
                message: "No user found!"
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

router1.post('/forgetPassword', async (req, res) => {

    const Email = req.body.Email;
    const SecurityAnswer = req.body.SecurityAnswer;

    await userInformation.findOne({
        Email: Email
    }).then(userInformation => {
        if (!userInformation) {
            return res.status(404).json({
                emailNotFound: "Email is not registered",
                success: false
            });
        }
        else {
            if (SecurityAnswer == userInformation.SecurityAnswer) {
                res.status(200).json({
                    message: "User valid!!",
                    success: true
                })

            } else {
                return res.status(400).json({
                    passwordIncorrect: "Password incorrect",
                    success: false
                });

            }
        }
    });
});

router1.put('/updatePassword', async (req, res) => {
    const userEmail = req.body.Email;
    const userPassword = req.body.Password;
    // const EncryptedPassword ;



    try {


        const data = await userInformation.updateOne(
            { Email: req.body.Email },
            { $set: { Password: req.body.Password } })
        res.status(200).json({
            message: "Password Updated!",
            success: true,
            data

        })




    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

router1.get('/getUserDetails/:id', async (req, res) => {
    try {
        const result = await userInformation.findById(req.params.id)
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



router1.put('/updateProfile/:id', async (req, res) => {
    const { FirstName, LastName, Password, Email, PhoneNumber } = req.body
    try {
        const userProfileUpdate = await userInformation.updateOne(
            { _id: req.params.id },
            { $set: { FirstName, LastName, Email, PhoneNumber } })
        res.status(200).json({
            message: "Details updated!",
            success: true,
            userProfileUpdate
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

module.exports = router1