
const express = require('express');

const { region: controlador } =  require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/get/:limit/:offset', all);
router.get('/search/:nombreRegion', search)
router.delete('/', del);
router.post('/', add);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allRegion(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function search(req, res) {
	try {
		const items = await controlador.searchRegion(req.params);

		respuesta.success(req, res, items, 200)
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delRegion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addRegion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req,res, err, 500);
	}
}

async function update(req, res) {
	try {
		const response = await controlador.updateRegion(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
