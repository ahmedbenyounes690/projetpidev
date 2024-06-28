import Chat from '../models/chat.model.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// add Message to chat
export function addMessage(req, res) {
    const senderID = new ObjectId(req.body.userId);
    console.log("waaw")
    console.log(senderID)
    const messageData = {
        senderID: senderID,
        receiverID: req.body.receiverID,
        claimID: req.body.claimID, // send claimID in the request
        message: req.body.message
    };
    console.log("test")
    Chat.create(messageData).then(newMsg => {
        if (res) {
            res.status(201).json(newMsg);
        }
    })
        .catch(err => {
            if (res) {
                res.status(500).json(err);
            }
        });
}

// get messages for a specific claim between two users
export function getMessages(req, res) {
    const { claimID } = req.params;
    const userID = req.user.id;

    Chat.find({ claimID, $or: [{ senderID: userID }, { receiverID: userID }] })
        .sort({ timestamp: 1 })
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}