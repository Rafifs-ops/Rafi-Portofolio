const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    subject: { type: String, required: true },
    messages: { type: String, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);