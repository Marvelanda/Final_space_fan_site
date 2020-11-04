require('dotenv').config();
const fetch = require('node-fetch');

const index = (req, res) => {
  res.render('index');
};

const findById = async (category, id) => {
  const URI = `https://finalspaceapi.com/api/v0/${category}/${id}`;

  const response = await fetch(URI);
  return await response.json();
};

const search = async (req, res) => {
  const { category, search } = req.body;

  const URI = `https://finalspaceapi.com/api/v0/${category}/`;

  const response = await fetch(URI);
  const data = await response.json();

  const results = [];

  for (const item of data) {
    if (category === 'episode') {
      if (item.id === Number(search)) {
        const data = await findById(category, item.id);
        data.category = category;
        results.push(data);
      }
    } else {
      if (item.name.includes(search)) {
        const data = await findById(category, item.id);
        data.category = category;
        results.push(data);
      }
    }
  }

  res.json(results);
};

module.exports = {
  index,
  search,
};
