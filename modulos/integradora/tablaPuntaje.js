const express = require('express');

const {tablaPuntaje: controlador} = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);
router.post('/', add)
router.delete('/', del);

async function all(req, res) {
	try {
		const items = await controlador.allTablaPuntaje();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const items = await controlador.addTablaPuntaje(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const items = await controlador.adelTablaPuntaje(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
