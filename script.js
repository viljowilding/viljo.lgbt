const footer = document.querySelector("footer");
const html = document.documentElement;

const debounce = (fn) => {
  let frame;
  return (...params) => {
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  }
};
  
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

document.addEventListener('scroll', debounce(storeScroll), { passive: true });

storeScroll();

const storeFooterVisible = () => {
  const footerRect = footer.getBoundingClientRect();
  const visible = ( !!footerRect
    && footerRect.bottom >= 0
    && footerRect.right >= 0
    && footerRect.top <= html.clientHeight
    && footerRect.left <= html.clientWidth
  );
  document.documentElement.dataset.footer = visible;
}

document.addEventListener('scroll', debounce(storeFooterVisible), {passive: true});