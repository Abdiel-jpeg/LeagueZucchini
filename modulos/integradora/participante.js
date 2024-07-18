const express = require('express');

const { participante: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router()

router.get('/', all);
router.get('/:id', individual);
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allParticipante();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function individual(req, res) {
	try {
		const item = await controlador.individualParticipante(req.params);

		respuesta.success(req, res, item, 200);
	} catch(err) {
		respuesta.success(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res) {
	try {
		const response = await controlador.updateParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
