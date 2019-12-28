function createAccordion(selectorTrigger = ".accordion__header", selectorContent) {
  const accordions = document.querySelectorAll(selectorTrigger);

  for (const accordion of accordions) {
    accordion.addEventListener('click', function(event){
      accordionClick(event, selectorContent = ".accordion__content");
    });
  }
}
createAccordion();

const accordionClick = (event, selectorContent) => {
  const target = event.currentTarget;
  const content = target.nextElementSibling;

  if (content.style.maxHeight){
    content.style.maxHeight = null;
    target.parentElement.classList.remove('active')

  } else {
    const contents = document.querySelectorAll(selectorContent);

    for (const content of contents) {
      if (content.style.maxHeight){
        content.style.maxHeight = null;
        content.parentElement.classList.remove('active')
      }
    }

    content.style.maxHeight = `${content.scrollHeight}px`;
    target.parentElement.classList.add('active')
  }
}
