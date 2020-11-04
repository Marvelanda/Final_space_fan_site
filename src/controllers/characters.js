const fetch = require('node-fetch');

const renderAllCharacters = async (req, res) => {
  const URI = `https://finalspaceapi.com/api/v0/character/`;
  const response = await fetch(URI);
  const data = await response.json();

  res.render('items/characters', { data });
};

const renderSingleCharacter = async (req, res) => {
  const URI = `https://finalspaceapi.com/api/v0/character/${req.params.id}`;
  const response = await fetch(URI);
  const data = await response.json();

  //prettier-ignore
  const formatedAbilities = (data.abilities)

  res.render('items/character', { data, abilities: formatedAbilities });
};

module.exports = { renderAllCharacters, renderSingleCharacter };
