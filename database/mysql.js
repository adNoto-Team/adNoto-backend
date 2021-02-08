const Sequelize = require("sequelize");

const sequelize = new Sequelize("adnoto", "user", process.env.MYSQL_PASSWORD, {
	dialect: "mysql",
	host: "localhost",
	port: "3306",
});

module.exports = sequelize;
