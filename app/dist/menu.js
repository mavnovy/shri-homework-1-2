"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Menu = /** @class */ (function () {
    function Menu() {
        this.menu = document.getElementById('menu');
        this.topNav = document.getElementById("myTopnav");
    }
    Menu.prototype.addEvent = function () {
        var _this = this;
        this.menu && this.menu.addEventListener("pointerdown", function () {
            if (!_this.topNav)
                return;
            if (_this.topNav.className === 'topnav') {
                _this.topNav.className += ' responsive';
            }
            else {
                _this.topNav.className = "topnav";
            }
        });
    };
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map