const handlerAnchor = (event) => {
    event.preventDefault();

    const anchor = event.target.getAttribute('href').replace(/#/, '');

    document.getElementById(anchor).scrollIntoView({behavior: 'smooth'});
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.anchor')
        .forEach(element => {
            element.addEventListener('click', handlerAnchor, {capture: false});
        });
});
