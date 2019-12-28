import "@babel/polyfill";
// import "whatwg-fetch";
import Plyr from 'plyr';
import { dropdown, Menu, sizeHead } from './js/mobile-menu';
import tabs from './js/tab';
import select from './js/select';
import selectImg from "./js/select-img";
import Modal from "./js/modal";
import { initForm } from "./js/form";
import { Map } from './js/maps';
import "./js/accordion";
import './scss/index.scss';
import HoverMaps from "./js/hoverMaps";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

document.addEventListener("DOMContentLoaded", function() {

    new Menu('.btn-mob.open', '.mob-menu');

    new Plyr('#player');

    new HoverMaps('.regions__gall', '.regions .cn__img');

    initMap().catch( err => console.log('map', err));

    sizeHead();

    dropdown();

    initForm();

    selectImg('.img-prod', '.cn__img-edit');

    tabs('.tabs','.gall_prod');

    select('select');


    let modalSaveTime = document.querySelector('.modal.save-time');
    const btnSaveTime = document.querySelectorAll('.reqCall');

    if (modalSaveTime && btnSaveTime.length != 0) {
        modalSaveTime = new Modal(modalSaveTime);

        for (const btn of btnSaveTime) {
            btn.addEventListener('click', () => {
                modalSaveTime.on()
            }, { passive: true, capture: false })
        }

        modalSaveTime.el.querySelector('form')
            .addEventListener('submit', () => {
                modalSaveTime.off()
            }, { passive: true, capture: false })
    }

    //anchor
    document.querySelectorAll('.anchor').forEach((el) => {

        el.addEventListener('click', (ev) => {
            ev.preventDefault();

            const anchor = ev.target.getAttribute('href').replace(/#/, '');

            document.getElementById(anchor).scrollIntoView({ behavior: "smooth" })

        }, { capture: false })

    });
    // end anchor

    function accordion(emitSelector, targetSelector) {
        const tg = document.querySelector(emitSelector);
        if (!tg) return;

        tg.addEventListener('click', () => {
            document.querySelector(targetSelector).classList.toggle('active');
        }, { passive: true, capture: false })
    }
    accordion('.btnTextarea', '.cn_textarea')
    column()
});

function column() {

    const container = document.querySelector('.agent__cn');
    const list = document.querySelectorAll('.agent__gall li');

    function newEl(tag ='ul', classname = 'agent__gall') {
        const ul = document.createElement(tag);
        ul.className = classname;
        return ul;
    }

    let ul = newEl();

    const column = window.innerWidth < 450
      ? 1 : window.innerWidth < 800
        ? 2 : window.innerWidth < 1100 ? 3 : 4;
    const count = Math.ceil(list.length / column);
    let countIter = count;
    let columnIter = 1;

    for (let i = 0; i < list.length; i++) {
        if (countIter > i) {
            ul.append(list[i]);
            if (countIter - 1 === i || i === list.length - 1) {
                container.append(ul);
                columnIter++;
                countIter = count * columnIter;
                ul = newEl();
            }
        }
    }

    for (const ul of document.querySelectorAll('.agent__gall')) {
        if (!ul.children.length) ul.remove();
    }
}

async function initMap() {
    const mapElement = document.getElementById( 'map' );
    if(!mapElement) return;

    const googleMaps = await Map.loadGoogleMapsApi();

    function create(target) {
        const coordinates = {
            lat: +target.getAttribute('data-lat') || 50.45,
            lng: +target.getAttribute('data-lng') || 30.53,
        };

        Map.createMap( googleMaps, mapElement, coordinates);
    }

    create(mapElement);

    document.querySelector('.map__address .map__link').onclick = function (ev) {
        ev.preventDefault();
        create(this)
    }
}
