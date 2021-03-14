const mongoose = require('mongoose');
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req, res, next) => {
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "Chatroom name can only containa alphabet characters";

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) throw "Chatroom with that name already exists";

    const chatroom = new Chatroom({
        name,
    });

    await chatroom.save();

    res.json({
        message: "Chatroom created"
    })
}