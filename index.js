const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware to parse incoming JSON

app.use(express.json());
app.use(cors());

// const corsOptions = {
//     origin: 'https://techx-eight.vercel.app',
//     optionsSuccessStatus: 200
//   };
//   app.use(cors(corsOptions));

//   app.use(cors({ origin: '*' }));



// MongoDB connection string
const mongoURI = 'mongodb+srv://sudharsan6078:6IZ1JhrnEcwq9z8r@done.l9ghk.mongodb.net/'; // Change this to your MongoDB URI
mongoose.connect(mongoURI, {
    connectTimeoutMS: 50000,
    serverSelectionTimeoutMS: 50000,
})

// Define a simple router

// Define a User Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    dept : String,
    college : String,
});

const User = mongoose.model('User', UserSchema);

// API to create a new user
app.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API to get all users
app.get('/', async (req, res) => {
    // try {
    //     const users = await User.find();
    //     res.status(200).json(users);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
