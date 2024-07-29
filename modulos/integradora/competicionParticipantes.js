const express = require('express');

const { competicionParticipantes: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/:nombreCompeticion', all);
router.post('/', add);
router.delete('/', del);

async function all(req, res) {
	try {
		const items = await controlador.allCompeticionParticipantes(req.params);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function add(req, res) {
	try {
		const items = await controlador.addCompeticionParticipantes(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const response = await controlador.delCompeticionParticipantes(req.body);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 200);
	}

}

module.exports = router;
