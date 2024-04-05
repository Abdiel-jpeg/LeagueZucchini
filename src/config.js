//Analogous to default export de react
require('dotenv').config();

module.exports = {
	app: {
		port: process.env.PORT,
	},
	mysql: {
		host: process.env.MYSQL_HOST || 'localhost',
		user: process.env.MYSQL_USER || 'root',
		dbport: process.env.MYSQL_PORT || 3306,
		password: process.env.MYSQL_PASSWORD || '',
		database: process.env.MYSQL_DB || 'ejemplo',
	}
}
