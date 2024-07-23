const express = require('express');

const { ciudad: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/get/:limit/:offset', all);
router.get('/perRegion/:nombreRegion', allPerRegion);
router.get('/search/:nombreCiudad/:limit/:offset', search)
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allCiudad(req.params);
		
		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function allPerRegion(req, res) {
	try {
		const items = await controlador.allCiudadPerRegion(req.params)

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function search(req, res) {
	try {
		const items = await controlador.searchCiudad(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addCiudad(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delCiudad(req.body);
	
		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res) {
	try {
		const response = await controlador.updateCiudad(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
