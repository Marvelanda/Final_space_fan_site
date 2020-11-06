const postForm = document.querySelector('[data-name="postForm"]');
const textArea = document.querySelector('[data-name="postText"]');
const postContainer = document.querySelector('[data-name="postContainer"]');
const file = document.querySelector('.file');

postForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = new FormData(postForm);

  const url = postForm.action;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  const element = document.createElement('li');
  element.textContent = textArea.value;
  postContainer.appendChild(element);
  smilesContainer.classList.add('hidden');
  smilesContainer.classList.remove('flex');

  if (data.file) {
    const img = document.createElement('img');
    img.src = data.file;
    img.style.width = '300px';
    element.appendChild(img);
  }

  textArea.value = '';
});
