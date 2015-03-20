/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/fish.ts" />
var states;
(function (states) {
    var GamePlay = (function () {
        function GamePlay() {
            this.sharks = [];
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

            for (var shark = 2; shark >= 0; shark--) {
                this.sharks[shark] = new objects.Shark();
                this.game.addChild(this.sharks[shark]);
            }

            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            stage.addChild(this.game);
        }
        GamePlay.prototype.update = function () {
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
        };

        // DISTANCE CHECKING METHOD
        GamePlay.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };

        // CHECK COLLISION METHOD
        GamePlay.prototype.checkCollision = function (collider) {
            var planePosition = new createjs.Point(this.diver.x, this.diver.y);
            var objectPosition = new createjs.Point(collider.x, collider.y);
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
        };

        GamePlay.prototype.setOR = function () {
            this.diver.original();
        };
        return GamePlay;
    })();
    states.GamePlay = GamePlay;
})(states || (states = {})); // States Module
//# sourceMappingURL=gameplay.js.map
