require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbConnect = require('./src/config/db');
const User = require('./src/models/User');
const Division = require('./src/models/Division');
const Theme = require('./src/models/Theme');
const Smile = require('./src/models/Smile');
const fs = require('fs');

const salt = process.env.saltRounds || 10;

const PORT = process.env.PORT || 3000;

dbConnect();

// const seed = async () => {
//   const userList = [
//     {
//       username: 'Kelly',
//       email: 'kelly@gmail.com',
//       password: await bcrypt.hash('123456789', Number(salt)),
//     },
//     {
//       username: 'Mike',
//       email: 'mike@gmail.com',
//       password: await bcrypt.hash('123456789', Number(salt)),
//     },
//     {
//       username: 'Sally',
//       email: 'sally@gmail.com',
//       password: await bcrypt.hash('123456789', Number(salt)),
//     },
//   ];

//   const users = await Promise.all(
//     userList.map((item) => {
//       return new User(item).save();
//     })
//   );

//   const divisionList = [
//     {
//       title: 'Characters discussion',
//     },
//     {
//       title: 'Episodes discussion',
//     },
//     {
//       //prettier-ignore
//       title: 'Show\'s jokes',
//     },
//     {
//       title: 'Random',
//     },
//   ];

//   const divisions = await Promise.all(
//     divisionList.map((item) => {
//       return new Division(item).save();
//     })
//   );

//   const themes = await Promise.all([
//     new Theme({
//       title: 'What do you think about Episode 3?',
//       author: users[0],
//       division: divisions[1],
//       answerCount: 0,
//     }).save(),
//     new Theme({
//       //prettier-ignore
//       title: 'What if mooncake didin\'t exist?',
//       author: users[1],
//       division: divisions[0],
//       answerCount: 0,
//     }).save(),
//     new Theme({
//       title: 'What do you think about Avocato?',
//       author: users[2],
//       division: divisions[0],
//       answerCount: 0,
//     }).save(),
//     new Theme({
//       title: 'Gary - stupid or extravagant?',
//       author: users[0],
//       division: divisions[0],
//       answerCount: 0,
//     }).save(),
//     new Theme({
//       title: 'Keeeeevvvnnnn!',
//       author: users[2],
//       division: divisions[0],
//       answerCount: 0,
//     }).save(),
//     new Theme({
//       title: 'Who created the universe Arachitects or Titans?',
//       author: users[1],
//       division: divisions[3],
//       answerCount: 0,
//     }).save(),
//   ]);
//   mongoose.connection.close(() => console.log('CLosed!'));
// };

// seed();

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
