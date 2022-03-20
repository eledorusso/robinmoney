const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');

/* GET users. */
router.get('/all', async function(req, res, next) {
  try {
    res.json(await usuario.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users.`, err.message);
    next(err);
  }
});

//GET user
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await usuario.getUser(req.params.id));
  } catch (err) {
    console.error('User not found');
    //next(err);
  }
})

/* POST user */
router.post('/create', async function(req, res, next) {
  try {
    res.json(await usuario.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

/* PUT user */
router.put('/edit/:id', async function(req, res, next) {
  //console.log('test')
  try {
    res.json(await usuario.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* REMOVE (Logic) user*/
router.put('/remove/:id', async function(req, res, next) {
  try {
    res.json(await usuario.removeLogical(req.params.id));
  } catch (err) {
    console.error(`Error while removing user`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/delete/:id', async function(req, res, next) {
  try {
    res.json(await usuario.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;