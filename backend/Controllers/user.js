const express = require('express')
const mongoose = require('mongoose')
const User = require('../Models/user')
const asyncErrorWrapper = require('express-async-handler')

const profile = asyncErrorWrapper(async (req, res, next) => {

    return res.status(200).json({
        success: true,
        data: req.user
    })

});

const editProfile = asyncErrorWrapper(async (req, res, next) => {

    const {name, email, username, phone, orgemail, whatsapp, bio } = req.body

    const user = await User.findByIdAndUpdate(req.user.id, {
       name, email, username, phone, orgemail, whatsapp, bio,
        photo: req.savedUserPhoto
    },
        {
            new: true,
            runValidators: true
        })

    return res.status(200).json({
        success: true,
        data: user

    })

})

module.exports = {profile, editProfile}