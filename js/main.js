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

  let currentSectionIndex = sections.reduce((highestIndex, currentSection, currentIndex) => {
    let viewportOffset = currentSection.getBoundingClientRect();
    let topInView = viewportOffset.top >= 0 && viewportOffset.top < window.innerHeight;
    let bottomInView = viewportOffset.bottom > 0 && viewportOffset.bottom <= window.innerHeight;
    let inView = (bottomInView && topInView) ? viewportOffset.height :
                 topInView ? viewportOffset.bottom :
                 bottomInView ? window.innerHeight - viewportOffset.top : 0;

    return inView > highestIndex.inView ? {inView: inView, index: currentIndex} : highestIndex;
  }, {inView: 0, index: 0}).index;

  let targetSectionIndex = currentSectionIndex + (direction === 'up' ? -1 : 1);

  if (targetSectionIndex >= 0 && targetSectionIndex < sections.length) {
    window.scrollTo({
      top: sections[targetSectionIndex].offsetTop,
      behavior: 'smooth',
    });
  }
}

/*
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
*/


disableScroll();
