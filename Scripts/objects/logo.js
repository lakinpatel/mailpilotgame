var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // LABEL Class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var Logo = (function (_super) {
        __extends(Logo, _super);
        // CONSTRUCTOR
        function Logo() {
            _super.call(this, assetLoader.getResult("logo"));
            this.x = 35;
            this.y = 40;
        }
        return Logo;
    })(createjs.Bitmap);
    objects.Logo = Logo;
})(objects || (objects = {}));
//# sourceMappingURL=logo.js.map