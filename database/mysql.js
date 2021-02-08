const Sequelize = require("sequelize");

const sequelize = new Sequelize("adnoto", "semi", process.env.MYSQL_PASSWORD, {
	dialect: "mysql",
	host: "165.22.78.93",
	port: "3306",
});

module.exports = sequelize;
