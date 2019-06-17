const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
let users = [];
let connections = [];
let playerId = 0;

server.listen(process.env.PORT || 3001);
console.log('Server running...');

io.sockets.on('connection', (socket) =>{
    connections.push(socket);
    console.log(`Number of sockets connected: ${connections.length}`);
    socket.playerId = playerId++;

    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.playerName), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Number of sockets connected: ${connections.length}`);
    });
    socket.on('new user', (data) => {
        socket.playerName = data;
        socket.emit('get id', socket.playerId);
        users.push(socket.playerName);
        updateUserNames();
    });

    const updateUserNames = () => {
        io.sockets.emit('get users', users);
    }
});