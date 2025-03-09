const express = require('express');
const app = express();
const router = require('./router/router');
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'],
};
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db/queries');
const passwordUtil = require('./utils/password');

// require('./passport')(passport);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));

app.use(passport.session());

const customFields = {
  usernameField: 'email',
};

passport.use(
  new LocalStrategy(customFields, async (username, password, done) => {
    console.log('inside local strategy');
    try {
      const rows = await db.getUserByEmail(username);
      const user = rows[0];
      console.log('starting authenication');

      if (!user) {
        console.log('no user with that name');
        return done(null, false, { message: 'Incorrect username' });
      }
      const passwordMatch = await passwordUtil.comparePassword(
        username,
        password,
      );
      console.log(passwordMatch);
      if (!passwordMatch.success) {
        console.log('wrong passpord provided');
        console.log(user);
        console.log(password);
        return done(null, false, { message: 'Incorrect password' });
      }
      console.log('password match email');
      return done(null, user);
    } catch (error) {
      console.log('inside catch error');
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  console.log('serial');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('deserial');
    const rows = await db.getUserByID(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.status(200).send({ success: true });
});

app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`app listening in on port ${PORT}`));
