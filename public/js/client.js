const commonForm = document.querySelector('[data-name="commonForm"]');
const resultContainer = document.querySelector(
  '[data-name="resultsContainer"]'
);
const inputSearch = document.querySelector('[data-name="search"]');
const errorMessage = document.querySelector('[data-name="errorMessage"]');

const renderTemplate = async (results) => {
  const hbsRes = await fetch('/views/results.hbs');

  const hbs = await hbsRes.text();
  const hbsTemplate = Handlebars.compile(hbs);

  return hbsTemplate({ results });
};

commonForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = new FormData(commonForm);
  const parseData = Object.fromEntries(formData);

  const response = await fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseData),
  });

  const data = await response.json();
  console.log(data);
  resultContainer.innerHTML = '';

  if (data.status === 'error') {
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = data.error;
  } else {
    errorMessage.classList.add('hidden');
    const result = await renderTemplate(data);

    resultContainer.innerHTML = result;
  }

  inputSearch.value = '';
});
