const GoogleStratergy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User')

passport.use(
    new GoogleStratergy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // Extract necessary info from Google profile
                const email = profile.emails[0].value;
                const name = profile.displayName;
                const googleId = profile.id;
                const picture = profile.photos?.[0]?.value;

                // Check if user already exists
                let user = await User.findOne({ email });

                if (!user) {
                    // Create new user in MongoDB
                    user = new User({
                        name,
                        email,
                        googleId,
                        profilePic: picture,
                    });
                    await user.save();
                } else {
                    // Update googleId if missing (for old accounts)
                    if (!user.googleId) {
                        user.googleId = googleId;
                        await user.save();
                    }
                }

                // Pass user to Passport
                return done(null, user);
            } catch (err) {
                console.error('Google OAuth error:', err);
                return done(err, null);
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});