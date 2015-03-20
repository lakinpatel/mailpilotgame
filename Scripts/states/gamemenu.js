/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/logo.ts" />
/// <reference path="../objects/ocean.ts" />
var states;
(function (states) {
    // GAME OVER STATE CLASS
    var GameMenu = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function GameMenu() {
            this.play = false;
            this.instruction = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);
            //Game Over Label
            //this.mailPilotLabel = new objects.Label(320, 40, "CATCH THE FISH");
            //this.mailPilotLabel.font = "60px Consolas";
            //this.mailPilotLabel.regX = this.mailPilotLabel.getMeasuredWidth() * 0.5;
            //this.mailPilotLabel.regY = this.mailPilotLabel.getMeasuredLineHeight() * 0.5;
            //this.game.addChild(this.mailPilotLabel);
            this.fishcatcherLogo = new objects.Logo();
            this.game.addChild(this.fishcatcherLogo);
            //Play Button
            this.playButton = new objects.Button(320, 280, "playButton");
            this.playButton.on("click", this.playClicked, this);
            //Instructions Button
            this.instructionButton = new objects.Button(320, 400, "instructionsButton");
            this.instructionButton.on("click", this.instructionClicked, this);
            this.game.addChild(this.playButton);
            this.game.addChild(this.instructionButton);
            createjs.Sound.registerSound({ id: "game", src: "assets/audio/game.mp3" });
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
                // A sound has been preloaded.
                if (event.id == 'game') {
                    createjs.Sound.play("game", { loop: -1 });
                }
            }
            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        GameMenu.prototype.playClicked = function () {
            this.play = true;
            createjs.Sound.removeSound("assets/audio/game.mp3", "");
        };
        GameMenu.prototype.instructionClicked = function () {
            this.instruction = true;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        GameMenu.prototype.update = function () {
            this.ocean.update();
            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }
            else if (this.instruction) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_INSTRUCTION_STATE;
                stateChanged = true;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        return GameMenu;
    })();
    states.GameMenu = GameMenu;
})(states || (states = {}));
//# sourceMappingURL=gamemenu.js.map