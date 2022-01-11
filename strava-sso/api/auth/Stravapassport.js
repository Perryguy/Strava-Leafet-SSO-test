
const passport = require('passport');
const User = require('../models/User');
const StravaStrategy = require('passport-strava').Strategy;

passport.use(new StravaStrategy({
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:9000/testAPI/auth/strava/callback",
    passReqToCallback: true 
  }, async (accessToken, refreshToken, profile, cb) => {
        const defaultUser = {
            stravaId: profile.id, 
            fullname: profile.displayName,
            email: profile.emails[0].value,
  }
 const user = await User.findOrCreate({ where: { stravaId: profile.id }, defaults: defaultUser }).catch((err) => {
    console.log(err)
    cb(err, null)
  });
  if (user && user[0])
    return cb(null, user && user[0]);
}));

passport.serializeUser((user, cb) => {
    console.log('serializeUser', user)
    cb(null, user.id);
});

passport.deserializeUser(async(id, cb) => {
    const user = await User.findOne({ where: { id } }).catch((err) => {
        console.log(err)
        cb(err, null)
    });
    console.log("deserializeUser", user)
    if (user)
        return cb(null, user);
});
