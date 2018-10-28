"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = /** @class */ (function () {
    function Events() {
        this.currentPosition = [];
        this._camera = document.getElementById('camera');
        this.zoom = document.getElementById('zoom_menu_cam');
        this.prevDiff = -1;
        this.startPosition = {
            x: 0,
            y: 0,
            size: 1272,
            sizeMin: 700,
            sizeMax: 2544
        };
    }
    Events.prototype.addEvents = function () {
        var _this = this;
        if (this._camera) {
            this._camera.addEventListener("pointerdown", function (event) {
                if (!_this._camera)
                    return;
                _this._camera.style.transition = 'none';
                _this.currentPosition.push({
                    pointerId: event.pointerId,
                    startX: event.x,
                    startY: event.y,
                    startPosition: _this.startPosition
                });
            });
            this._camera.addEventListener('pointermove', function (event) {
                if (!_this.currentPosition || !_this._camera || _this.currentPosition.length === 0)
                    return;
                if (_this.currentPosition.length === 1) {
                    _this.move(event);
                    return;
                }
                if (_this.currentPosition.length === 2) {
                    for (var i = 0; i < _this.currentPosition.length; i++) {
                        if (event.pointerId === _this.currentPosition[i].pointerId) {
                            _this.currentPosition[i].startX = event.x;
                            _this.currentPosition[i].startY = event.y;
                            break;
                        }
                    }
                    var curDiff = Math.abs(_this.currentPosition[0].startX - _this.currentPosition[1].startX);
                    if (_this.prevDiff <= 0) {
                    }
                    else {
                        if (!_this._camera.style.backgroundSize)
                            _this._camera.style.backgroundSize = '1000px';
                        var backgroundSize = void 0;
                        if (curDiff > _this.prevDiff) {
                            backgroundSize = parseInt(_this._camera.style.backgroundSize) + 10;
                            _this._camera.style.backgroundSize = backgroundSize >= _this.startPosition.sizeMax ? _this._camera.style.backgroundSize : (backgroundSize + 'px');
                        }
                        if (curDiff < _this.prevDiff) {
                            backgroundSize = parseInt(_this._camera.style.backgroundSize) - 10;
                            _this._camera.style.backgroundSize = backgroundSize <= _this.startPosition.sizeMin ? _this._camera.style.backgroundSize : (backgroundSize + 'px');
                        }
                        if (_this.zoom)
                            _this.zoom.innerHTML = Math.round((parseInt(_this._camera.style.backgroundSize) / _this.startPosition.size) * 100) + '%';
                    }
                    _this.prevDiff = curDiff;
                }
            });
            this._camera.addEventListener('pointerup', function () { _this.cancelMove(); });
            this._camera.addEventListener('pointercancel', function () { _this.cancelMove(); });
        }
    };
    Events.prototype.cancelMove = function () {
        if (!this._camera)
            return;
        this.currentPosition = [];
        this.prevDiff = -1;
        if (this._camera.style.backgroundPositionX)
            this.startPosition.x = parseInt(this._camera.style.backgroundPositionX);
        if (this._camera.style.backgroundPositionY)
            this.startPosition.y = parseInt(this._camera.style.backgroundPositionY);
    };
    ;
    Events.prototype.move = function (event) {
        if (!this._camera)
            return;
        var x = event.x;
        var y = event.y;
        var dx = this.startPosition.x + x - this.currentPosition[0].startX;
        var dy = this.startPosition.y + y - this.currentPosition[0].startY;
        var posX = dx + 'px ';
        var posY = dy + 'px';
        this._camera.style.backgroundPosition = posX + posY;
    };
    ;
    return Events;
}());
exports.Events = Events;
//# sourceMappingURL=events.js.map