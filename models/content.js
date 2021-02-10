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
	coverPicture: Sequelize.TEXT,
	desc: Sequelize.TEXT,
	director: Sequelize.TEXT,
	trailer: Sequelize.TEXT,
	startDate: Sequelize.TEXT,
	endDate: Sequelize.TEXT,
	imbdScore: Sequelize.INTEGER,
});

module.exports = Content;
