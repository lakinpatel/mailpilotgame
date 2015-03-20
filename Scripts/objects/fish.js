var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ISLAND CLASS
    var Fish = (function (_super) {
        __extends(Fish, _super);
        // CONSTRUCTOR
        function Fish() {
            _super.call(this, "fish");
            this.sound = "caught";
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Fish.prototype.update = function () {
            this.x += this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Fish.prototype.reset = function () {
            this.x = 0;
            this.y = Math.floor(Math.random() * 480);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Fish.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.x >= (640 + this.width)) {
                this.reset();
            }
        };
        return Fish;
    })(objects.GameObject);
    objects.Fish = Fish;
})(objects || (objects = {}));
//# sourceMappingURL=fish.js.map