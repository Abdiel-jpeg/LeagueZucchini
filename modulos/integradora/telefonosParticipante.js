const express = require('express');

const { telefonosParticipante: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);
router.get('/:idParticipante', perParticipante);
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allTelefonosParticipante();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function perParticipante(req, res) {
	try {
		const items = await controlador.getTelefonosParticipante(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addTelefonosParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delTelefonosParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res) {
	try {
		const response = await controlador.updateTelefonosParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}
	
module.exports = router;
