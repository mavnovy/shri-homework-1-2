import {Video} from "./common/video";

export class VideoController{
    videos: Video;
    preview: HTMLElement | null;
    volume: HTMLElement | null;
    analyser: AnalyserNode;
    context: any;
    hls: any;
    activeElem: any;

    constructor(videos:Video, hls:any){
        this.preview = document.getElementById('preview');
        this.volume = document.getElementById('volume');
        this.videos = videos;
        this.hls = hls;
        this.context = new AudioContext();
        this.analyser = this.context.createAnalyser();
    }

    createAudio() {
        let video = this.videos[this.activeElem.id].video;

        if(!video) {
            video = this.context.createMediaElementSource(this.activeElem);
        }

        video && video.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.draw();
    };

    draw() {
        let average = 0;
        let array = new Uint8Array(this.analyser.fftSize);
        this.analyser.getByteTimeDomainData(array);

        for (let i = 0; i < array.length; i++) {
            average += Math.abs(array[i] - 128);
        }

        average /= array.length;

        if (this.volume)
            this.volume.style.height = average*5 + 'px';

        requestAnimationFrame(() => {
            this.draw();
        });
    };

    changeFilters(id: string, val:string) {
        let filter: string = '';
        let filters = this.videos[this.activeElem.id].filters;
        let filter_names = Object.keys(filters);
        const span = document.querySelector( `.${id} span`);

        filters[id] = val;

        filter_names.forEach((name) => {
            const f =`${name}(${filters[name]}%)`;
            filter = !filter ?  f : `${filter} ${f}`;
        });

        this.activeElem.style.filter = filter;

        if(span)
            span.innerHTML = val;
    };

    initValue() {
        const filters = this.videos[this.activeElem.id].filters;
        let filters_array = Object.keys(filters);

        filters_array.forEach((id) => {
            const span = document.querySelector( `.${id} span`);
            const input: HTMLInputElement | null = document.querySelector( `.${id} input`);

            if(span)
                span.innerHTML = filters[id];

            if(input)
                input.value = filters[id];
        })
    };

    addPointerEventVideo(element: HTMLElement | null) {
        if(element)
            element.addEventListener("pointerdown", (event) => {
                this.activeElem = event.target;

                if(this.preview)
                    this.preview.className = 'show';

                this.activeElem.className += ' openVideo';
                this.activeElem.parentElement.className += ' moveVideo';
                this.initValue();
                this.activeElem.muted = false;
                this.createAudio();
            });
    };

    addEvent() {
        const brightness = document.getElementById('brightness');
        const contrast = document.getElementById('contrast');
        const btn_back = document.getElementById('btn_back');

        if(brightness)
            brightness.addEventListener('change',(event: Event) => {
                const target = <HTMLInputElement> event.target;

                if(target)
                    this.changeFilters('brightness', target.value);
            });

        if(contrast)
            contrast.addEventListener('change',(event: Event) => {
                const target = <HTMLInputElement> event.target;

                if(target)
                    this.changeFilters('contrast', target.value);
            });

        if(btn_back) {
            btn_back.addEventListener("pointerdown", () => {
                if(this.activeElem){
                    let video = this.videos[this.activeElem.id].video;

                    this.activeElem.muted = true;
                    this.activeElem.className = 'video';
                    this.activeElem.parentElement.className = 'container_video';

                    if(this.preview)
                        this.preview.className = '';

                    if(video)
                        video.disconnect(this.analyser);

                    this.activeElem = null;
                }
                this.analyser.disconnect();
            });}
    };

    startVideo() {
        let array = Object.keys(this.videos);

        array.forEach((video_id =>{
            const elem = <HTMLVideoElement>document.getElementById(video_id);

            this.videos[video_id] && this.initVideo(elem, this.videos[video_id].src);

            if(elem)
                this.addPointerEventVideo(elem.parentElement);
        }));
        this.addEvent();
    };

    initVideo(video: HTMLVideoElement, url: string) {
        if (this.hls.isSupported()) {
            let hls = new this.hls();

            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(this.hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
    };
}