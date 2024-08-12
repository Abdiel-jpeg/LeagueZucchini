const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/indexUser.html'));
});

router.get('/partidos/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/partidos.html'));
})

router.get('/equipos/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/equipos.html'));
})

router.get('/tabla-de-posiciones/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/tabla-de-posiciones.html'));
})

router.get('/login/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/loginNext.html'));
})

router.get('/admin/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/index.html'));
})

router.get('/registro/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/registro.html'));
})

router.get('/control-competiciones/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/controlCompeticiones.html'));
})

router.get('/about/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/html/about.html'))
})

module.exports = router;

