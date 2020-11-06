const smile = document.querySelector('[data-name="smile"]');
const smilesContainer = document.querySelector('[data-name="smilesContainer"]');

smile.addEventListener('click', () => {
  smilesContainer.classList.toggle('hidden');
  smilesContainer.classList.toggle('flex');
});

smilesContainer.addEventListener('click', (evt) => {
  textArea.value += evt.target.innerText;
});
