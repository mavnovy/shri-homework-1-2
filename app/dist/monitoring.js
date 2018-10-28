"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var videoController_1 = require("./videoController");
var Hls = require("hls.js");
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
    var videoController = new videoController_1.VideoController(setVideos(), Hls);
    videoController.startVideo();
};
function setVideos() {
    var array = Object.keys(videos);
    array.forEach(function (item) {
        videos[item].filters = {
            brightness: '100',
            contrast: '100'
        };
    });
    return videos;
}
//# sourceMappingURL=monitoring.js.map