
///                        Name Of the Game: Mario Bros                   
///                        Source File Name: game.ts                    
///                         Author's Name : Lakin Patel                     
///                        Last Modified By: Lakin Patel                    
///             Date Last Modified: 2015/03/20 10:38PM                 
///               Program Description: The Main JavaScript File of the Game       
///              Author's Github Profile : http://github.com/lakinpatel           




/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="references/constants.ts" />
/// <reference path="states/gameplay.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/diver.ts" />
/// <reference path="objects/shark.ts" />
/// <reference path="objects/fish.ts" />


// Global Game Variables
var canvas;
var stage: createjs.Stage;
var assets: createjs.LoadQueue;
var assetLoader: createjs.LoadQueue;
var currentScore = 0;
var highScore = 0;

// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

var gamePlay: states.GamePlay;
var gameOver: states.GameOver;
var menu: states.GameMenu;
var instructions: states.GameInstruction;


// different game images and sounds are loaded
var manifest = [
    { id: "logo", src: "assets/images/mariologo.png" },
    { id: "shark", src: "assets/images/enemy.png" },
    { id: "fish", src: "assets/images/ice-cream.png" },
    { id: "ocean", src: "assets/images/background.png" },
    { id: "diver", src: "assets/images/mario.png" },
    { id: "playButton", src: "assets/images/playNow.png" },
    { id: "tryAgainButton", src: "assets/images/play_again_button.png" },
    { id: "menuButton", src: "assets/images/menu.png" },
    { id: "instructionsButton", src: "assets/images/instructions.png" },
    { id: "underwater", src: "assets/audio/game_world.mp3" },
    { id: "life", src: "assets/audio/mariodie.wav" },
    { id: "caught", src: "assets/audio/eat_icecream.wav" }
];


function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function
    assetLoader.loadManifest(manifest);
}


function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    currentState = constants.MENU_STATE;
    changeState(currentState);
}

function gameLoop() {

    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }

   
}


// Function to check the status of the game
function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:   // for menu state
            // instantiate menu screen
            menu = new states.GameMenu();
            currentStateFunction = menu;
            break;

        case constants.PLAY_STATE:   // for Playing mode
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;

        case constants.GAME_INSTRUCTION_STATE:  // Instruction mode
            // instantiate game play screen
            instructions = new states.GameInstruction();
            currentStateFunction = instructions;
            break;

        case constants.GAME_OVER_STATE:  // for Game Over State
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}