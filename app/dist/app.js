define("app/common/startPosition", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("app/common/currentPosition", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("app/events", ["require", "exports"], function (require, exports) {
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
                        if (_this.prevDiff > 0) {
                            var backgroundSize = void 0;
                            if (!_this._camera.style.backgroundSize)
                                _this._camera.style.backgroundSize = '1000px';
                            if (curDiff > _this.prevDiff) {
                                backgroundSize = parseInt(_this._camera.style.backgroundSize, 10) + 10;
                                _this._camera.style.backgroundSize = backgroundSize >= _this.startPosition.sizeMax ? _this._camera.style.backgroundSize : backgroundSize + "px";
                            }
                            if (curDiff < _this.prevDiff) {
                                backgroundSize = parseInt(_this._camera.style.backgroundSize, 10) - 10;
                                _this._camera.style.backgroundSize = backgroundSize <= _this.startPosition.sizeMin ? _this._camera.style.backgroundSize : backgroundSize + "px";
                            }
                            if (_this.zoom)
                                _this.zoom.innerHTML = Math.round((parseInt(_this._camera.style.backgroundSize) / _this.startPosition.size, 10) * 100) + "%";
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
                this.startPosition.x = parseInt(this._camera.style.backgroundPositionX, 10);
            if (this._camera.style.backgroundPositionY)
                this.startPosition.y = parseInt(this._camera.style.backgroundPositionY, 10);
        };
        ;
        Events.prototype.move = function (event) {
            if (!this._camera)
                return;
            var x = event.x;
            var y = event.y;
            var dx = this.startPosition.x + x - this.currentPosition[0].startX;
            var dy = this.startPosition.y + y - this.currentPosition[0].startY;
            this._camera.style.backgroundPosition = dx + "px " + dy + "px";
        };
        ;
        return Events;
    }());
    exports.Events = Events;
});
define("app/menu", ["require", "exports"], function (require, exports) {
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
});
define("app/app", ["require", "exports", "app/events", "app/menu"], function (require, exports, events_1, menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events = new events_1.Events();
    events.addEvents();
    var menu = new menu_1.Menu();
    menu.addEvent();
});
define("app/common/video", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("flux/ActionTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActionTypes = {
        CHANGE_VALUE: 'CHANGE_VALUE',
    };
    exports.default = ActionTypes;
});
define("flux/Store", ["require", "exports", "flux/ActionTypes"], function (require, exports, ActionTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = /** @class */ (function () {
        function Store() {
        }
        Store.prototype.reduce = function (action, value) {
            switch (action.type) {
                case ActionTypes_1.default.CHANGE_VALUE:
                    var key = action.type + action.id;
                    return Store.storage(key, value);
                default:
                    return null;
            }
        };
        Store.storage = function (key, value) {
            if (!value)
                return localStorage.getItem(key);
            localStorage.setItem(key, value);
            return value;
        };
        return Store;
    }());
    exports.default = new Store();
});
define("flux/Dispatcher", ["require", "exports", "flux/Store"], function (require, exports, Store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dispatcher = /** @class */ (function () {
        function Dispatcher() {
        }
        Dispatcher.prototype.dispatch = function (id, type, value) {
            return Store_1.default.reduce({ type: type, id: id }, value);
        };
        return Dispatcher;
    }());
    exports.default = new Dispatcher();
});
define("flux/Action", ["require", "exports", "flux/ActionTypes", "flux/Dispatcher"], function (require, exports, ActionTypes_2, Dispatcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Actions = {
        changeValue: function (id, value) {
            return Dispatcher_1.default.dispatch(id, ActionTypes_2.default.CHANGE_VALUE, value);
        },
    };
    exports.default = Actions;
});
define("app/videoController", ["require", "exports", "hls.js", "flux/Action"], function (require, exports, Hls, Action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoController = /** @class */ (function () {
        function VideoController(videos) {
            this.preview = document.getElementById('preview');
            this.volume = document.getElementById('volume');
            this.videos = videos;
            this.context = new AudioContext();
            this.analyser = this.context.createAnalyser();
        }
        VideoController.prototype.createAudio = function () {
            var video = this.videos[this.activeElem.id].video;
            if (!video) {
                video = this.context.createMediaElementSource(this.activeElem);
            }
            video && video.connect(this.analyser);
            this.analyser.connect(this.context.destination);
            this.draw();
        };
        ;
        VideoController.prototype.draw = function () {
            var _this = this;
            var average = 0;
            var array = new Uint8Array(this.analyser.fftSize);
            this.analyser.getByteTimeDomainData(array);
            for (var i = 0; i < array.length; i++) {
                average += Math.abs(array[i] - 128);
            }
            average /= array.length;
            if (this.volume)
                this.volume.style.height = average * 5 + 'px';
            requestAnimationFrame(function () {
                _this.draw();
            });
        };
        ;
        VideoController.prototype.changeFilters = function (id, val) {
            var filters = this.videos[this.activeElem.id].filters;
            var span = document.querySelector("." + id + " span");
            filters[id] = Action_1.default.changeValue("" + this.activeElem.id + id, val) || '100';
            this.initFiltersValue(this.activeElem);
            if (span)
                span.innerHTML = val;
        };
        ;
        VideoController.prototype.initValue = function () {
            var filters = this.videos[this.activeElem.id].filters;
            var filters_array = Object.keys(filters);
            filters_array.forEach(function (id) {
                var span = document.querySelector("." + id + " span");
                var input = document.querySelector("." + id + " input");
                if (span)
                    span.innerHTML = filters[id];
                if (input)
                    input.value = filters[id];
            });
        };
        ;
        VideoController.prototype.initFiltersValue = function (element) {
            var filter = '';
            var filters = this.videos[element.id].filters;
            var filters_array = Object.keys(filters);
            filters_array.forEach(function (id) {
                var f = id + "(" + filters[id] + "%)";
                filter = !filter ? f : filter + " " + f;
                element.style.filter = filter;
            });
        };
        VideoController.prototype.addPointerEventVideo = function (element) {
            var _this = this;
            if (element)
                element.addEventListener("pointerdown", function (event) {
                    _this.activeElem = event.target;
                    if (_this.preview)
                        _this.preview.className = 'show';
                    _this.activeElem.className += ' openVideo';
                    _this.activeElem.parentElement.className += ' moveVideo';
                    _this.initValue();
                    _this.activeElem.muted = false;
                    _this.createAudio();
                });
        };
        ;
        VideoController.prototype.addEvent = function () {
            var _this = this;
            var brightness = document.getElementById('brightness');
            var contrast = document.getElementById('contrast');
            var btn_back = document.getElementById('btn_back');
            if (brightness)
                brightness.addEventListener('change', function (event) {
                    var target = event.target;
                    if (target)
                        _this.changeFilters('brightness', target.value);
                });
            if (contrast)
                contrast.addEventListener('change', function (event) {
                    var target = event.target;
                    if (target)
                        _this.changeFilters('contrast', target.value);
                });
            if (btn_back) {
                btn_back.addEventListener("pointerdown", function () {
                    if (_this.activeElem) {
                        var video = _this.videos[_this.activeElem.id].video;
                        _this.activeElem.muted = true;
                        _this.activeElem.className = 'video';
                        _this.activeElem.parentElement.className = 'container_video';
                        if (_this.preview)
                            _this.preview.className = '';
                        if (video)
                            video.disconnect(_this.analyser);
                        _this.activeElem = null;
                    }
                    _this.analyser.disconnect();
                });
            }
        };
        ;
        VideoController.prototype.startVideo = function () {
            var _this = this;
            var array = Object.keys(this.videos);
            array.forEach(function (video_id) {
                var elem = document.getElementById(video_id);
                _this.videos[video_id] && _this.initVideo(elem, _this.videos[video_id].src);
                _this.initFiltersValue(elem);
                if (elem)
                    _this.addPointerEventVideo(elem.parentElement);
            });
            this.addEvent();
        };
        ;
        VideoController.prototype.initVideo = function (video, url) {
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    video.play();
                });
            }
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
                video.addEventListener('loadedmetadata', function () {
                    video.play();
                });
            }
        };
        ;
        return VideoController;
    }());
    exports.VideoController = VideoController;
});
define("app/monitoring", ["require", "exports", "app/videoController", "flux/Action"], function (require, exports, videoController_1, Action_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var videos = {
        video_1: {
            src: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
        },
        video_2: {
            src: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
        },
        video_3: {
            src: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
        },
        video_4: {
            src: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
        }
    };
    window.onload = function () {
        var videoController = new videoController_1.VideoController(setVideos());
        videoController.startVideo();
    };
    function setVideos() {
        var array = Object.keys(videos);
        array.forEach(function (item) {
            videos[item].filters = {
                brightness: Action_2.default.changeValue(item + "brightness") || '100',
                contrast: Action_2.default.changeValue(item + "contrast") || '100'
            };
        });
        return videos;
    }
});
//# sourceMappingURL=app.js.map