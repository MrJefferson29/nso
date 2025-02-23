const express = require('express');
const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Provide a title'],
        trim: true
    },
    notes: {
        type: String,
        required: [true, 'Provide some notes'],
        trim: true
    },
    category: {
        type: String,
    },
    video: {
        type: [String], 
        default: []  // Ensures it defaults to an empty array if not provided
    }
}, {timestamps: true});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
