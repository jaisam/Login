const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user);
            if (user.length > 0) {
                // If user already exists, dont allow to create account with this email
                return res.status(409).json({ msg: `User with ${req.body.email} already exists` });
            }
            else {
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).json({ msg: error.msg });
                    } else {
                        // Gneerating hash for password
                        const newUser = new User({
                            firstName : req.body.firstName,
                            lastName : req.body.lastName,
                            company : req.body.company,
                            email: req.body.email,
                            password: hash
                        });
                        // creating new User
                        newUser.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({ msg: 'User created successfully' });
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(400).json({ msg: error.msg });
                            });
                    }
                })
            }
        })
});




router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length <= 0) {
                console.log('Email not found');
                return res.status(401).json({ msg: "Incorrect Email or Password" });
            }
            else {
                console.log(user);
                bcrypt.compare(req.body.password, user[0].password, (error, result) => { // user[0].password because array of 1 element is returned 
                    if (error) {
                        console.log(error);
                        console.log('Bcrypt was unable to compare passworrds');
                        return res.status(401).json({ msg: "Incorrect Email or Password" });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.json({
                            msg: "Authentication successful",
                            token: token
                        });
                    } else {
                        console.log('Password does not match');
                        return res.status(401).json({ msg: "Incorrect Email or Password" });
                    }
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({ msg: error.msg });
        });

});


module.exports = router;