const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/index.html'));
});

router.get('/partidos/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/htmlpartidos.html'));
})

router.get('/equipos/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/equipos.html'));
})

router.get('/tabla-de-posiciones/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/tabla-de-posiciones.html'));
})

router.get('/login/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/login.html'));
})

module.exports = router;

