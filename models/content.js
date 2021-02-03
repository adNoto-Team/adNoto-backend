const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const Content = sequelize.define("content", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	avatar: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	thumbnail: Sequelize.TEXT,
	desc: Sequelize.TEXT,
	director: Sequelize.TEXT,
	trailer: Sequelize.TEXT,
	startDate: Sequelize.DATE,
	endDate: Sequelize.DATE,
});

module.exports = Content;
