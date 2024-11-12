const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');

const app = express();

app.use(
    cors({
        origin: process.env.FRONTED_URL, // Ensure this URL is correct
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    })
);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: 'Server running at ' + PORT
    });
});

app.use('/api', router); // Ensure this path is correct

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server running at http://localhost:' + PORT);
    });
});
