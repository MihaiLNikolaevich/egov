
export function windowResize(arrFunction) {
  function actualResize(arrFunction, prevWidth = 0) {
    if (prevWidth !== window.innerWidth){
      console.log('prevWidth', prevWidth);
      for (const fun of arrFunction) {
        fun()
      }
      return window.innerWidth;
    }
  }

  function resize(arrFunction) {
    let resizeTimeout;
    let prevWidth = window.innerWidth;

    return function () {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          prevWidth = actualResize(arrFunction, prevWidth);
        }, 66);
      }
    }
  }

  const resizeControl = resize(arrFunction);

  window.addEventListener('resize', resizeControl, { capture: false, passive: true });
}
