import { searchTarget } from "./mobile-menu";

export default function selectImg(targetSelector, selectSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const select = document.querySelector(selectSelector);

    const forEach = (tg = target) => {
        for (let it of select.querySelectorAll('img')) {
            it.style.opacity = (it.src == tg.src)? '' : '.5';
        }
    };

    forEach();

    const search = searchTarget({
        fn: function (tg) {
            target.src = tg.src;
            forEach(tg);
        },
        bubbling: 'firstElementChild',
        targets: ['IMG']
    });

    select.addEventListener('click', search, { passive: true, capture: false })
}