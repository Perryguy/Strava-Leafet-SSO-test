const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login/strava', passport.authenticate('strava', { scope: ['activity:read'] }));

router.get("/auth/strava/callback", passport.authenticate('strava', 
{ failureMessage: "Failed to login", failureRedirect: "http://localhost:3000/",
successRedirect: "http://localhost:3000/"}),   
(req, res) => {
    res.send("Thanks for signing in!");
});

module.exports = router;