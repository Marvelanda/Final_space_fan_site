require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const hbs = require('hbs');
const path = require('path');
const isUser = require('./src/middleware/user');
const isAuth = require('./src/middleware/auth');

const indexRoute = require('./src/routes/index');
const usersRoute = require('./src/routes/users');
const charactersRoute = require('./src/routes/characters');
const locationsRoute = require('./src/routes/locations');
const episodesRoute = require('./src/routes/episodes');

const dbConnect = require('./src/config/db');

const app = express();

const PORT = process.env.PORT || 3000;

dbConnect();

app.set('session cookie name', 'sid');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

const FileStore = sessionFileStore(session);
app.use(
  session({
    name: app.get('session cookie name'),
    secret: process.env.SESSION_SECRET,
    store: new FileStore({
      secret: process.env.SESSION_SECRET,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use(isUser);
app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/characters', isAuth, charactersRoute);
app.use('/locations', isAuth, locationsRoute);
app.use('/episodes', isAuth, episodesRoute);

app.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT);
});

// require('crypto').randomBytes(64).toString('hex')
