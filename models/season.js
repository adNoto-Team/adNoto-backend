const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const Season = sequelize.define("season", {
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
	seasonNumber: Sequelize.INTEGER,
	contentId: Sequelize.INTEGER,
});

module.exports = Season;
