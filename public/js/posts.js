const postForm = document.querySelector('[data-name="postForm"]');
const textArea = document.querySelector('[data-name="postText"]');
const postContainer = document.querySelector('[data-name="postContainer"]');
const file = document.querySelector('.file');

const renderPostTemplate = async (results) => {
  const hbsRes = await fetch('/views/posts.hbs');

  const hbs = await hbsRes.text();
  const hbsTemplate = Handlebars.compile(hbs);
  console.log(results);
  return hbsTemplate({ results });
};

postForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = new FormData(postForm);

  const url = postForm.action;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!data.error) {
    const result = await renderPostTemplate(data);
    const container = postContainer.querySelector('ul');
    container.insertAdjacentHTML('beforeend', result);
  } else {
    const element = document.createElement('p');

    element.classList.add('error');
    element.innerHTML = data.error;
    postForm.before(element);
  }

  postForm.reset();

  smilesContainer.classList.add('hidden');
  smilesContainer.classList.remove('flex');
});
