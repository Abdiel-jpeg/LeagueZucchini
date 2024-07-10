const express = require('express');

const { usuario: controlador } = require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);
router.post('/', loginUsuario);
router.put('/', addUsuario);
router.delete('/', delUsuario);

async function all(req, res) {
	try {
		const items = await controlador.allUsuario();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function loginUsuario(req, res) {
	console.log(req.body);

	try {
		//Le enviamos la información de inicio de sesión por medio
		//de json. Aquí lo resivimos en req.body. Si la consulta de BBDD
		//encuentra una coincidencia nos devuelve la información completa del
		//usuario, como su foto de perfil. En caso contrario, la misma
		//consulta terminaría en el momento en el que no se encontrase un 
		//usuario, y provocaría un error inmediatamente que sería captado por
		//catch, mostrando el mensaje del control de sql
		const ok = await controlador.loginUsuario(req.body);
		respuesta.success(req, res, ok, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500)
	}
}

async function addUsuario(req, res) {
	try {
		const response = await controlador.addUsuario(req.body);
		respuesta.success(req, res, response, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function delUsuario(req, res) {
	try {
		const response = await controlador.delUsuario(req.body);
		respuesta.success(req, res, response, 200);
	} catch(err) {
		console.log(err)
		respuesta.error(req, res, err, 500)
	}
}

module.exports = router;
