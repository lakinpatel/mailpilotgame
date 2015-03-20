/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/fish.ts" />



module states {

    export class GamePlay {
        
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public diver: objects.Diver;
        public fish: objects.Fish;
        public ocean: objects.Ocean;
        public shark: objects.Shark;
        public sharks: objects.Shark[] = [];

        constructor()
        {
            this.game = new createjs.Container();
            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);  

            //Fish object
            this.fish = new objects.Fish();
            this.game.addChild(this.fish);


            //Diver object
            this.diver = new objects.Diver();
            this.game.addChild(this.diver);

            //Shark object
            for (var shark = 2; shark >= 0; shark--) {
                this.sharks[shark] = new objects.Shark();
                this.game.addChild(this.sharks[shark]);
            }

            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            stage.addChild(this.game);

        }

        update() {

            this.ocean.update();
            this.diver.update();
            this.fish.update();

            for (var shark = 2; shark >= 0; shark--) {
                this.sharks[shark].update();
                this.checkCollision(this.sharks[shark]);
            }

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }

            this.checkCollision(this.fish);
            stage.update(); // Refreshes our stage
        }

         // DISTANCE CHECKING METHOD
        distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        checkCollision(collider: objects.GameObject) {
            var planePosition: createjs.Point = new createjs.Point(this.diver.x, this.diver.y);
            var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
            var theDistance = this.distance(planePosition, objectPosition);
            if (theDistance < ((this.diver.height * 0.5) + (collider.height * 0.5))) {
                if (collider.isColliding != true) {
                    createjs.Sound.play(collider.sound);
                    
                    if (collider.name == "shark") {
                        this.diver.reset();
                        setTimeout(this.setOR(), 3000);                   
                        this.scoreboard.lives--;
                    }
                    if (collider.name == "fish") {
                        this.fish.reset();
                        this.scoreboard.score += 100;
                    }
                }
                collider.isColliding = true;
            } else {
                collider.isColliding = false;
            }

        } // checkCollision Method

        setOR()
        {
            this.diver.original();
        }
    } // GamePlay Class


} // States Module 