require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080; // Port untuk server

// --- Middleware ---
const corsOptions = {
    origin: ['http://localhost:5173', 'https://rafi-portfolio-15.netlify.app']
};
app.use(cors(corsOptions));
app.use(express.json()); // Mem-parsing body JSON

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const dataRoutes = require('./routes/data');
const messageRoutes = require('./routes/message');

// Use Routes
app.use('/api/data', dataRoutes);
app.use('/api/message', messageRoutes);

// --- Jalankan Server ---
app.listen(port, () => {
    console.log(`Rafi Portfolio Backend (Express.js) listening on http://localhost:${port}`);
});