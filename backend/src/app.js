const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
dotenv.config({ path: `./src/${envFile}` });
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passportSetup = require('./services/passport');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const teamRoutes = require('./routes/teams');
const userRoutes = require('./routes/user');

const app = express();

// Middleware

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
//   })
// );

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

const isProd = process.env.NODE_ENV === "production";
app.enable('trust proxy');
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: isProd,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: isProd,           // must be true on Render
    sameSite: isProd ? 'none' : 'lax',       // allow cross-site cookies
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/user', userRoutes);

module.exports = app;