
const express = require('express');

const respuesta = require('../../red/respuestas');
const { sostenimiento: controlador } = require('../../src/DB/mysql');

const router = express.Router();

router.get('/', all);

async function all(req, res) {
	try {
		const items = await controlador.allSostenimiento();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
