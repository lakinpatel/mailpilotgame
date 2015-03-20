module objects {
    // ISLAND CLASS
    export class Fish extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("fish");
            this.sound = "caught";
            this._dx = 5;
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x += this._dx;
            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.x = 0;
            this.y = Math.floor(Math.random() * 480);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x >= (640 + this.width)) {
                this.reset();
            }
        }
    }
} 