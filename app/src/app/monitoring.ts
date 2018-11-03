import {VideoController} from "./videoController";
import {Video} from "./common/video";
import Actions from "../flux/Action";

const videos: any = {
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

window.onload = () => {

    const videoController = new VideoController(setVideos());

    videoController.startVideo();
};

function setVideos(): Video {
    const array = Object.keys(videos);

    array.forEach(item => {
        videos[item].filters = {
            brightness: Actions.changeValue(`${item}brightness`) || '100',
            contrast: Actions.changeValue(`${item}contrast`) || '100'
        }
    });
    return videos;
}

