var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var { cards } = require('./Cards');

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/gofish-web/dist/index.html');
// });

// Game Namespace
//const game = io.of('/cardgame');
// game.on

io.on('connection', function (socket) {
    console.log('socket connected', socket.id);

    socket.on('disconnect', function () {
        console.log('client disconnected');
    });

    // receive ping
    socket.on('hello', (data) => {
        console.log('world');
        //game.emit
        const newData = data.toUpperCase();
        socket.emit('hello', newData);
    });

});

const port = 1111;
http.listen(port, function () {
    console.log(`listening on port ${port}`);
});


// Card Logic
function reducer(action) {
    switch (action.type) {
        case "shuffle":
            return shuffle(cards);
        default:
            return cards;
    }

}

//var { cards } = Cards;
//console.log(cards);


// helper functions

const shuffle = arr => arr.sort(() => .5 - Math.random());