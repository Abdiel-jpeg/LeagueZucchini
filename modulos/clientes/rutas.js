const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

//Aqui instanciamos un objeto de la clase express.Router
const router = express.Router();

	router.get('/', all);
	router.get('/:id', individual);
	router.delete('/', del);
	router.put('/', add);
	router.post('/', update);

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

async function add(req, res) {
	try {
		const items = await controlador.add(req.body);
		respuesta.success(req, res, 'Item insertado correctamente', 200);
	}
	catch(e) {
		respuesta.error(req, res, e, 500);
	}
}

async function update(req, res) {
	try {
		const items = await controlador.update(req.body)
		
		respuesta.success(req, res, 'Item actualizado correctamente', 200)
	}
	catch(e) {
		console.log(e)
		respuesta.error(req, res, e, 500)
	}
}

module.exports = router;
