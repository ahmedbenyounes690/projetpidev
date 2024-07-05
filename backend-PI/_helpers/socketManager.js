import { addMessage } from '../controllers/chat.controller.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

const { secret } = config;

export function handleSocketEvents(io) {
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, secret);
            const user = await User.findById(decoded.id);
            if (!user) {
                return next(new Error('User not found'));
            }

            socket.user = user;
            next();
        } catch (err) {
            return next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.user.firstName);

        socket.on('joinRoom', ({ claimID }) => {
            socket.join(claimID);
            console.log(`User ${socket.user.firstName} joined room: ${claimID}`);
        });

        socket.on('send message', async ({ claimID, receiverID, message }) => {
            if (socket.user) {
                const messageData = {
                    senderID: socket.user._id,
                    receiverID,
                    claimID,
                    senderName: socket.user.firstName,
                    message
                };
                // Save the message in DB
                addMessage({ body: messageData, user: socket.user }, null);
                // Emit message to room
                io.to(claimID).emit('receive message', messageData);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}