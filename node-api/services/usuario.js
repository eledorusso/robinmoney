const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, nombreUsuario, email, nombre, apellido, fechaNacimiento, status 
    FROM usuario 
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {data, meta};
}

async function create(usuario){
  console.log(usuario);
  const result = await db.query(
    `INSERT INTO usuario 
    (nombreUsuario, password, email, nombre, apellido, fechaNacimiento) 
    VALUES 
    (${usuario.nombreUsuario}, SHA1(${usuario.password}), ${usuario.email}, ${usuario.nombre}, ${usuario.apellido}, ${usuario.fechaNacimiento})`
  );
  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created sucesfull!';
  }

  return {message};
}

async function update(id, usuario){
  const result = await db.query(
    `UPDATE usuario 
    SET nombreUsuario="${usuario.nombreUsuario}", email=${usuario.email}, nombre=${usuario.nombre}, apellido=${usuario.apellido}, fechaNacimiento=${usuario.fechaNacimiento},
    WHERE id=${id}` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM usuario WHERE id=${id}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}