const postForm = document.querySelector('[data-name="postForm"]');
const smile = document.querySelector('[data-name="smile"]');
const smilesContainer = document.querySelector('[data-name="smilesContainer"]');
const textArea = document.querySelector('[data-name="postText"]');
const postContainer = document.querySelector('[data-name="postContainer"]');

smile.addEventListener('click', () => {
  smilesContainer.classList.toggle('hidden');
  smilesContainer.classList.toggle('flex');
});

smilesContainer.addEventListener('click', (evt) => {
  textArea.value += evt.target.innerText;
});

postForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = new FormData(postForm);
  const parseData = Object.fromEntries(formData);

  // const url = postForm.action;

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(parseData),
  // });

  const element = document.createElement('p');
  element.textContent = textArea.value;
  postContainer.appendChild(element);
  smilesContainer.classList.add('hidden');
  smilesContainer.classList.remove('flex');
  textArea.value = '';
});
