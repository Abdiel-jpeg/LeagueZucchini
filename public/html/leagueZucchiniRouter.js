const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/partidos/', (req, res) => {
	res.sendFile(path.join(__dirname, 'partidos.html'));
})

router.get('/equipos/', (req, res) => {
	res.sendFile(path.join(__dirname, 'equipos.html'));
})

router.get('/tabla-de-posiciones', (req, res) => {
	res.sendFile(path.join(__dirname, 'tabla-de-posiciones.html'));
})

module.exports = router;

