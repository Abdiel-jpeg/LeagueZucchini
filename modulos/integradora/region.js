
const express = require('express');

const { region: controlador } =  require('../../src/DB/mysql');
const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', all);
router.get('/:id', individual);
router.delete('/', del);
router.post('/', add);
router.put('/', update);

async function all(req, res) {
	try {
		const items = await controlador.allRegion();

		respuesta.success(req, res, items, 200);
	} catch(err) {
		respuesta.error(req, res, err, 500);
	}
}

async function individual(req, res) {

}

async function del(req, res) {

}

async function add(req, res) {

}

async function update(req, res) {

}

module.exports = router;
