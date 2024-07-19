const express = require('express');

const { telefonosInstitucion: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);
router.get('/:idInstitucion', perInstitucion);
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allTelefonosInstitucion();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function perInstitucion(req, res) {
	try {
		const items = await controlador.getTelefonosInstitucion(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500)
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addTelefonosInstitucion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delTelefonosInstitucion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res)  {
	try {
		const response = await controlador.updateTelefonosInstitucion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
