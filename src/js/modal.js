import { overflow } from "./mobile-menu";

export default class Modal {
    static create() {
        let elBg = document.querySelector('.modal-bg');

        if (elBg) {
            elBg.classList.add('active');
            return elBg;
        }

        elBg = document.createElement('div');
        elBg.className = 'modal-bg active';

        return elBg;
    }

    constructor(el) {
        this.el = el;
    }

    on() {
        let elBg = Modal.create();
        this.el.before( elBg );
        this.el.classList.add( 'active' );

        overflow('hidden');

        elBg.onclick = this.off.bind(this);

        let btnClose = document.querySelector( '.modal-close' );
        if (btnClose) btnClose.onclick = this.off.bind(this);
    }


    off() {
        Modal.create().classList.remove('active');
        this.el.classList.remove('active');
        overflow();
        return false
    }
}