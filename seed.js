require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbConnect = require('./src/config/db');
const User = require('./src/models/User');
const Division = require('./src/models/Division');
const Theme = require('./src/models/Theme');
const Smile = require('./src/models/Smile');
const Post = require('./src/models/Post');
const faker = require('faker');
const fs = require('fs');

const salt = process.env.saltRounds || 10;

const PORT = process.env.PORT || 3000;

dbConnect();

const seed = async () => {
  const userList = [
    {
      username: 'Kelly',
      email: 'kelly@gmail.com',
      password: await bcrypt.hash('123456789', Number(salt)),
    },
    {
      username: 'Mike',
      email: 'mike@gmail.com',
      password: await bcrypt.hash('123456789', Number(salt)),
    },
    {
      username: 'Sally',
      email: 'sally@gmail.com',
      password: await bcrypt.hash('123456789', Number(salt)),
    },
  ];

  const users = await Promise.all(
    userList.map((item) => {
      return new User(item).save();
    })
  );

  const divisionList = [
    {
      title: 'Characters discussion',
    },
    {
      title: 'Episodes discussion',
    },
    {
      //prettier-ignore
      title: 'Show\'s jokes',
    },
    {
      title: 'Random',
    },
  ];

  const divisions = await Promise.all(
    divisionList.map((item) => {
      return new Division(item).save();
    })
  );

  const themes = await Promise.all([
    new Theme({
      title: 'What do you think about Episode 3?',
      author: users[0],
      division: divisions[1],
      answerCount: 2,
    }).save(),
    new Theme({
      //prettier-ignore
      title: 'What if mooncake didin\'t exist?',
      author: users[1],
      division: divisions[0],
      answerCount: 4,
    }).save(),
    new Theme({
      title: 'What do you think about Avocato?',
      author: users[2],
      division: divisions[0],
      answerCount: 3,
    }).save(),
    new Theme({
      title: 'Gary - stupid or extravagant?',
      author: users[0],
      division: divisions[0],
      answerCount: 0,
    }).save(),
    new Theme({
      title: 'Keeeeevvvnnnn!',
      author: users[2],
      division: divisions[0],
      answerCount: 0,
    }).save(),
    new Theme({
      title: 'Who created the universe Arachitects or Titans?',
      author: users[1],
      division: divisions[3],
      answerCount: 0,
    }).save(),
  ]);

  const d = new Date();

  const formatDate =
    ('0' + d.getDate()).slice(-2) +
    '.' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '.' +
    d.getFullYear() +
    ' ' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2) +
    ':' +
    ('0' + d.getSeconds()).slice(-2);

  const posts = await Promise.all([
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[1],
      theme: themes[1],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[2],
      theme: themes[1],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[2],
      theme: themes[1],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[0],
      theme: themes[1],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[0],
      theme: themes[1],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[0],
      theme: themes[0],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[2],
      theme: themes[0],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[2],
      theme: themes[0],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[1],
      theme: themes[2],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[2],
      theme: themes[2],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[0],
      theme: themes[2],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[1],
      theme: themes[2],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[2],
      theme: themes[3],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[1],
      theme: themes[4],
    }).save(),
    new Post({
      date: formatDate,
      text: faker.lorem.words(),
      author: users[0],
      theme: themes[5],
    }).save(),
  ]);

  mongoose.connection.close(() => console.log('CLosed!'));
};

seed();

const seedSmiles = async () => {
  const readFile = fs.readFileSync('./smiles.txt', 'utf-8').split(';');
  const mapped = readFile.map((item) => {
    return item.split('\t');
  });
  const readyForWriting = mapped.map(async (item) => {
    return await new Smile({ image: item[1], htmlImage: item[2] }).save();
  });
};

seedSmiles();
