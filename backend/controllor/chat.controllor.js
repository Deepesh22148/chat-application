import User from "../models/user.model.js";
import chat from "../models/chat.model.js";
import recent from "../models/recent.model.js";

export const updateChat = async (req, res) => {
    try {
        const { sender_id, receiver_id, message } = req.body;

        if (!sender_id || !receiver_id || !message) {
            return res.status(400).send({ success: false, message: "Missing fields." });
        }


        const response = await chat.create({
            sender: sender_id,
            receiver: receiver_id,
            message,
        });

        return res.status(201).send({ success: true, message: "Message sent.", data: response });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};

export const getChat = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.body;

        if (!sender_id || !receiver_id) {
            return res.status(400).send({ success: false, message: "Missing user IDs." });
        }

        const messages = await chat.find({
            $or: [
                { sender: sender_id, receiver: receiver_id },
                { sender: receiver_id, receiver: sender_id },
            ],
        }).sort({ createdAt: 1 });

        return res.status(200).send({ success: true, data: messages });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};
