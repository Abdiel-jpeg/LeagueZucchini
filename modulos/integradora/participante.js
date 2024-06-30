const express = require('express');

const { participante: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router()

router.get('/', all);

async function all(req, res) {
	try {
		const items = await controlador.allParticipante();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
