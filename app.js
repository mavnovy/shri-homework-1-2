let menu = document.getElementById("menu");

menu.addEventListener("pointerdown", () => {
    let x = document.getElementById("myTopnav");

    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = "topnav"
    }
});

let currentPosition = [];
const startPosition = {
    x: 0,
    y: 0,
    size: 1272,
    sizeMin: 700,
    sizeMax: 2544
};
let prevDiff = -1;


let camera = document.getElementById("camera");

camera.addEventListener("pointerdown", (event) => {
    camera.style.transition = 'none';
    currentPosition.push({
        pointerId: event.pointerId,
        startX: event.x,
        startY: event.y,
        startPosition: startPosition
    });
});


const cancelMove = () => {
    if(currentPosition.length === 0)
        return;
    currentPosition = [];
    prevDiff = -1;
    startPosition.x = parseInt(camera.style.backgroundPositionX);
    startPosition.y = parseInt(camera.style.backgroundPositionY);
};

const move = (event) => {
    const x = event.x;
    const y = event.y;
    const dx = startPosition.x + x - currentPosition[0].startX;
    const dy = startPosition.y + y - currentPosition[0].startY;
    const posX = dx + 'px ';
    const posY = dy + 'px';
    camera.style.backgroundPosition = posX + posY;
};

camera.addEventListener('pointermove',(event) =>{
    if(currentPosition.length === 0)
        return;

    if(currentPosition.length === 1) {
        move(event);
        return;
    }
    if(currentPosition.length === 2){
        for (let i = 0; i < currentPosition.length; i++) {
            if (event.pointerId === currentPosition[i].pointerId) {
                currentPosition[i].startX = event.x;
                currentPosition[i].startY = event.y;
                break;
            }
        }
        let curDiff = Math.abs(currentPosition[0].startX - currentPosition[1].startX);
        if (prevDiff > 0) {
            if(!camera.style.backgroundSize)
                camera.style.backgroundSize = '1000px';
            let backgroundSize;
            if (curDiff > prevDiff) {
                backgroundSize = parseInt(camera.style.backgroundSize) + 10;
                camera.style.backgroundSize = backgroundSize >= startPosition.sizeMax ? camera.style.backgroundSize : (backgroundSize + 'px');
            }
            if (curDiff < prevDiff) {
                backgroundSize = parseInt(camera.style.backgroundSize) - 10;
                camera.style.backgroundSize = backgroundSize <= startPosition.sizeMin ? camera.style.backgroundSize : (backgroundSize + 'px');
            }
            document.getElementById('zoom_menu_cam').innerHTML = Math.round((parseInt(camera.style.backgroundSize) / startPosition.size) * 100) + '%';
        }

        prevDiff = curDiff;
    }
});


camera.addEventListener('pointerup', cancelMove);
camera.addEventListener('pointercancel', cancelMove);