
module objects {
    // Diver Class
    export class Diver extends createjs.Bitmap {
        public width: number;
        public height: number;
        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("diver"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.x = 640 - this.width;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("underwater", { loop: -1 });
        }

        // PUBLIC METHODS
        public update() {
            this.y = stage.mouseY;
        }

        public reset()
        {
            this.x = 0;
        }

        public original()
        {
            this.x = 640 - this.width;
        }

    }

} 