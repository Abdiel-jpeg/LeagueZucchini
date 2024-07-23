const express = require('express');

const { institucion: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/get/:limit/:offset', all);
router.get('/perCiudad/:nombreCiudad/', perCiudad);
router.get('/search/:nombreInstitucion/:limit/:offset', search);
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allInstitucion(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log('Error consultando en la BBDD\n' + error);
		respuesta.error(req, res, err, 500);
	}
}

async function perCiudad(req, res) {
	try {
		const items = await controlador.allInstitucionPerCiudad(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err);
		respuesta.error(req, res, err, 500)
	}
}

async function search(req, res) {
	try {
		const items = await controlador.searchInstitucion(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err);
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = controlador.addInstitucion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = controlador.delInstitucion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res) {
	try {
		const response = await controlador.updateInstitucion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
