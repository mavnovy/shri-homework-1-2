export class Menu {
    menu: HTMLElement | null;
    topNav: HTMLElement | null;

    constructor(){
        this.menu = document.getElementById('menu');
        this.topNav = document.getElementById("myTopnav");
    }

    addEvent(){
        this.menu && this.menu.addEventListener("pointerdown", () => {
            if (!this.topNav)
                return;

            if (this.topNav.className === 'topnav') {
                this.topNav.className += ' responsive';
            } else {
                this.topNav.className = "topnav";
            }
        });
    }
}