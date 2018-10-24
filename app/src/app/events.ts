import {StartPosition} from "./common/startPosition";
import {CurrentPosition} from "./common/currentPosition";

export class Events{
    private _camera: HTMLElement | null;
    startPosition: StartPosition;
    currentPosition: CurrentPosition[] = [];
    prevDiff: number;

    constructor(){
        this._camera = document.getElementById('camera');
        this.prevDiff = -1;

        this.startPosition = {
            x: 0,
            y: 0,
            size: 1272,
            sizeMin: 700,
            sizeMax: 2544
        };
    }

    // setCurPosition(pointerId?:number = 0,startX?:number =0,startY?:number = 0,startPosition?:StartPosition = this.startPosition) {
    //     this.currentPosition = [
    //         pointerId: pointerId,
    //         startX: startX,
    //         startY: startY,
    //         startPosition: startPosition
    //     ]
    // }

    addEvents(){
        if(this._camera) {
            this._camera.addEventListener("pointerdown", (event: PointerEvent) => {
                if(!this._camera)
                    return;
                this._camera.style.transition = 'none';
                // this.setCurPosition(event.pointerId,event.x,event.y)
                this.currentPosition.push({
                    pointerId: event.pointerId,
                    startX: event.x,
                    startY: event.y,
                    startPosition: this.startPosition
                });
            });

            this._camera.addEventListener('pointermove', (event: PointerEvent) => {
                if(!this.currentPosition || !this._camera || this.currentPosition.length === 0)
                    return;
                if (this.currentPosition.length === 1) {
                    this.move(event);
                    return;
                }
                if (this.currentPosition.length === 2) {
                    for (let i = 0; i < this.currentPosition.length; i++) {
                        if (event.pointerId === this.currentPosition[i].pointerId) {
                            this.currentPosition[i].startX = event.x;
                            this.currentPosition[i].startY = event.y;
                            break;
                        }
                    }
                    let curDiff = Math.abs(this.currentPosition[0].startX - this.currentPosition[1].startX);
                    if (this.prevDiff <= 0) {
                    } else {
                        if (!this._camera.style.backgroundSize)
                            this._camera.style.backgroundSize = '1000px';
                        let backgroundSize;
                        if (curDiff > this.prevDiff) {
                            backgroundSize = parseInt(this._camera.style.backgroundSize) + 10;
                            this._camera.style.backgroundSize = backgroundSize >= this.startPosition.sizeMax ? this._camera.style.backgroundSize : (backgroundSize + 'px');
                        }
                        if (curDiff < this.prevDiff) {
                            backgroundSize = parseInt(this._camera.style.backgroundSize) - 10;
                            this._camera.style.backgroundSize = backgroundSize <= this.startPosition.sizeMin ? this._camera.style.backgroundSize : (backgroundSize + 'px');
                        }
                        const zoom = document.getElementById('zoom_menu_cam');
                        if(zoom)
                            zoom.innerHTML = Math.round((parseInt(this._camera.style.backgroundSize) / this.startPosition.size) * 100) + '%';
                    }

                    this.prevDiff = curDiff;
                }
            });


            this._camera.addEventListener('pointerup', (event: PointerEvent) => {this.cancelMove();});
            this._camera.addEventListener('pointercancel', (event: PointerEvent) => {this.cancelMove();});
        }
    }

    cancelMove(){
        if(!this._camera)
            return;
        this.currentPosition = [];
        this.prevDiff = -1;
        if(this._camera.style.backgroundPositionX)
            this.startPosition.x = parseInt(this._camera.style.backgroundPositionX);
        if(this._camera.style.backgroundPositionY)
            this.startPosition.y = parseInt(this._camera.style.backgroundPositionY);
    };

    move(event: PointerEvent):void{
        if(!this._camera)
            return;
        const x = event.x;
        const y = event.y;
        const dx = this.startPosition.x + x - this.currentPosition[0].startX;
        const dy = this.startPosition.y + y - this.currentPosition[0].startY;
        const posX = dx + 'px ';
        const posY = dy + 'px';
        this._camera.style.backgroundPosition = posX + posY;
    };

}