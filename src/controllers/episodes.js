const fetch = require('node-fetch');

const renderAllEpisodes = async (req, res) => {
  const URI = `https://finalspaceapi.com/api/v0/episode/`;
  const response = await fetch(URI);
  const data = await response.json();

  res.render('items/episodes', { data });
};

const renderSingleEpisode = async (req, res) => {
  const URI = `https://finalspaceapi.com/api/v0/episode/${req.params.id}`;
  const response = await fetch(URI);
  const data = await response.json();

  data.air_date = data.air_date.replace(
    /(\d{2})[^\d]*(\d{2})[^\d]*(\d{4})/g,
    (match, p1, p2, p3) => `${p2}.${p1}.${p3}`
  );

  const characters = [];

  for (let character of data.characters) {
    const id = character.replace(
      'https://finalspaceapi.com/api/v0/character/',
      ''
    );

    const response = await fetch(character);
    const data = await response.json();
    characters.push({ name: data.name, id });
  }

  data.characters = characters;

  res.render('items/episode', { data });
};

module.exports = { renderSingleEpisode, renderAllEpisodes };
