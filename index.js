const fs = require("fs")
// Classes required
/*
1. Game
    Game should have a board, snakes, ladders, players as properties
    board -
    players- to store player details
    snakes
    ladders

    Methods:
    createBoard() - create a board with cells from 1 to 100
    createSnake(x,y) - generate snakes at given location with head at x , tail at y 
    createLadder(x,y) - generate ladders at with ladder start at x and end at y 

2. Snake
    Snake should have a head,tail
3. Ladder
    Ladder should have a start point and end point
4. Player
    Player can have username

    methods:
    rollDice() - will move the player position according to the value rolled


    move() - will move player to coordinates on dice roll

    gameOver() - will check if player has reached the top and return true if reached the top



*/

class Player{
    constructor(name){
        this.name = name
        this.position = 0;
    }

    rollDice(){
        return Math.floor(Math.random() * 6) + 1;
    }
    currentPosition(){
        return this.position;
    }
    move(count){
        this.position += count;
        return this.position
    }
    gameOver(){
        return this.position == 100
    }
}

class Game{
    constructor(){
        this.players = []
        this.snakes = new Map();
        this.ladders = new Map();
    }

    createPlayer(name){
        let player = new Player(name);
        this.players.push(player)
    }

    createSnake(head,tail){
        this.snakes.set(head,tail);
    }

    createLadder(start,end){
        this.ladders.set(start,end);
    }


    start(){
        this.addSnakes()
        this.addLadders()
        
        this.addPlayers()
        console.log(this.players)
        let player = 0;

        while(true){
            const currentPlayer = this.players[player];
            const diceRoll = currentPlayer.rollDice();
            const start = currentPlayer.position;
            const end = this.checkPosition(currentPlayer, diceRoll)

            if(currentPlayer.gameOver()){
                console.log(`${currentPlayer.name} wins the game`);
                break;
            }

            player = (player +1)% this.players.length;
        }
    }
    checkPosition(player,diceValue){
        let newPos = player.position + diceValue;

        if(newPos > 100){
            newPos = player.position
        }
        if(this.snakes.has(newPos)){
            console.log(`${player.name} has encountered snake at ${newPos} `)
            newPos = this.snakes.get(newPos)
            console.log(`${player.name} moved to ${newPos}`)
        }
        if(this.ladders.has(newPos)){
            console.log(`${player.name} has encountered ladder at ${newPos} `)
            newPos = this.ladders.get(newPos)
            console.log(`${player.name} moved to ${newPos}`)
        }
         console.log(`${player.name} has rolled a ${diceValue} and moved from ${player.position} to ${newPos}`)
        player.position = newPos

        return newPos
    }

    addSnakes(){
        let snakes = fs.readFileSync("./snakes.txt","utf-8")
        snakes = snakes.split('\n');
        let snakeCount = parseInt(snakes[0]);

        for(let i=1 ;i<=snakeCount;i++){
            let snakeCoor = snakes[i].split(' ');
            let head = parseInt(snakeCoor[0]);
            let tail = parseInt(snakeCoor[1]);;
            this.createSnake(head, tail);
        }
    }

    addLadders(){
        let ladder= fs.readFileSync("./ladders.txt","utf-8")
        
        ladder = ladder.split('\n');
        let ladderCount = parseInt(ladder[0]);

        for(let i=1 ;i<=ladderCount;i++){
            let ladderCoor = ladder[i].split(' ');
            let start = parseInt(ladderCoor[0]);
            let end = parseInt(ladderCoor[1]);;
            this.createLadder(start, end);
        }
    }
    addPlayers(){
        let players= fs.readFileSync("./players.txt","utf-8")
        
        players = players.split('\n');
        let playerCount = parseInt(players[0]);
        
        for(let i=1 ;i<=playerCount;i++){
            
            this.createPlayer(String(players[i].replace("\r", "")))
        }
    }
}

const newGame = new Game();

newGame.start();
