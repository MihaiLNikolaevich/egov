export class Menu {
    constructor(selectorTrigger, selectorMenu) {
        this.trigger =  document.querySelector(selectorTrigger);
        this.el = document.querySelector(selectorMenu);
        this.bgEl = this.createElBg();

        this.active = false
        this.on()
    }

    createElBg () {
        const createBg = document.createElement('div');
        createBg.className = 'mob-menu-bg';

        return this.el.parentElement.appendChild(createBg);
    }

    menu() {
        this.active = !this.active
        this.el.classList.toggle('active');
        this.bgEl.classList.toggle('active');
        this.active ? overflow('hidden') : overflow()
    };

    on() {
        this.trigger
          .addEventListener('click', this.menu.bind(this), { capture: false, passive: true });

        this.bgEl
          .addEventListener('click', this.menu.bind(this), { capture: false, passive: true });

        this.el
          .addEventListener('click', this.handlerClick.bind(this), { capture: false, passive: true });
    }

    handlerClick(event) {
        const parent = event.currentTarget;
        let target = event.target;

        while(target != parent) {
            for (const teg of ['A', 'BUTTON']) {
                if (target.tagName == teg) {
                    this.menu()
                    break;
                }
            }

            target = target.parentElement;
            if (!target) return
        }
    }
}

export function overflow(value) {
    document.documentElement.style.overflow = value || '';
    document.body.style.overflow = value || '';
}

export function dropdown(selector = '.dropdown', selectorTrigger = '.dropdown_btn') {
    const elements = document.querySelectorAll(selector);

    if(!elements.length) return;

    const toggle = function(event) {
        event.stopPropagation();
        this.parentElement.classList.toggle('active');

        setTimeout(function () {
            document.body
              .addEventListener('click', clear, { capture: false, passive: true });
        }, 0);
    };

    elements.forEach(element => {
        const trigger = element.querySelector(selectorTrigger);
        if (trigger) {
            trigger.addEventListener('click', toggle, { capture: false, passive: true });
        }
    });


    function clear() {
        elements.forEach(element => element.classList.remove('active'));

        document.body
          .removeEventListener('click', clear, { capture: false })
    }
}


export function searchTarget({ fn = function () {}, bubbling = 'parentElement', targets = ['A', 'BUTTON'] }) {
    return function search(ev) {
        let tg = ev.target;

        while(tg != this) {

            for (const target of targets) {

                if (tg.tagName == target) {
                    const self = this;
                    fn.call(this, tg, self);
                    break;
                }
            }

            tg.parentElement;
            tg = tg[bubbling];

            if (!tg) return
        }
    }
}
