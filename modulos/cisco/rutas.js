const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', helloworld);

function helloworld(req, res) {
	//Enviar archivo con HTML incluido
	res.sendFile(path.join(__dirname, 'index.html'));
}

module.exports = router;
