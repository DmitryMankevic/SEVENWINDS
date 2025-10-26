const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookiesParser = require('cookie-parser');
const corsConfig = require('./corsConfig');
function serverConfig(app) {
  app.use(morgan('dev'));
  app.use(cookiesParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(cors(corsConfig));
}

module.exports = serverConfig;
