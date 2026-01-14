const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { sender, email, whatsapp, subject, messages } = req.body;

    try {
        await Message.insertOne({
            sender: sender,
            email: email,
            whatsapp: whatsapp,
            subject: subject,
            messages: messages
        })

        res.status(200).json({ message: 'Complete' })
    } catch (err) {
        console.log(`error: ${err.message}`);
        res.status(500).json({ message: err.message })
    }
}