const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');

/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await usuario.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users.`, err.message);
    next(err);
  }
});

module.exports = router;