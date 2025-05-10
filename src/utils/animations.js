import anime from 'animejs';

// Pet card hover animation
export const petCardHover = (element) => {
  return anime({
    targets: element,
    scale: 1.05,
    rotate: [0, 5],
    duration: 500,
    easing: 'easeInOutQuad'
  });
};

// Pet card hover out animation
export const petCardHoverOut = (element) => {
  return anime({
    targets: element,
    scale: 1,
    rotate: 0,
    duration: 500,
    easing: 'easeInOutQuad'
  });
};

// Button click animation
export const buttonClick = (element) => {
  return anime({
    targets: element,
    scale: [1, 0.95, 1],
    duration: 300,
    easing: 'easeInOutQuad'
  });
};

// Page load animation
export const pageLoad = () => {
  return anime({
    targets: '.page-content',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutExpo',
    delay: anime.stagger(100)
  });
};

// Pet image hover animation
export const petImageHover = (element) => {
  return anime({
    targets: element,
    scale: 1.1,
    duration: 500,
    easing: 'easeInOutQuad'
  });
};

// Success message animation
export const successMessage = (element) => {
  return anime({
    targets: element,
    scale: [0, 1],
    rotate: [-10, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutElastic(1, .8)'
  });
};

// Form field focus animation
export const formFieldFocus = (element) => {
  return anime({
    targets: element,
    scale: 1.02,
    duration: 300,
    easing: 'easeInOutQuad'
  });
};

// Navigation menu animation
export const navMenuAnimation = (element) => {
  return anime({
    targets: element,
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutExpo',
    delay: anime.stagger(100)
  });
}; 