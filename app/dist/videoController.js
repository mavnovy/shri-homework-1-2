"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VideoController = /** @class */ (function () {
    function VideoController(videos, hls) {
        this.preview = document.getElementById('preview');
        this.volume = document.getElementById('volume');
        this.videos = videos;
        this.hls = hls;
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
        var array = new Uint8Array(this.analyser.fftSize);
        this.analyser.getByteTimeDomainData(array);
        var average = 0;
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
        var filter = '';
        var filters = this.videos[this.activeElem.id].filters;
        var filter_names = Object.keys(filters);
        filters[id] = val;
        filter_names.forEach(function (name) {
            var f = name + '(' + filters[name] + '%)';
            filter = !filter ? f : filter + ' ' + f;
        });
        this.activeElem.style.filter = filter;
        var span = document.querySelector('.' + id + ' span');
        if (span)
            span.innerHTML = val;
    };
    ;
    VideoController.prototype.initValue = function () {
        var filters = this.videos[this.activeElem.id].filters;
        var filters_array = Object.keys(filters);
        filters_array.forEach(function (id) {
            var span = document.querySelector('.' + id + ' span');
            if (span)
                span.innerHTML = filters[id];
            var input = document.querySelector('.' + id + ' input');
            if (input)
                input.value = filters[id];
        });
    };
    ;
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
                    _this.activeElem.muted = true;
                    _this.activeElem.className = 'video';
                    if (_this.preview)
                        _this.preview.className = '';
                    _this.activeElem.parentElement.className = 'container_video';
                    if (_this.videos && _this.videos[_this.activeElem.id] && _this.videos[_this.activeElem.id].video)
                        _this.videos[_this.activeElem.id].video.disconnect(_this.analyser);
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
        array.forEach((function (video_id) {
            var elem = document.getElementById(video_id);
            _this.videos[video_id] && _this.initVideo(elem, _this.videos[video_id].src);
            if (elem)
                _this.addPointerEventVideo(elem.parentElement);
        }));
        this.addEvent();
    };
    ;
    VideoController.prototype.initVideo = function (video, url) {
        if (this.hls.isSupported()) {
            var hls = new this.hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(this.hls.Events.MANIFEST_PARSED, function () {
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
//# sourceMappingURL=videoController.js.map