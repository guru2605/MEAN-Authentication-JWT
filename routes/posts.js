const express = require('express');
const router = express.Router();

const Posts = require('../models/post');

Posts.methods(['get','post','put','delete']);
Posts.register(router,'');

module.exports = router;