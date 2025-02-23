const express = require('express');
const router = express.Router();
const {
    uploadFeature,
    getAllFeatures,
    getFeatureById,
} = require('../Controllers/features');

// Route for uploading a feature
router.post('/upload', uploadFeature);

// Route for fetching all features
router.get('/get-all', getAllFeatures);

// Route for fetching a feature by ID
router.get('/:id', getFeatureById);

module.exports = router;
