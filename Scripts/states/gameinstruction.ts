///                        Name Of the Game: Mario Bros                   
///                        Source File Name: gameinstructions.ts                    
///                         Author's Name : Lakin Patel                     
///                        Last Modified By: Lakin Patel                    
///             Date Last Modified: 2015/03/20 10:38PM                 
///               Program Description: The JavaScript File of the Game       
///              Author's Github Profile :http://github.com/lakinpatel           

/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ocean.ts" />


module states {
    // GAME OVER STATE CLASS
    export class GameInstruction {
        // Game Objects 
        public game: createjs.Container;
        public ocean: objects.Ocean;
        public headingLabel: objects.Label;
        public instructionsLabel: objects.Label;
        public playButton: objects.Button;
        public play: boolean = false;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {


            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);

            //Heading Label
            this.headingLabel = new objects.Label(300, 40, "GAME INSTRUCTIONS");
            this.headingLabel.font = "40px Century";
            this.headingLabel.regX = this.headingLabel.getMeasuredWidth() * 0.5;
            this.headingLabel.regY = this.headingLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.headingLabel);

            //Instructions Label
            this.instructionsLabel = new objects.Label(300, 50, this.getInstructions());
            this.instructionsLabel.font = "20px Century";
            //Setting up postion of the instruction label
            this.instructionsLabel.regX = this.headingLabel.getMeasuredWidth() * 0.5;
            this.instructionsLabel.regY = this.headingLabel.getMeasuredLineHeight() * 0.5;
            var w = (this.instructionsLabel.getMeasuredWidth()) * this.instructionsLabel.scaleX;
            var h = (this.instructionsLabel.getMeasuredHeight()) * this.instructionsLabel.scaleY;
            this.instructionsLabel.textAlign = 'left'
            this.instructionsLabel.lineWidth = 500;
            this.game.addChild(this.instructionsLabel);

            //Play Button
            this.playButton = new objects.Button(320, 350, "playButton");
            this.playButton.on("click", this.playClicked, this);

            this.game.addChild(this.playButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public playClicked() {
            this.play = true;
            createjs.Sound.removeSound("assets/audio/game.mp3", ""); // remove game sound on state stage
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.ocean.update();

            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE; // change game state to play
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

        /* Method to change instructions*/
        public getInstructions() {
            return "\n\n\n\n1. Move your Mouse Up and Down to Move the \n    Mario, only up and down is allowed \n\n" +
                "2. Avoid to Touch with the Enemies, otherwise you \n    will lose one life. \n\n3. Catch the small Ice Cream, each ice-cream\n    gives you 100 points ";
        }
    }
} 