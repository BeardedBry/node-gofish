var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/gofish-web/dist/index.html');
});

// Game Namespace
const cardgame = io.of('/cardgame');
