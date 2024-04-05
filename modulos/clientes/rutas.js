const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

//Aqui instanciamos un objeto de la clase express.Router
const router = express.Router();

router.get('/', all);
router.get('/:id', individual);
router.put('/', del);

async function all(req, res) {
	try {
		const items = await controlador.all()

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function individual(req, res) {
	try {
		const items = await controlador.individual(req.params.id);

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function del(req, res) {
	try {
		const items = await controlador.del(req.body);

		respuesta.success(req, res, 'Item eliminado correctamente', 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

module.exports = router;
