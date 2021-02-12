const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	username: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	password: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	surname: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	mail: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	avatar: Sequelize.TEXT,
	desc: Sequelize.TEXT,
});

module.exports = User;
