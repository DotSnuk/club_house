const db = require('./db/queries');
const LocalStrategy = require('passport-local').Strategy;

module.exports = passport => {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      console.log('bla');
      try {
        const rows = await db.getUserByEmail(email);
        const user = rows[0];
        console.log('im here');

        if (!user) {
          console.log('blas');
          return done(null, false, { message: 'Incorrect username' });
        }
        if (user.password !== password) {
          console.log('asdee');
          return done(null, false, { message: 'Incorrect password' });
        }
        console.log('qweqwe');
        return done(null, user);
      } catch (error) {
        console.log('now im here');
        return done(error);
      }
    }),
  );
};
