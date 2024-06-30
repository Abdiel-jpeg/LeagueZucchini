const express = require('express');

const { institucion: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);

async function all(req, res) {
	try {
		const items = await controlador.allInstitucion();

		respuesta.success(req, res, items, 200);
	} catch(error) {
		console.log('Error consultando en la BBDD\n' + error);
		respuesta.error(req, res, error, 500);
	}
}

module.exports = router;
