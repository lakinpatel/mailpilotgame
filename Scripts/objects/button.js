/// <reference path="../references/constants.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // BUTTON CLASS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, buttonIDString) {
            _super.call(this, buttonIDString);
            this.x = x;
            this.y = y;
            this.setButtonListeners();
        }
        Button.prototype.setButtonListeners = function () {
            this.cursor = 'pointer';
            this.on('rollover', this.onButtonOver);
            this.on('rollout', this.onButtonOut);
        };
        Button.prototype.onButtonOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype.onButtonOut = function () {
            this.alpha = 1;
        };
        return Button;
    })(objects.GameObject);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map