const inputColorApp = document.getElementById('inputColorApp');
const navbar = document.querySelector('.navbar');

if (!!localStorage.getItem('inputColorApp') === true) {
  const curColor = localStorage.getItem('inputColorApp');
  inputColorApp.value = curColor;
  document.body.style.backgroundColor = curColor;
  navbar.style.backgroundColor = curColor;
};

inputColorApp.addEventListener('change', ({ target }) => {
  document.body.style.backgroundColor = target.value;
  navbar.style.backgroundColor = target.value;
  localStorage.setItem('inputColorApp', target.value);
});
