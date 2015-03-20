module objects {
    // LABEL Class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    export class Logo extends createjs.Bitmap {
        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("logo"));
            this.x = 35;
            this.y = 40;
        }
    }
}  