import "@babel/polyfill";
import "whatwg-fetch";
import Plyr from 'plyr';


import tabs from './js/tab';

import Modal from "./js/modal";

import {formDropdown, initForm} from "./js/form";

import { dropdown, Menu, sizeHead } from './js/mobile-menu';
import { createAccordion } from "./js/accordion";
import HoverImgMaps from "./js/hoverImgMaps";
import "./js/anchorLink";
import { Map } from './js/maps';

import './scss/index.scss';
import column from "./js/buildColumn";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

document.addEventListener("DOMContentLoaded", function() {

    new Menu('.btn-mob.open', '.mob-menu');
    dropdown();
    new Plyr('#player');
    new HoverImgMaps('.regions__gall', '.regions .cn__img');
    initSelectedMapRegion();
    sizeHead();
    createAccordion();
    createAccordion('.select-accordion__header', '.select-accordion__content', 'data-hash', false);

    initForm();
    formDropdown();

    initModalMessage();

    tabs('.cn__select-link','.accordion-tabs');

    column();
    column('.accordion-tabs', 'accordion-tabs__it', 2);


    initMap().catch( err => console.log('map', err));
});

function initSelectedMapRegion() {
    const selectedMapRegion = document.querySelector('.img[data-region-active]');
    if (!selectedMapRegion) return;

    const value = selectedMapRegion.getAttribute('data-region-active');
    const target = selectedMapRegion.querySelector(`[data-region="${value}"]`);

    if (!target) return;

    target.classList.add('active');
}

function initModalMessage() {

    let modalMessage = document.querySelector('.modal.post-message');
    const btnMessage = document.querySelectorAll('.reqMessage');

    if (modalMessage && btnMessage.length != 0) {
        modalMessage = new Modal(modalMessage);

        for (const btn of btnMessage) {
            btn.addEventListener('click', () => {
                modalMessage.on()
            }, { passive: true, capture: false })
        }

        modalMessage.el.querySelector('form')
            .addEventListener('submit', () => {
                modalMessage.off()
            }, { passive: true, capture: false })
    }
}

async function initMap() {
    const mapElement = document.getElementById( 'map' );
    if(!mapElement) return;

    const googleMaps = await Map.loadGoogleMapsApi();

    create(mapElement);

    function create(target) {
        const coordinates = {
            lat: +target.getAttribute('data-lat') || 50.45,
            lng: +target.getAttribute('data-lng') || 30.53,
        };

        Map.createMap( googleMaps, mapElement, coordinates);
    }

    document.querySelector('.map__address .map__link').onclick = function (ev) {
        ev.preventDefault();
        create(this)
    };
}
