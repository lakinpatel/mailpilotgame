var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // CLOUD CLASS
    var Shark = (function (_super) {
        __extends(Shark, _super);
        // CONSTRUCTOR
        function Shark() {
            _super.call(this, "shark");
            this.sound = "life";
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Shark.prototype.update = function () {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Shark.prototype.reset = function () {
            this.x = -this.width;
            this.y = Math.floor(Math.random() * 640);
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 4) - 2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Shark.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.x >= (480 + this.width)) {
                this.reset();
            }
        };
        return Shark;
    })(objects.GameObject);
    objects.Shark = Shark;
})(objects || (objects = {}));
//# sourceMappingURL=shark.js.map