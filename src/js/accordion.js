export function createAccordion(selectorTrigger = '.accordion__header', selectorContent= '.accordion__content', searchHash = '') {
  const accordions = document.querySelectorAll(selectorTrigger);

  const hash = window.location.hash;
  const click = new Event('click');

  for (const accordion of accordions) {
    accordion.addEventListener('click', function(event){
      accordionClick(event, selectorContent, searchHash);
    });

    if (searchHash && hash && accordion.hasAttribute(searchHash)) {
      if (accordion.getAttribute(searchHash) == hash) accordion.dispatchEvent(click);
    }
  }
}

const accordionClick = (event, selectorContent, searchHash) => {
  const target = event.currentTarget;
  const content = target.nextElementSibling;

  if (content.style.maxHeight){
    content.style.maxHeight = null;
    target.parentElement.classList.remove('active');
  } else {
    const contents = document.querySelectorAll(selectorContent);

    for (const content of contents) {
      if (content.style.maxHeight){
        content.style.maxHeight = null;
        content.parentElement.classList.remove('active')
        content.removeEventListener('click', resizeElement)
      }
    }
    content.style.maxHeight = `${content.scrollHeight}px`;
    target.parentElement.classList.add('active');
    content.addEventListener('click', resizeElement);

  }

  if (searchHash && target.hasAttribute(searchHash)) {
    window.location.hash = target.getAttribute(searchHash);
  }

  function resizeElement(ev) {
    ev.currentTarget.style.maxHeight = `100%`;
  }
};
