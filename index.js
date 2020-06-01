'use strict';
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var { cards } = require('./Cards');

// initialize in global scope.
var gameIterator, game;

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
    socket.on('REQUEST', async (event) => {
        console.log('Request for ', event);
        //console.log(socket.id);
        try {

            // make changes to game object
            await reducer(event, socket.id);

            // return game object, and event name originally recieved.
            // socket.emit('RECEIVE', game, event);
            io.emit('RECEIVE', game, event);

        } catch (e) {
            console.error('error: ', e);
        }

        //}
    });



});

const port = 1111;
http.listen(port, function () {
    console.log(`listening on port ${port}`);
});


// Card Logic
function reducer(action, id) {
    switch (action) {
        case "SHUFFLE":
            game.shuffle();
            break;
        // case "DECK":
        //     return { state: cards }
        case "TEST":
            console.log(game);
            break;
        case "START":
            //gameIterator = newGame();
            game = new GoFish();
            break;
        case "DEAL":
            game.deal();
            break;
        case "JOIN_PLAYER1":
            game.player1.id = id;
            break;
        case "JOIN_PLAYER2":
            game.player2.id = id;
            break;
        //return gameObject(game);
        // case "NEXT":
        //     gameIterator.next();
        //     //return gameObject(game);
        //     break;
        default:
            break;
        //return cards;
    }
}

class GoFish {
    constructor() {
        this.deck = [...cards];
        this.player1 = new Player('player1');
        this.player2 = new Player('player2');
        this.turn = this.player1.id;
    }

    deal() {
        this.shuffle();
        for (let i = 0; i < 7; i++) {
            this.draw(this.player1);
            this.draw(this.player2);
        }
        console.log(this.player1);
        console.log(this.player2);
    }

    shuffle() {
        this.deck = this.deck.sort(() => .5 - Math.random());
    }

    draw(player) {
        let card = this.deck.pop();
        card.owner = player.id;
        player.hand.push(card);
    }
}

class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.hand = [];
        this.books = [];
        this.turn = false;
    }
}

// Game Generator
// function* newGame() {
//     game = new GoFish();
//     game.deal();
//     //console.log(game.deck.length);
//     yield console.log(game);
//     console.log('end');
//     return;
// }



//var { cards } = Cards;
//console.log(cards);


//
// helper functions
//
const gameObject = (game) => {
    return {
        deck: game.deck,
        player1: game.player1,
        player2: game.player2
    }
}

//const shuffle = arr => arr.sort(() => .5 - Math.random());