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

    // socket.on REQUEST
    socket.on('REQUEST', (event) => {
        console.log('Request for ', event);
        const { state } = reducer(event);
        if (state) {
            socket.emit('RECEIVE', state, event);
        }
    });



});

const port = 1111;
http.listen(port, function () {
    console.log(`listening on port ${port}`);
});


// Card Logic
function reducer(action) {
    switch (action) {
        case "DECK":
            return { state: cards }
        case "SHUFFLE":
            let shuffled = shuffle(cards);
            return { state: shuffled };
        default:
            return cards;
    }
}

//var { cards } = Cards;
//console.log(cards);



// helper functions
const shuffle = arr => arr.sort(() => .5 - Math.random());