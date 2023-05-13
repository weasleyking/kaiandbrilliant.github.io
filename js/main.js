function disableScroll() {
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, { passive: false });
}

function scrollToSection(direction) {
  let sections = Array.from(document.getElementsByClassName('container'));
  let currentSectionIndex = sections.findIndex((section) => {
    let midpoint = section.offsetTop + section.offsetHeight / 2;
    return window.scrollY >= section.offsetTop && window.scrollY < midpoint;
  });
  
  // Handle the edge case when the scroll position is exactly at the top of the page
  if (currentSectionIndex === -1 && window.scrollY === 0) {
    currentSectionIndex = 0;
  }


  let targetSectionIndex = currentSectionIndex + (direction === 'up' ? -1 : 1);

  if (targetSectionIndex >= 0 && targetSectionIndex < sections.length) {
    window.scrollTo({
      top: sections[targetSectionIndex].offsetTop,
      behavior: 'smooth',
    });
  }
}


disableScroll();
