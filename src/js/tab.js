export default function tabs(selectorContainerTrigger, selectorTarget) {
    const tabsBtn = document.querySelector(selectorContainerTrigger);
    if (!tabsBtn) return;

    tabsBtn.onclick = function(ev) {
        // ev.preventDefault();
        let target = ev.target;

        while(target != this){
            if (target.tagName == 'A') return setTabs(target);

            target = target.parentElement;
        }
        return false;
    };

    const hash = window.location.hash;
    const selectedDefault = tabsBtn.querySelector('a');

    function setTabs(el) {
        if (!el.hasAttribute('href')) return;
        const attr = el.getAttribute('href');

        tabsBtn.querySelectorAll('.'+el.className).forEach((elem) => {
            if (el != elem) elem.classList.remove('active');
        });
        el.classList.add('active');

        document.querySelectorAll(selectorTarget).forEach((target) => {
            target.style.display = (target.getAttribute('data-hash') == attr) ? '' : 'none';
        })
    }

    if (hash) {
        const selected = tabsBtn.querySelector(`a[href="${hash}"]`);

        if (selected) {
            setTabs(selected);
            return;
        }
    }

    if (selectedDefault) setTabs(selectedDefault);
}
