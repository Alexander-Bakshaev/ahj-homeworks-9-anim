import '../css/style.css';

const button = document.getElementById('collapse-button');
const content = document.getElementById('collapsible-content');

button.addEventListener('click', () => {
  content.classList.toggle('open');
});
