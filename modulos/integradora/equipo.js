const express = require('express');

const { equipo: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/get/:limit/:offset', all);
router.get('/search/:nombreInstitucion/:limit/:offset', searchPerInstitucion);
router.post('/', add);
router.delete('/', del);
router.put('/', update);

async function all(req, res) {
	try{
		const items = await controlador.allEquipo(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function searchPerInstitucion(req, res) {
	try {
		const item = await controlador.searchEquipoPerInstitucion(req.params);

		respuesta.success(req, res, item, 200);
	} catch(err) {
		console.log(err);
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addEquipo(req.body);

		respuesta.success(req,res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delEquipo(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function update(req, res) {
	try {
		const response = await controlador.updateEquipo(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500);
	}
}


module.exports = router;
