const express = require('express');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const multer = require('multer');
const config = require('../config/firebase.config');

const router = express.Router();

initializeApp(config.firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('profile_pic'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `profile_pic/${req.file.originalname} ${dateTime}`);
        const metadata = { contentType: req.file.mimetype };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        res.send({
            message: 'File uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return `${date} ${time}`;
};

module.exports = router;
