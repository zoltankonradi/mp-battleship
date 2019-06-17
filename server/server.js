const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
let users = [];
let connections = [];

server.listen(process.env.PORT || 3001);
console.log('Server running...');

io.sockets.on('connection', (socket) =>{
    connections.push(socket);
    console.log(`Number of sockets connected: ${connections.length}`);

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Number of sockets connected: ${connections.length}`);
    });

    socket.on('gameState', (data) => {
        console.log(data);
    })
});