const express = require('express');
const path = require ('path');
const helmet = require("helmet");
const mongoose = require('mongoose');

require('dotenv').config()

const saucesRoutes = require('./routes/saucesRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

const mongoSanitize = require('express-mongo-sanitize');

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, //chaque IP est limitée à 100 requétes
})

mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  console.log('Requête reçue!')
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(
  limiter,
  helmet(),
  express.json(),
  mongoSanitize()
);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;