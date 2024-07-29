const express = require('express');

const { competicion: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/get/:limit/:offset', all);
router.get('/search/:nombreCompeticion/:limit/:offset', search);
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allCompeticion(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function search(req, res) {
	try {
		const items = await controlador.searchCompeticion(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const items = await controlador.addCompeticion(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const items = await controlador.delCompeticion(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res) {
	try {
		const items = await controlador.updateCompeticion(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
