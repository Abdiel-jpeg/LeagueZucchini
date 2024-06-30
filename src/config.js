//Aqui cargamos el modulo dotenv que se encarga de leer las variables
//de entorno de nuestro archivo .env en el directorio raiz del programa
//la función config() se encarga de traducir esas variables de entorno
//en objetos utlizables en javascript, y los guarda en el objeto 
//proces.env
require('dotenv').config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_DB, PORT } = process.env;

module.exports = {
	app: {
		port: PORT,
	},
	mysql: {
		host: MYSQL_HOST || 'localhost',
		user: MYSQL_USER || 'root',
		dbport: MYSQL_PORT || 3306,
		password: MYSQL_PASSWORD || '',
		database: MYSQL_DB || 'ejemplo',
	}
}
