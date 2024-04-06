const db  = require('../../src/DB/mysql.js');

const TABLA = 'animales';

const all = () => {
	return db.all(TABLA);
}

const add = (body) => {
	return db.add(TABLA, body);
}

const individual = (id) => {
	return db.individual(TABLA, id);
}

const del = (body) => {
	return db.del(TABLA, body);
}

const update = (body) => {
	return db.update(TABLA, body)
}

module.exports = {
	all,
	individual,
	add,
	del,
	update,
}
