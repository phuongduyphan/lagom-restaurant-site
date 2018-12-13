const toggleButton = document.getElementsByClassName('navbar-toggler')[0];
let count = 1;

toggleButton.addEventListener('click', () => {
  count = 1 - count;
  const navbar = document.getElementsByClassName('navbar')[0];
  if (count === 0) {
    navbar.style.backgroundColor = '#e8e8e8';
    navbar.style.zIndex = 1;
  }
  else {
    navbar.style.backgroundColor = 'transparent';
  }
});