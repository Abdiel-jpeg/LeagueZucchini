exports.success = function (req, res, mensaje, status) {
	//El valor es igual al param, o sino lo siguiente
	const statusCode = status || 200;
	const mensajeOK = mensaje || '';

	res.status(statusCode).send({
		error: false,
		status: statusCode,
		body: mensajeOK,
	})
}

//En los param, si no se especifica un valor el = tomara un valor por defecto, funciona igual que arriba
exports.error = function (req, res, mensajeError = 'Error Interno', statusCode = 500) {
	res.status(statusCode).send({
		error: true,
		status: statusCode,
		body: mensajeError,
	})
}
