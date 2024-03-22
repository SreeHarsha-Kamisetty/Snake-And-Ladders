
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

}

