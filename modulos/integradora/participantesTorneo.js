const express = require('express');

const { participantesTorneo: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);

async function all(req, res) {
	try {
		const items = await controlador.allParticipantesTorneo();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err);
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
