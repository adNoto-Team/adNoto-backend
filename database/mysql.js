const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	"r8p6fm2i1vl8we72",
	"emzb96cdujpf7s48",
	"eurzmywdcdanfgjf",
	{
		dialect: "mysql",
		host: "esilxl0nthgloe1y.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
		port: "3306",
	}
);

module.exports = sequelize;
