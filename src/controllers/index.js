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
  if (
    category === 'character' ||
    category === 'location' ||
    category === 'episode'
  ) {
    if (search) {
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
          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            const data = await findById(category, item.id);
            data.category = category;
            results.push(data);
          }
        }
      }

      res.json(results);
    } else {
      res.json({
        status: 'error',
        error: 'Please type in a name, a location or an episode.',
      });
    }
  } else {
    res.json({ status: 'error', error: 'Please choose a category' });
  }
};

module.exports = {
  index,
  search,
};
