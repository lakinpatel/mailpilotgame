/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ocean.ts" />

module states {
    // GAME OVER STATE CLASS
    export class GameOver {
        // Game Objects 
        public game: createjs.Container;
        public ocean: objects.Ocean;
        public gameOverLabel: objects.Label;
        public finalScoreLabel: objects.Label;
        public highScoreLabel: objects.Label;
        public tryAgainButton: objects.Button;
        public menuButton: objects.Button;
        public tryAgain: boolean = false;
        public menu: boolean = false;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);

            //Game Over Label
            this.gameOverLabel = new objects.Label(320, 40, "GAME OVER");
            this.gameOverLabel.font = "60px Consolas";
            this.gameOverLabel.regX = this.gameOverLabel.getMeasuredWidth() * 0.5;
            this.gameOverLabel.regY = this.gameOverLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.gameOverLabel);

            //Final Score Label
            this.finalScoreLabel = new objects.Label(320, 120,("FINAL SCORE: " + currentScore));
            this.game.addChild(this.finalScoreLabel);

            //High Score Label
            this.highScoreLabel = new objects.Label(320, 200,("HIGH SCORE: " + highScore));
            this.game.addChild(this.highScoreLabel);

            //Try Again Button
            this.tryAgainButton = new objects.Button(320, 280, "tryAgainButton");
            this.tryAgainButton.on("click", this.tryAgainClicked, this);

            // Menu Button
            this.menuButton = new objects.Button(320, 400, "menuButton");
            this.menuButton.on("click", this.menuClicked, this);

            createjs.Sound.registerSound({ id: "game", src: "assets/audio/game.mp3" });
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
                // A sound has been preloaded.
                if (event.id == 'game') {
                    createjs.Sound.play("game", { loop: -1 });

                }
            }

            this.game.addChild(this.tryAgainButton);
            this.game.addChild(this.menuButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public tryAgainClicked() {
            this.tryAgain = true;
            createjs.Sound.removeSound("assets/audio/game.mp3", "");
        }

        public menuClicked() {
            this.menu = true;
            createjs.Sound.removeSound("assets/audio/game.mp3", "");
        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.ocean.update();

            if (this.tryAgain) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            } else if (this.menu) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.MENU_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Game Over Class
} // States Module 