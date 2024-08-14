
const express = require('express');

const respuesta = require('../../red/respuestas')
const { competicionEliminacionDirectaParticipante: controlador } = require('../../src/DB/mysql')

const router = express.Router();

router.get('/:nombreCompeticion', perCompeticion);
router.post('/', add);
router.delete('/', del)

async function perCompeticion(req, res) {
	try {
		const response = await controlador.perCompeticionEliminacionDirectaParticipante(req.params);

		respuesta.success(req, res, response, 200);
	} catch(err){
		console.log(err);
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const response = await controlador.addCompeticionEliminacionDirectaParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err){
		console.log(err);
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delCompeticionEliminacionDirectaParticipante(req.body);

		respuesta.success(req, res, response, 200);
	} catch(err){
		console.log(err);
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
