export default class HoverMaps {

  constructor(selectorLink, selectorMaps){
    this.cnLink = document.querySelector(selectorLink);
    this.cnMaps = document.querySelector(selectorMaps);
    if (!this.cnLink && !this.cnMaps) return;
    this.on();
    this.createEl();
  }

  changeSelectValue(value) {
    value
      ? this.selected.classList.add('active')
      : this.selected.classList.remove('active');

    this.selected.textContent = value || '';
  }

  createEl(value) {
    const el = document.createElement('div');
    el.className = 'select__map-select';
    el.textContent = value || '';
    this.selected = el;
    this.cnMaps.appendChild(this.selected);
  }

  setCoords(elem) {
    const box = elem.getBoundingClientRect();
    this.selected.setAttribute(
      'style',
      `top:${box.top + pageYOffset + (box.height/2)}px;left:${box.left + pageXOffset + (box.width/2)}px`
    );
  }

  on() {
    this.cnMaps.onclick = (event) => {
      const target = event.target;
      if (!target.hasAttribute('data-region')) return false;

      target.classList.add('active');
      const attr = target.getAttribute('data-region');
      const targetLink = this.cnLink.querySelector(`[data-region="${attr}"]`);
      targetLink.classList.add('active');
      this.setCoords(target);

      this.changeSelectValue(targetLink.textContent);

      targetLink.click();

      return false
    };

    this.cnMaps.onmouseover = (event) => {
      const target = event.target;
      if (!target.hasAttribute('data-region')) return false;

      target.classList.add('active');
      const attr = target.getAttribute('data-region');
      const targetLink = this.cnLink.querySelector(`[data-region="${attr}"]`);
      targetLink.classList.add('active');
      this.setCoords(target);

      this.changeSelectValue(targetLink.textContent);
      return false
    };

    this.cnMaps.onmouseout = (event) => {
      const target = event.target;
      if (!target.hasAttribute('data-region')) return false;

      target.classList.remove('active');
      const attr = target.getAttribute('data-region');
      this.cnLink.querySelector(`[data-region="${attr}"]`).classList.remove('active');

      this.changeSelectValue();
      return false
    };

    this.cnLink.onmouseover = (event) => {
      const target = event.target;
      if (!target.hasAttribute('data-region')) return false;

      target.classList.add('active');
      const attr = target.getAttribute('data-region');
      const targetMam = this.cnMaps.querySelector(`[data-region="${attr}"]`);
      targetMam.classList.add('active');
      this.setCoords(targetMam);

      this.changeSelectValue(target.textContent);
      return false
    };

    this.cnLink.onmouseout = (event) => {
      const target = event.target;
      if (!target.hasAttribute('data-region')) return false;

      target.classList.remove('active');
      const attr = target.getAttribute('data-region');
      this.cnMaps.querySelector(`[data-region="${attr}"]`).classList.remove('active');

      this.changeSelectValue();
      return false
    }
  }
}
