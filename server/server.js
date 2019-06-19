const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
let users = [];
let socketIds = [];
let connections = [];

server.listen(process.env.PORT || 3001);
console.log('Server running...');

io.sockets.on('connection', (socket) =>{
    connections.push(socket);
    console.log(`Number of sockets connected: ${connections.length}`);
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.playerName), 1);
        socketIds.splice(socketIds.indexOf(socket.id), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Number of sockets connected: ${connections.length}`);
        console.log(users);
        console.log(socketIds);
    });
    socket.on('new user', (data) => {
        socket.playerName = data;
        users.push(socket.playerName);
        socketIds.push(socket.id);
        updateUserNames();
    });
    const updateUserNames = () => {
        io.sockets.emit('get users', {onlinePlayers: users, socketIds: socketIds});
    };
    socket.on('challenge', (opponentId) => {
        io.to(opponentId).emit('get challenge', {opponentId:socket.id, opponentName: socket.playerName});
    });
    socket.on('decline challenge', (opponentId) => {
        io.to(opponentId).emit('challenge declined');
    });
    socket.on('challenge accepted', (opponentId) => {
        io.to(opponentId).emit('accepted', {opponentId:socket.id, opponentName: socket.playerName});
    });
    socket.on('send game state', (data) => {
        io.to(data.opponentId).emit('get game state', {playerGameState: data.opponentGameState, hitLog: data.hitLog, playerFleetStatus: data.opponentFleetStatus});
    });
    socket.on('send initial game state', (data) => {
        io.to(data.opponentId).emit('get initial game state', {opponentGameState: data.playerGameState, opponentFleetStatus: data.playerFleetStatus});
    });
    socket.on('send message', (data) => {
        io.to(data.opponentId).emit('get message', { newMessage: data.newMessage });
    })
});