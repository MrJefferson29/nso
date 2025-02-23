const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Feature = require('../Models/features'); // Assuming you have a Feature model

// Configure Cloudinary with your cloud name, API key, and API secret
cloudinary.config({
    cloud_name: 'da57ehczx',
    api_key: '642315663936742',
    api_secret: 'NSx2EUMJ7yj_3cvALZvsRajGsNs',
});

// Set up multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Specify the folder in Cloudinary
        allowed_formats: ['mp4', 'mkv', 'avi'], // Allowed video formats
    },
});

// Create the multer instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    },
});

// Upload feature controller
const uploadFeature = async (req, res) => {
    upload.single('video')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { title, notes, category } = req.body;

            const newFeature = new Feature({
                title,
                notes,
                category,
                video: req.file ? [req.file.path] : [], // Save video URL in the array
            });

            await newFeature.save();
            res.status(201).json({ message: 'Feature uploaded successfully', feature: newFeature });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading feature', error });
        }
    });
};

// Get all features controller
const getAllFeatures = async (req, res) => {
    try {
        const features = await Feature.find(); // Assuming a `Feature` model is defined
        res.status(200).json(features);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching features', error });
    }
};

// Get feature by ID controller
const getFeatureById = async (req, res) => {
    const { id } = req.params;
    try {
        const feature = await Feature.findById(id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json(feature);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feature', error });
    }
};

module.exports = {
    uploadFeature,
    getAllFeatures,
    getFeatureById,
};
