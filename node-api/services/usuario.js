const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, nombreUsuario, email, nombre, apellido, fechaNacimiento, status 
    FROM usuario 
    LIMIT ${offset},${config.listPerPage}`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {data, meta};
}

module.exports.getMultiple = getMultiple;