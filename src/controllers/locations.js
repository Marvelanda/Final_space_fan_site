const fetch = require('node-fetch');

const renderAllLocations = async (req, res) => {
  const URI = `https://finalspaceapi.com/api/v0/location/`;

  const response = await fetch(URI);
  console.log(response);
  const data = await response.json();

  res.render('items/locations', { data });
};

const renderSingleLocation = async (req, res) => {
  const URI = `https://finalspaceapi.com/api/v0/location/${req.params.id}`;
  const response = await fetch(URI);
  const data = await response.json();
  const characters = [];

  for (let character of data.notable_residents) {
    const id = character.replace(
      'https://finalspaceapi.com/api/v0/character/',
      ''
    );
    const response = await fetch(character);
    const data = await response.json();
    characters.push({ name: data.name, id });
  }
  data.notable_residents = characters;

  res.render('items/location', { data });
};

module.exports = { renderSingleLocation, renderAllLocations };
