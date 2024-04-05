const app = require('./app');

//Funcion de la clase express, listen(puerto, funcion)
app.listen(app.get('port'), () => {
	console.log("Servidor escuchando en el puerto", app.get("port"));
});
